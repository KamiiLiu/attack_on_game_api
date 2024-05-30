import { Router } from 'express';
import generateJWT from '../middlewares/generateJWT';
import { jwtAuthenticator, localAuthenticator } from '../middlewares/auth';
import UserRouter from '@/routers/user';
import EventRouter from '@/routers/event';
const router = Router();

router.use('/user', UserRouter);
router.post('/login', localAuthenticator, generateJWT);
router.use('/event', EventRouter);
router.get('/profile', jwtAuthenticator, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;
