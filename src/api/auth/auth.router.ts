import { Router } from 'express';
import { checkExactSchemaSanitization } from '../../utils/sanitization.utils';
import { CredentialsLoginSchema } from './auth.sanitization';
import authController from './auth.controller';
import Guard from '../../middlewares/guards';

const router = Router();

/*****************************************************************************************
 * PUBLIC routes
 ****************************************************************************************/
router.post('/login', checkExactSchemaSanitization(CredentialsLoginSchema), authController.credentialsLogin);
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

/*****************************************************************************************
 * AUTH routes
 ****************************************************************************************/
router.post('/logout', Guard.isAuth, authController.logout);

export default router;