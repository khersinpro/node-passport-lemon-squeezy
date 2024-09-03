import { Router } from 'express';
import { createCheckoutSchema } from './lemon-payment.sanitization';
import { checkExactSchemaSanitization } from '../../../utils/sanitization.utils';
import paymentController from './lemon-payment.controller';
import Guard from '../../../middlewares/guards';

const router = Router();

router.post('/', Guard.isAuth, checkExactSchemaSanitization(createCheckoutSchema), paymentController.checkout);

export default router;