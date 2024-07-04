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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifyData = exports.getReturnData = exports.getPaymetData = void 0;
const newEbPay_1 = require("@/utils/newEbPay");
const OrderModel_1 = __importDefault(require("@/models/OrderModel"));
const OrderStatus_1 = require("@/enums/OrderStatus");
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
        const { orderId } = req.body;
        const orderObj = yield OrderModel_1.default.findOne({ idNumber: orderId }).populate('eventId');
        if (!orderObj)
            return res.status(404).json({ message: 'Order not found' });
        console.log('orderObj:', orderObj);
        const order = {
            TimeStamp: Date.now(),
            MerchantOrderNo: orderObj.idNumber.replace(/-/g, '_'),
            MerchantID: config.MerchantID,
            Amt: orderObj.payment - orderObj.discount,
            Version: config.Version,
            RespondType: 'JSON',
            ItemDesc: orderObj.eventId.title,
            Email: 'eagle163013@gmail.com',
            ClientBackURL: config.FrontEndUrl,
            NotifyURL: config.NotifyUrl,
            OrderComment: orderObj.notes,
            ReturnURL: config.ReturnUrl,
        };
        const aesEncrypt = (0, newEbPay_1.create_mpg_aes_encrypt)(order);
        const shaEncrypt = (0, newEbPay_1.create_mpg_sha_encrypt)(aesEncrypt);
        console.log('send data:', aesEncrypt, shaEncrypt);
        res.json({
            status: true,
            data: {
                MerchantID: config.MerchantID,
                TradeInfo: aesEncrypt,
                TradeSha: shaEncrypt,
                Version: config.Version,
            },
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
        console.log('getNotifyData:', 'Body', response);
        const aesEncrypt = (0, newEbPay_1.create_mpg_sha_encrypt)(response.TradeInfo);
        if (aesEncrypt !== response.TradeSha) {
            console.log('訊息與訂單資料不一致', aesEncrypt, response.TradeSha);
            return res.end();
        }
        const aesDecrypt = (0, newEbPay_1.create_mpg_aes_decrypt)(response.TradeInfo);
        console.log('aesDecrypt:', aesDecrypt);
        const order = yield OrderModel_1.default.findOne({
            idNumber: aesDecrypt.Result.MerchantOrderNo.replace(/_/g, '-'),
        });
        if (!order) {
            console.log('can not find order ');
            return res.end();
        }
        order.paymentStatus = OrderStatus_1.PaymentStatus.COMPLETED;
        order.paymentMethod = aesDecrypt.PaymentType;
        yield order.save();
        res.end();
    }
    catch (error) {
        console.log('error:', error);
        res.end();
    }
});
exports.getNotifyData = getNotifyData;
//# sourceMappingURL=paymentController.js.map