"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReturnData = exports.getPaymetData = void 0;
const newEbPay_1 = require("@/utils/newEbPay");
/**
 *
 *  {
    "eventId": "cco7quxx",
    "payment":250,
    "discount": 50,
    "name": "Carol White",
    "phone": "789-012-3456",
    "registrationCount": 1
}
 *
 */
const config = {
    MerchantID: process.env.MerchantID || '',
    Version: process.env.VERSION || '2.0',
    PayGateWay: process.env.PayGateWay || '',
    ReturnUrl: process.env.ReturnUrl || '',
    NotifyUrl: process.env.NotifyUrl || ''
};
const getPaymetData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, payment } = req.body;
        const order = {
            TimeStamp: Date.now(),
            MerchantOrderNo: Date.now(),
            Amt: payment,
            ItemDesc: eventId,
            Email: "eagle163013@gmail.com"
        };
        const aesEncrypt = (0, newEbPay_1.create_mpg_aes_encrypt)(order);
        const shaEncrypt = (0, newEbPay_1.create_mpg_sha_encrypt)(aesEncrypt);
        console.log('send data:', aesEncrypt, shaEncrypt);
        res.send({
            MerchantID: config.MerchantID,
            TradeInfo: aesEncrypt,
            TradeSha: shaEncrypt,
            Version: config.Version,
            PayGateWay: config.PayGateWay,
            ReturnUrl: config.ReturnUrl,
            NotifyUrl: config.NotifyUrl,
        });
    }
    catch (error) {
        console.log('error:', error);
    }
});
exports.getPaymetData = getPaymetData;
const getReturnData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = req.body;
        const thisShaEncrypt = (0, newEbPay_1.create_mpg_aes_decrypt)(response.TradeInfo);
        // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
        if (!thisShaEncrypt === response.TradeSha) {
            console.log('付款失敗：TradeSha 不一致');
            return res.end();
        }
        // 解密交易內容
        const data = (0, newEbPay_1.create_mpg_aes_decrypt)(response.TradeInfo);
        console.log('data:', data);
        return res.end();
    }
    catch (error) {
        console.log('error:', error);
    }
});
exports.getReturnData = getReturnData;
//# sourceMappingURL=paymentController.js.map