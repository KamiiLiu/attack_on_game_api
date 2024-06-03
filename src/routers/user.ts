import { Router } from 'express';
import userController from '../controllers/userController';
import { jwtAuthenticator } from '../middlewares/auth';
import { userCreateValidator, userUpdateValidator } from '../validators/user';

const router = Router();

router.post('/', userCreateValidator, userController.create);
router.put(
  '/:id',
  jwtAuthenticator,
  userUpdateValidator,
  userController.updated,
);
router.get('/:id', jwtAuthenticator, userController.getById);

export default router;
