import { Router } from "express";
import Guard from '../../middlewares/guards';
import productController from "./product.controller";
const router = Router();


router.get("/", Guard.isAuth, productController.getAll);

export default router;