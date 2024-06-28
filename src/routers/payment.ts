
import express from 'express';
import { getPaymetData, getReturnData } from '@/controllers/paymentController';
const router = express.Router();


router.post('/', getPaymetData);

router.post('/notify', getReturnData)

export default router;