"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storValidationRule = exports.allowedFileds = void 0;
const express_validator_1 = require("express-validator");
exports.allowedFileds = [
    'name',
    'user',
    'avatar',
    'introduce',
    'address',
    'phone',
];
exports.storValidationRule = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage(' Name is required.')
        .isString()
        .withMessage('Name must be String.'),
    (0, express_validator_1.body)('avatar').optional().isString().withMessage('Avatar must be a String.'),
    (0, express_validator_1.body)('introduce')
        .optional()
        .isString()
        .withMessage('Introduce must be a String.'),
    (0, express_validator_1.body)('address')
        .optional()
        .isString()
        .withMessage('Address must be a String.'),
    (0, express_validator_1.body)('phone')
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
//# sourceMappingURL=storeValidator.js.map