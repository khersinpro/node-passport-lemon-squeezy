import { Router } from 'express';
import Guard from '../../middlewares/guards';
import userController from './user.controller';
import { CreateUserSchema, UpdateUserSchema } from './user.sanitization';
import { checkExactSchemaSanitization } from '../../utils/sanitization.utils';
const router = Router();

/*****************************************************************************************
 * PUBLIC routes
 ****************************************************************************************/
router.post('/user', userController.create);


/*****************************************************************************************
 * AUTH routes
 ****************************************************************************************/
router.get('/user/me', Guard.isAuth, userController.getMe);
router.put('/user/:id', Guard.isAuth, checkExactSchemaSanitization(UpdateUserSchema), userController.update);
router.put('/user/password/:id', Guard.isAuth, checkExactSchemaSanitization(UpdateUserSchema), userController.updatePassword);

/*****************************************************************************************
 * ADMIN routes
 ****************************************************************************************/
router.get('/user', Guard.isAdmin, userController.getAll);
router.get('/user/:id', Guard.isAdmin, userController.getOne);
router.delete('/user/:id', Guard.isAdmin, userController.delete);

export default router;