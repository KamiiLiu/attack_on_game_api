import { Router } from 'express';
import generateJWT from '../middlewares/generateJWT';
import { jwtAuthenticator, localAuthenticator } from '../middlewares/auth';
import UserRouter from '@/routers/user';
import EventRouter from '@/routers/eventRouter';
import PlayerRouter from '@/routers/player';
import PasswordRouter from '@/routers/password';
const router = Router();

router.use('/user', UserRouter);
router.use('/player', jwtAuthenticator, PlayerRouter);
router.post('/login', localAuthenticator, generateJWT);
router.use('/event', EventRouter);
router.use(PasswordRouter)

export default router;
