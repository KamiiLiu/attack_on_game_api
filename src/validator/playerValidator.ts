import { body } from 'express-validator';

export const createPlayerValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('phone')
    .notEmpty()
    .withMessage('Phone is required')
    .custom((value) => {
      if (!value.match(/^[0-9]{2}-[0-9]{8,9}$/)) {
        throw new Error('Invalid phone number');
      }
      return true;
    })
    .isString()
    .withMessage('Phone must be a string'),
  body('avatar')
    .notEmpty()
    .withMessage('Avatar is required')
    .custom((value) => {
      if (!/^https?:\/\/.+\..+$/.test(value)) {
        throw new Error('Invalid avatar');
      }
      return true;
    })
    .isString()
    .withMessage('Avatar must be a string'),
  body('preferGame')
    .notEmpty()
    .withMessage('PreferGame is required')
    .isArray()
    .withMessage('PreferGame must be an array'),
];

export const updatePlayerValidator = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('phone')
    .optional()
    .custom((value) => {
      if (!value.match(/^[0-9]{2}-[0-9]{8,9}$/)) {
        throw new Error('Invalid phone number');
      }
      return true;
    })
    .isString()
    .withMessage('Phone must be a string'),
  body('avatar')
    .optional()
    .custom((value) => {
      if (!/^https?:\/\/.+\..+$/.test(value)) {
        throw new Error('Invalid avatar');
      }
      return true;
    })
    .isString()
    .withMessage('Avatar must be a string'),
  body('preferGame')
    .optional()
    .isArray()
    .withMessage('PreferGame must be an array'),
];
