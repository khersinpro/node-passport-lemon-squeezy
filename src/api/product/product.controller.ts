import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma";

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();