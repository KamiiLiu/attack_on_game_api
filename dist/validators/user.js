"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.userUpdateValidator = exports.userCreateValidator = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
exports.userCreateValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password is too short'),
    (0, express_validator_1.body)('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(Object.values(User_1.UserRole))
        .withMessage('Role is invalid'),
];
exports.userUpdateValidator = [
    (0, express_validator_1.body)('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password is too short'),
];
exports.loginValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password is too short'),
];
