import { Router } from 'express';
import generateJWT from '../middlewares/generateJWT';
import { jwtAuthenticator, localAuthenticator } from '../middlewares/auth';
import UserRouter from '@/routers/user';
import EventRouter from '@/routers/eventRouter';
import PlayerRouter from '@/routers/player';
import StoreRouter from '@/routers/storeRouter';
import OrderRouter from '@/routers/orderRouter';
import MyEventRouter from '@/routers/myEventRouter';
import PasswordRouter from '@/routers/password';
import CommentRouter from '../routers/commentRouter';
import ReviewRouter from '@/routers/review';
import PaymetRouter from '@/routers/payment';

const router = Router();
router.use('/user', UserRouter);
router.use('/player', jwtAuthenticator, PlayerRouter);
router.post('/login', localAuthenticator, generateJWT);
router.use('/event', EventRouter);
router.use('/myevent', MyEventRouter);
router.use('/order', OrderRouter);
router.use(PasswordRouter);
router.use('/store', StoreRouter);
router.use('/', CommentRouter);
router.use('/review', ReviewRouter);
router.use('/payment', PaymetRouter);

router.post('/return', (req, res) => {
    try {
        console.log('return:', req.body);

        res.redirect(`${process.env.FrontEndUrl}/#/player/admin/checkout/success`);
    } catch (error) {
        console.log('error:', error);
        res.send('error');
    }

});

router.post('/notify', (req, res) => {
    try {
        console.log('notify:', req.body);
        res.send('notify');
    } catch (error) {
        console.log('error:', error);
        res.send('error');
    }

});
export default router;
