import express from 'express';
import { storValidationRule } from '../validators/storeValidator';
import { validateFileds } from '../middlewares/validateFileds';
import { allowedFileds } from '../validators/storeValidator';
import {
  createStore,
  getStores,
  getStoreById,
  updateStore
} from '../controllers/storeController';

const router = express.Router();

// 待更新
router.post('/', createStore);

router.get('/', getStores);
router.get('/:id', getStoreById);
router.patch(
  '/:id',
  validateFileds(allowedFileds),
  storValidationRule,
  updateStore,
);



export default router;
