"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const allowedParams = [
    'storeId',
    'title',
    'description',
    'eventStartTime',
    'eventEndTime',
    'registrationStartTime',
    'registrationEndTime',
    'isFoodAllowed',
    'maxParticipants',
    'minParticipants',
    'currentParticipantsCount',
    'participationFee',
    'eventImageUrl',
    'address',
];
const eventValidator = [
    (0, express_validator_1.body)('storeId').optional().isMongoId().withMessage('商店ID格式不對哦！'),
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('標題不能為空哦！')
        .isString()
        .withMessage('標題必須是字串哦！'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .withMessage('描述不能為空哦！')
        .isString()
        .withMessage('描述必須是字串哦！'),
    (0, express_validator_1.body)('eventStartTime')
        .notEmpty()
        .withMessage('活動開始時間不能為空哦！')
        .isISO8601()
        .withMessage('活動開始時間格式不對哦！'),
    (0, express_validator_1.body)('eventEndTime')
        .notEmpty()
        .withMessage('活動結束時間不能為空哦！')
        .isISO8601()
        .withMessage('活動結束時間格式不對哦！'),
    (0, express_validator_1.body)('registrationStartTime')
        .notEmpty()
        .withMessage('註冊開始時間不能為空哦！')
        .isISO8601()
        .withMessage('註冊開始時間格式不對哦！'),
    (0, express_validator_1.body)('registrationEndTime')
        .notEmpty()
        .withMessage('註冊結束時間不能為空哦！')
        .isISO8601()
        .withMessage('註冊結束時間格式不對哦！'),
    (0, express_validator_1.body)('address')
        .notEmpty()
        .withMessage('地址不能為空哦！')
        .isString()
        .withMessage('地址必須是字串哦！'),
    (0, express_validator_1.body)('isFoodAllowed')
        .notEmpty()
        .withMessage('是否允許食物不能為空哦！')
        .isBoolean()
        .withMessage('是否允許食物必須是布爾值哦！'),
    (0, express_validator_1.body)('maxParticipants')
        .notEmpty()
        .withMessage('最大參與人數不能為空哦！')
        .isInt({ min: 1 })
        .withMessage('最大參與人數必須是一個正整數哦！'),
    (0, express_validator_1.body)('minParticipants')
        .notEmpty()
        .withMessage('最小參與人數不能為空哦！')
        .isInt({ min: 1 })
        .withMessage('最小參與人數必須是一個正整數哦！'),
    (0, express_validator_1.body)('participationFee')
        .notEmpty()
        .withMessage('參與費用不能為空哦！')
        .isInt({ min: 0 })
        .withMessage('參與費用必須是一個非負數哦！'),
    (0, express_validator_1.body)('eventImageUrl')
        .notEmpty()
        .withMessage('活動圖片URL不能為空哦！')
        .isArray({ min: 1 })
        .withMessage('活動圖片URL必須是一個非空數組哦！')
        .custom((value) => {
        for (const url of value) {
            if (!/^https?:\/\/.+\..+$/.test(url)) {
                throw new Error('活動圖片URL格式不對哦！');
            }
        }
        return true;
    }),
    (0, express_validator_1.body)().custom((value, { req }) => {
        const extraParams = Object.keys(req.body).filter((param) => !allowedParams.includes(param));
        if (extraParams.length) {
            throw new Error(`包含未允許的參數: ${extraParams.join(', ')}`);
        }
        return true;
    }),
    (0, express_validator_1.check)('minParticipants').custom((value, { req }) => {
        if (value > req.body.maxParticipants) {
            throw new Error('最小參與人數不能大於最大參與人數哦！');
        }
        return true;
    }),
];
exports.default = eventValidator;
/*
body('isPublish')
    .notEmpty()
    .withMessage('活動上架狀態不能為空哦！')
    .isBoolean()
    .withMessage('活動上架狀態必須是一個布爾值哦！'),
  body('currentParticipantsCount')
    .notEmpty()
    .withMessage('當前參與人數不能為空哦！')
    .isInt({ min: 0 })
    .withMessage('當前參與人數必須是一個非負整數哦！'),
*/
