import { body, ValidationChain } from 'express-validator';
import { validateNanoidIds } from '@/config/validators/commonConfig';
type ValidationConfig = {
  [key: string]: ValidationChain[];
};
export const validationConfig: {
  body: ValidationConfig;
  query: ValidationConfig;
  param: ValidationConfig;
} = {
  body: {
    eventId: [
      body('eventId')
        .custom(validateNanoidIds)
        .withMessage('eventId 必須符合資料庫結構')
        .notEmpty()
        .withMessage('eventId 不能為空'),
    ],
    payment: [
      body('payment')
        .isInt({ min: 0 })
        .withMessage('payment 必須是一個整數')
        .notEmpty()
        .withMessage('payment 不能為空'),
    ],
    discount: [
      body('discount')
        .isInt({ min: 0 })
        .withMessage('discount 必須是一個整數')
        .notEmpty()
        .withMessage('discount 不能為空'),
    ],
    name: [
      body('name')
        .isString()
        .withMessage('name 必須是一個字符串')
        .notEmpty()
        .withMessage('name 不能為空'),
    ],
    phone: [
      body('phone')
        .isString()
        .withMessage('phone 必須是一個字符串')
        .notEmpty()
        .withMessage('phone 不能為空'),
    ],
    registrationCount: [
      body('registrationCount')
        .isInt({ min: 1 })
        .withMessage('registrationCount 必須是一個整數')
        .notEmpty()
        .withMessage('registrationCount 不能為空'),
    ],
    notes: [
      body('notes').optional().isString().withMessage('notes 必須是一個字符串'),
    ],
  },
  query: {},
  param: {},
};
