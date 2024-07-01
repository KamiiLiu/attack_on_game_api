
import express from 'express';
import { getPaymetData, getReturnData, getNotifyData } from '@/controllers/paymentController';
const router = express.Router();


router.post('/', getPaymetData);

router.post('/notify', getNotifyData)

router.post('/return', getReturnData)

export default router; 