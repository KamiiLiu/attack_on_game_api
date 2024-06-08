"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerValidator = exports.createPlayerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPlayerValidator = [
    (0, express_validator_1.body)('name')
<<<<<<< HEAD
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    (0, express_validator_1.body)('phone')
        .notEmpty().withMessage('Phone is required')
=======
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    (0, express_validator_1.body)('phone')
        .notEmpty()
        .withMessage('Phone is required')
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
        .custom((value) => {
        if (!value.match(/^[0-9]{2}-[0-9]{8,9}$/)) {
            throw new Error('Invalid phone number');
        }
        return true;
    })
<<<<<<< HEAD
        .isString().withMessage('Phone must be a string'),
    (0, express_validator_1.body)('avatar')
        .notEmpty().withMessage('Avatar is required')
=======
        .isString()
        .withMessage('Phone must be a string'),
    (0, express_validator_1.body)('avatar')
        .notEmpty()
        .withMessage('Avatar is required')
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
        .custom((value) => {
        if (!/^https?:\/\/.+\..+$/.test(value)) {
            throw new Error('Invalid avatar');
        }
        return true;
    })
<<<<<<< HEAD
        .isString().withMessage('Avatar must be a string'),
    (0, express_validator_1.body)('preferGame')
        .notEmpty().withMessage('PreferGame is required')
        .isArray().withMessage('PreferGame must be an array'),
];
exports.updatePlayerValidator = [
    (0, express_validator_1.body)('name')
        .optional()
        .isString().withMessage('Name must be a string'),
=======
        .isString()
        .withMessage('Avatar must be a string'),
    (0, express_validator_1.body)('preferGame')
        .notEmpty()
        .withMessage('PreferGame is required')
        .isArray()
        .withMessage('PreferGame must be an array'),
];
exports.updatePlayerValidator = [
    (0, express_validator_1.body)('name').optional().isString().withMessage('Name must be a string'),
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
    (0, express_validator_1.body)('phone')
        .optional()
        .custom((value) => {
        if (!value.match(/^[0-9]{2}-[0-9]{8,9}$/)) {
            throw new Error('Invalid phone number');
        }
        return true;
    })
<<<<<<< HEAD
        .isString().withMessage('Phone must be a string'),
=======
        .isString()
        .withMessage('Phone must be a string'),
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
    (0, express_validator_1.body)('avatar')
        .optional()
        .custom((value) => {
        if (!/^https?:\/\/.+\..+$/.test(value)) {
            throw new Error('Invalid avatar');
        }
        return true;
    })
<<<<<<< HEAD
        .isString().withMessage('Avatar must be a string'),
    (0, express_validator_1.body)('preferGame')
        .optional()
        .isArray().withMessage('PreferGame must be an array'),
];
=======
        .isString()
        .withMessage('Avatar must be a string'),
    (0, express_validator_1.body)('preferGame')
        .optional()
        .isArray()
        .withMessage('PreferGame must be an array'),
];
//# sourceMappingURL=playerValidator.js.map
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
