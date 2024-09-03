import { NextFunction, Request, Response } from "express";
import passport from "../../config/passport";
import { User } from "@prisma/client";
import { IVerifyOptions } from "passport-local";

class AuthController {
  credentialsLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: Error | null, user: User | null, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  }

  logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.status(204);
  }

  googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google")(req, res, next);
  }

  googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "google",
      function (err: Error | null, user: User | null, info: IVerifyOptions) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect(process.env.FRONTEND_URL as string);
        });
      }
    )(req, res, next);
  }
}

export default new AuthController();
