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
exports.getNotifyData = exports.getReturnData = exports.getPaymetData = void 0;
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
    NotifyUrl: process.env.NotifyUrl || '',
    FrontEndUrl: process.env.FrontEndUrl || '',
};
const getPaymetData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, payment } = req.body;
        const order = {
            TimeStamp: Date.now(),
            MerchantOrderNo: Date.now(),
            Amt: payment,
            ItemDesc: eventId,
            Email: "eagle163013@gmail.com",
            ClientBackURL: `${config.FrontEndUrl}/#/player/admin/checkout/success`,
            NotifyURL: config.NotifyUrl,
            OrderComment: "Payment test",
            ReturnURL: config.ReturnUrl,
        };
        const aesEncrypt = (0, newEbPay_1.create_mpg_aes_encrypt)(order);
        const shaEncrypt = (0, newEbPay_1.create_mpg_sha_encrypt)(aesEncrypt);
        console.log('send data:', aesEncrypt, shaEncrypt);
        res.send({
            MerchantID: config.MerchantID,
            TradeInfo: aesEncrypt,
            TradeSha: shaEncrypt,
            Version: config.Version,
            //ReturnURL: config.ReturnUrl,
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
        const { Status } = response;
        console.log('Return response:', response);
        if (Status !== 'SUCCESS')
            return res.redirect(`${config.FrontEndUrl}/#/player/admin/checkout/fail`);
        res.redirect(`${config.FrontEndUrl}/#/player/admin/checkout/success`);
    }
    catch (error) {
        console.log('error:', error);
    }
});
exports.getReturnData = getReturnData;
const getNotifyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = req.body;
        console.log('getNotifyData:', "Body", response);
        const aesEncrypt = (0, newEbPay_1.create_mpg_aes_encrypt)(response.TradeInfo);
        if (aesEncrypt !== response.TradeInfo) {
            console.log('aesEncrypt:', aesEncrypt, response.TradeInfo);
            return res.end();
        }
        const aesDecrypt = (0, newEbPay_1.create_mpg_aes_decrypt)(response.TradeInfo);
        console.log('aesDecrypt:', aesDecrypt);
        res.end();
    }
    catch (error) {
        res.end();
    }
});
exports.getNotifyData = getNotifyData;
//# sourceMappingURL=paymentController.js.map