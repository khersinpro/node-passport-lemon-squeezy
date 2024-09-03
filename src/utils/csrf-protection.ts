import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

/**
 * Class to handle CSRF protection.
 */
class Csrf {
  private ALLOWED_METHODS = ["GET", "HEAD", "OPTIONS"];
  private ALLOWED_PATHS = ["/api/payment/webhook"];
  private secret: string;
  private tokenExpiry: number;
  private refreshTime: number;

    /**
   * Creates an instance of Csrf.
   * @param string secret - The secret key used for token generation and verification.
   * @param number [tokenExpiry=3600000] - The token expiry time in milliseconds. Default is 1 hour.
   */
  constructor(secret: string, tokenExpiry = 3600000) {
    this.secret = secret;
    this.tokenExpiry = tokenExpiry;
    this.refreshTime = tokenExpiry / 2;
  }
  /**
   * Middleware to set or refresh the CSRF token cookie.
   * @param req - The Express Request object.
   * @param res - The Express Response object.
   * @param next - The Express NextFunction callback.
   */
  public setCsrfCookie = (req: Request, res: Response, next: NextFunction): void => {
    const csrfToken = req.cookies["XSRF-TOKEN"];

    if (this.shouldRefreshToken(csrfToken)) {
      this.generateCsrfCookie(res);
    }

    next();
  };

  /**
   * Middleware to verify the CSRF token.
   * @param req - The Express Request object.
   * @param res - The Express Response object.
   * @param next - The Express NextFunction callback.
   */
  public csrfProtection = (req: Request, res: Response, next: NextFunction): void => {
    if (this.ALLOWED_METHODS.includes(req.method)) {
      next();
      return;
    }

    if (this.ALLOWED_PATHS.includes(req.url)) {
      next();
      return;
    }
  
    const tokenFromHeader = req.headers["x-csrf-token"] as string;

    if (tokenFromHeader && this.verifyCsrfToken(tokenFromHeader)) {
      next();
    } else {
      this.generateCsrfCookie(res);
      res.status(403).send("Invalid CSRF token");
    }
  };

  /**
   * Generates a new CSRF token.
   * @returns The generated CSRF token.
   */
  private generateCsrfToken = (): string => {
    const nonce = crypto.randomBytes(24).toString("hex");
    const timestamp = Date.now();
    const payload = `${nonce}.${timestamp}`;
    const hmac = crypto
      .createHmac("sha256", this.secret)
      .update(payload)
      .digest("hex");
    const token = `${payload}.${hmac}`;
    return token;
  };

  /**
   * Verifies a given CSRF token.
   * @param token - The CSRF token to verify.
   * @returns True if the token is valid, false otherwise.
   */
  private verifyCsrfToken = (token: string): boolean => {
    const [nonce, timestamp, signature] = token.split(".");
    if (!nonce || !timestamp || !signature) return false;

    const payload = `${nonce}.${timestamp}`;
    const hmac = crypto
      .createHmac("sha256", this.secret)
      .update(payload)
      .digest("hex");

    return (
      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac)) &&
      Date.now() - parseInt(timestamp) < this.tokenExpiry
    );
  };

  /**
   * Generates a new CSRF token and sets it in the cookie.
   * @param res - The Express Response object.
   */
  private generateCsrfCookie = (res: Response): void => {
    const token = this.generateCsrfToken();
    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  /**
   * Checks if the CSRF token should be refreshed.
   * @param csrfToken - The current CSRF token.
   * @returns True if the token should be refreshed, false otherwise.
   */
  private shouldRefreshToken(csrfToken: string | undefined): boolean {
    if (!csrfToken) {
      return true;
    }

    const parts = csrfToken.split(".");
    if (parts.length !== 3) {
      return true;
    }

    const timestamp = parseInt(parts[1], 10);
    if (isNaN(timestamp)) {
      return true;
    }

    const timeLeft = timestamp + this.tokenExpiry - Date.now();
    return timeLeft < this.refreshTime;
  }
}

export default Csrf;
