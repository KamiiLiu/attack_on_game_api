import { Router } from 'express';
import UtilsController from '@/controllers/utilsController';

const router = Router();

router.get('/freshEventTime', UtilsController.freshEvent);

export default router;
