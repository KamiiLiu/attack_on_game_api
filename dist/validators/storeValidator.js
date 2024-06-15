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
    (0, express_validator_1.body)('user')
        .notEmpty()
        .withMessage('User is required.')
        .isMongoId()
        .withMessage('User must be a valid MongoDB ObjectId.'),
    (0, express_validator_1.body)('avatar').optional().isString().withMessage('Avatar must be a String.'),
    (0, express_validator_1.body)('introduce')
        .optional()
        .isString()
        .withMessage('Introduce must be a String.'),
    (0, express_validator_1.body)('address')
        .optional()
        .isString()
        .withMessage('Address must be a String.'),
    (0, express_validator_1.body)('phone').optional().isString().withMessage('Phone must be a String.'),
];
//# sourceMappingURL=storeValidator.js.map