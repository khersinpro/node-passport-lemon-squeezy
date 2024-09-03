import { Router } from 'express';
import userRouter from '../bundles/user/user.router';
import authRouter from '../bundles/auth/auth.router';
import paymentRouter from '../bundles/lemon/payment/lemon-payment.router';
import productRouter from '../bundles/product/product.router';
const router = Router();

router.use('/auth', authRouter);
router.use('/api', userRouter);
router.use('/api/payment', paymentRouter);
router.use('/api/product', productRouter);

export default router;