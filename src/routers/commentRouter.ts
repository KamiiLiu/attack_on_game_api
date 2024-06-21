import express from 'express';
import { storValidationRule } from '../validators/storeValidator';
import { validateFileds } from '../middlewares/validateFileds';
import { allowedFileds } from '../validators/storeValidator';
import { createComment } from '../controllers/commentController';
import { jwtAuthenticator } from '../middlewares/auth';

const router = express.Router();

// 待更新
router.post('/event/:id/messageBoard', jwtAuthenticator, createComment);

export default router;
