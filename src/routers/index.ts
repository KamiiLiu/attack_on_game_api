import { Router } from 'express';
import generateJWT from '../middlewares/generateJWT';
import { jwtAuthenticator, localAuthenticator } from '../middlewares/auth';
import UserRouter from '@/routers/user';
import EventRouter from '@/routers/eventRouter';
import PlayerRouter from '@/routers/player';
import StoreRouter from '@/routers/storeRouter'


const router = Router();

router.use('/user', UserRouter);
router.use('/player', jwtAuthenticator, PlayerRouter);
router.post('/login', localAuthenticator, generateJWT);
router.use('/event', EventRouter);
router.use('/store', StoreRouter);

export default router;
