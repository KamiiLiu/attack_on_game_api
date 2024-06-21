import express from 'express';
import { storValidationRule } from '../validators/storeValidator';
import { validateFileds } from '../middlewares/validateFileds';
import { allowedFileds } from '../validators/storeValidator';
import {
  createStore,
  getStores,
  getStoreById,
  updateStore,
} from '../controllers/storeController';
import { jwtAuthenticator } from '../middlewares/auth';

const router = express.Router();

router.post('/', jwtAuthenticator, createStore);
router.get('/', getStores);
router.get('/:id', getStoreById);
router.patch(
  '/:id',
  jwtAuthenticator,
  validateFileds(allowedFileds),
  storValidationRule,
  updateStore,
);

export default router;
