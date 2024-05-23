import { body } from 'express-validator';

const eventValidator = [
  body('storeId').optional().isMongoId().withMessage('商店ID格式不對哦！'),
  body('title')
    .notEmpty()
    .withMessage('標題不能為空哦！')
    .isString()
    .withMessage('標題必須是字串哦！'),
  body('description')
    .notEmpty()
    .withMessage('描述不能為空哦！')
    .isString()
    .withMessage('描述必須是字串哦！'),
  body('eventStartTime')
    .notEmpty()
    .withMessage('活動開始時間不能為空哦！')
    .isISO8601()
    .withMessage('活動開始時間格式不對哦！'),
  body('eventEndTime')
    .notEmpty()
    .withMessage('活動結束時間不能為空哦！')
    .isISO8601()
    .withMessage('活動結束時間格式不對哦！'),
  body('registrationStartTime')
    .notEmpty()
    .withMessage('註冊開始時間不能為空哦！')
    .isISO8601()
    .withMessage('註冊開始時間格式不對哦！'),
  body('registrationEndTime')
    .notEmpty()
    .withMessage('註冊結束時間不能為空哦！')
    .isISO8601()
    .withMessage('註冊結束時間格式不對哦！'),
  body('isFoodAllowed')
    .notEmpty()
    .withMessage('是否允許食物不能為空哦！')
    .isBoolean()
    .withMessage('是否允許食物必須是布爾值哦！'),
  body('maxParticipants')
    .notEmpty()
    .withMessage('最大參與人數不能為空哦！')
    .isInt({ min: 1 })
    .withMessage('最大參與人數必須是一個正整數哦！'),
  body('minParticipants')
    .notEmpty()
    .withMessage('最小參與人數不能為空哦！')
    .isInt({ min: 1 })
    .withMessage('最小參與人數必須是一個正整數哦！'),
  body('currentParticipantsCount')
    .notEmpty()
    .withMessage('當前參與人數不能為空哦！')
    .isInt({ min: 0 })
    .withMessage('當前參與人數必須是一個非負整數哦！'),
  body('participationFee')
    .notEmpty()
    .withMessage('參與費用不能為空哦！')
    .isInt({ min: 0 })
    .withMessage('參與費用必須是一個非負數哦！'),
  body('eventImageUrl')
    .notEmpty()
    .withMessage('活動圖片URL不能為空哦！')
    .isURL()
    .withMessage('活動圖片URL格式不對哦！'),
  body('isAvailable')
    .notEmpty()
    .withMessage('活動上架狀態不能為空哦！')
    .isBoolean()
    .withMessage('活動上架狀態必須是一個布爾值哦！'),
];

export default eventValidator;
