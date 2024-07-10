"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDTO = void 0;
const baseDTO_1 = require("@/dto/baseDTO");
const OrderStatus_1 = require("@/enums/OrderStatus");
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
class OrderDTO extends baseDTO_1.BaseDTO {
    constructor(order) {
        var _a;
        super(order);
        this.idNumber = (_a = order.idNumber) !== null && _a !== void 0 ? _a : generateOrderNumber();
        this.eventId = order.eventId;
        this.playerId = order.playerId;
        this.payment = order.payment;
        this.discount = order.discount;
        this.name = order.name;
        this.phone = order.phone;
        this.registrationCount = order.registrationCount;
        this.email = order.email;
        this.notes = order.notes;
        this.isCommented = order.isCommented || false;
        this.status = order.status || OrderStatus_1.DefaultStatus.STATUS;
        this.paymentStatus = order.paymentStatus || OrderStatus_1.DefaultStatus.Payment_Status;
        this.paymentMethod = order.paymentMethod || OrderStatus_1.DefaultStatus.Payment_Method;
    }
    get getIdNumber() {
        return this.idNumber;
    }
    get getTotalAmount() {
        return this.payment + this.discount;
    }
    toDetailDTO() {
        return {
            idNumber: this.getIdNumber,
            eventId: this.eventId,
            playerId: this.playerId,
            payment: this.payment,
            discount: this.discount,
            name: this.name,
            phone: this.phone,
            registrationCount: this.registrationCount,
            email: this.email,
            notes: this.notes,
            paymentStatus: this.paymentStatus,
            paymentMethod: this.paymentMethod,
            status: this.status,
        };
    }
}
exports.OrderDTO = OrderDTO;
function generateOrderNumber() {
    const today = (0, dayjs_1.default)().format('YYMMDD');
    const randomStr = Math.random().toString(36).slice(2, 6).toLowerCase();
    const orderNumber = `o-${today}-${randomStr}`;
    return orderNumber;
}
//# sourceMappingURL=orderDTO.js.map