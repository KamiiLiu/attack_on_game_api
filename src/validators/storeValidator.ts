import { body } from 'express-validator';

export const allowedFileds = [
  'name',
  'user',
  'avatar',
  'introduce',
  'address',
  'phone',
];

export const storValidationRule = [
  body('name')
    .notEmpty()
    .withMessage(' Name is required.')
    .isString()
    .withMessage('Name must be String.'),
  body('user')
    .notEmpty()
    .withMessage('User is required.')
    .isMongoId()
    .withMessage('User must be a valid MongoDB ObjectId.'),
  body('avatar').optional().isString().withMessage('Avatar must be a String.'),
  body('introduce')
    .optional()
    .isString()
    .withMessage('Introduce must be a String.'),
  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a String.'),
  body('phone').optional().isString().withMessage('Phone must be a String.'),
];
