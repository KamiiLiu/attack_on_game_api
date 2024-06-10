"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultQuery = exports.PaymentMethod = exports.PaymentStatus = void 0;
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
var DefaultQuery;
(function (DefaultQuery) {
    DefaultQuery["Payment_Status"] = "pending";
    DefaultQuery["Payment_Method"] = "credit_card";
})(DefaultQuery || (exports.DefaultQuery = DefaultQuery = {}));
//# sourceMappingURL=OrderStatus.js.map