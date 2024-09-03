import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma";
import ForbiddenError from "../../errors/ForbidenError";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany();
      
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  getMe(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(req.user);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        req.body.password as string,
        salt
      );

      const user = await prisma.user.create({
        data: {
          email: req.body.email as string,
          username: req.body.username as string,
          password: hashedPassword,
        },
      });

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.id !== parseInt(req.params.id) || !req.user) {
        throw new ForbiddenError();
      }

      const user = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          username: req.body.username as string,
        }
      });

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.id !== parseInt(req.params.id) || !req.user) {
        throw new ForbiddenError();
      }

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        req.body.password as string,
        salt
      );

      const user = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          password: hashedPassword,
        },
      });

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
