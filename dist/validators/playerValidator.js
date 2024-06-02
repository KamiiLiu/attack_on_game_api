"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerValidator = exports.createPlayerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPlayerValidator = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    (0, express_validator_1.body)('phone')
        .notEmpty()
        .withMessage('Phone is required')
        .isString()
        .withMessage('Phone must be a string')
        .custom((value) => {
        if (!value.match(/^0[0-9]{9}$/)) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    (0, express_validator_1.body)('avatar')
        .notEmpty()
        .withMessage('Avatar is required')
        .isString()
        .withMessage('Avatar must be a string')
        .custom((value) => {
        if (!/^https?:\/\/.+\..+$/.test(value)) {
            throw new Error('Invalid avatar');
        }
        return true;
    }),
    (0, express_validator_1.body)('preferGame')
        .notEmpty()
        .withMessage('PreferGame is required')
        .isArray()
        .withMessage('PreferGame must be an array'),
];
exports.updatePlayerValidator = [
    (0, express_validator_1.body)('name').optional().isString().withMessage('Name must be a string'),
    (0, express_validator_1.body)('phone')
        .optional()
        .isString()
        .withMessage('Phone must be a string')
        .custom((value) => {
        if (!value.match(/^0[0-9]{9}$/)) {
            throw new Error('Invalid phone number');
        }
        return true;
    }),
    (0, express_validator_1.body)('avatar')
        .optional()
        .isString()
        .withMessage('Avatar must be a string')
        .custom((value) => {
        if (!/^https?:\/\/.+\..+$/.test(value)) {
            throw new Error('Invalid avatar');
        }
        return true;
    }),
    (0, express_validator_1.body)('preferGame')
        .optional()
        .isArray()
        .withMessage('PreferGame must be an array'),
];
