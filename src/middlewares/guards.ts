import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/UnauthorizeError';
import ForbiddenError from '../errors/ForbidenError';
import crypto from 'crypto';

class Guard {
  static isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }

    if (req.path === '/user/me') {
      return res.status(204).send();
    }

    throw new UnauthorizedError();
  }

  static isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN') {
      return next();
    }
    throw new ForbiddenError();
  } 

  static isStaff(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated() && (req.user.role === 'ADMIN' || req.user.role === 'STAFF')) {
      return next();
    }
    throw new ForbiddenError();
  }

  static checkLemonSignature(req: Request, res: Response, next: NextFunction) {
    try {
      const secret    = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE as string;
      const hmac      = crypto.createHmac('sha256', secret);
      const digest    = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
      const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');
      
      if (!crypto.timingSafeEqual(digest, signature)) {
          throw new Error('Invalid signature.');
      }

      next();
    }
    catch (e) {
      next(e);
    }
  }
}

export default Guard;