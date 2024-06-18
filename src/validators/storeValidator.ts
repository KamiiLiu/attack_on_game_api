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
  body('avatar').optional().isString().withMessage('Avatar must be a String.'),
  body('introduce')
    .optional()
    .isString()
    .withMessage('Introduce must be a String.'),
  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a String.'),
  body('phone')
    .optional()
    .isString()
    .withMessage('Phone must be a String.')
    .custom((value) => {
      if (!value.match(/^0[0-9]{9}$/)) {
        throw new Error('Invalid phone number');
      }
      return true;
    }),
];
