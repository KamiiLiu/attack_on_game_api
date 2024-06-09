"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const orderValidator = [
    (0, express_validator_1.body)('playerId')
        .notEmpty()
        .withMessage('小夥伴ID不能為空哦！')
        .isMongoId()
        .withMessage('小夥伴ID格式不對哦！'),
    (0, express_validator_1.body)('eventId')
        .notEmpty()
        .withMessage('活動ID不能為空哦！')
        .isMongoId()
        .withMessage('活動ID格式不對哦！'),
    (0, express_validator_1.body)('quantity')
        .notEmpty()
        .withMessage('出席人數不能為空哦！')
        .isNumeric()
        .withMessage('出席人數要填數字哦！'),
    (0, express_validator_1.body)('discount')
        .isNumeric()
        .withMessage('使用平台幣必須是數字格式捏！')
        .optional(),
    (0, express_validator_1.body)('payment').isNumeric().withMessage('付款金額必須是一個數字哦！'),
];
exports.default = orderValidator;
//# sourceMappingURL=orderValidator.js.map