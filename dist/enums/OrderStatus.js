"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStatus = exports.Status = exports.PaymentMethod = exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["PAYPAL"] = "paypal";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var Status;
(function (Status) {
    Status["USED"] = "\u5DF2\u4F7F\u7528";
    Status["UNUSED"] = "\u5373\u5C07\u958B\u59CB";
    Status["CANCEL"] = "\u5DF2\u53D6\u6D88";
})(Status || (exports.Status = Status = {}));
var DefaultStatus;
(function (DefaultStatus) {
    DefaultStatus["Payment_Status"] = "pending";
    DefaultStatus["Payment_Method"] = "credit_card";
    DefaultStatus["STATUS"] = "\u5373\u5C07\u958B\u59CB";
})(DefaultStatus || (exports.DefaultStatus = DefaultStatus = {}));
//# sourceMappingURL=OrderStatus.js.map