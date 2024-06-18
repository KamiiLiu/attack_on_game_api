import { body } from 'express-validator';

export const commentObjValidationRule = [
  body('content')
    .notEmpty()
    .withMessage('content is required.')
    .isString()
    .withMessage('content must be String.'),
];
