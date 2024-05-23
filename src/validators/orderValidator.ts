import { body } from 'express-validator';

const orderValidator = [
  body('playerId')
    .notEmpty()
    .withMessage('小夥伴ID不能為空哦！')
    .isMongoId()
    .withMessage('小夥伴ID格式不對哦！'),
  body('eventId')
    .notEmpty()
    .withMessage('活動ID不能為空哦！')
    .isMongoId()
    .withMessage('活動ID格式不對哦！'),
  body('quantity')
    .notEmpty()
    .withMessage('出席人數不能為空哦！')
    .isNumeric()
    .withMessage('出席人數要填數字哦！'),
  body('discount')
    .isNumeric()
    .withMessage('使用平台幣必須是數字格式捏！')
    .optional(),
  body('payment').isNumeric().withMessage('付款金額必須是一個數字哦！'),
];

export default orderValidator;
