"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDTO = void 0;
const baseDTO_1 = require("@/dto/baseDTO");
const OrderStatus_1 = require("@/enums/OrderStatus");
class OrderDTO extends baseDTO_1.BaseDTO {
    constructor(order) {
        super(order);
        this.eventId = order.eventId;
        this.playerId = order.playerId;
        this.payment = order.payment;
        this.discount = order.discount;
        this.name = order.name;
        this.phone = order.phone;
        this.registrationCount = order.registrationCount;
        this.notes = order.notes;
        this.paymentStatus = order.paymentStatus || OrderStatus_1.DefaultQuery.Payment_Status;
        this.paymentMethod = order.paymentMethod || OrderStatus_1.DefaultQuery.Payment_Status;
    }
    toDetailDTO() {
        return {
            eventId: this.eventId,
            playerId: this.playerId,
            payment: this.payment,
            discount: this.discount,
            name: this.name,
            phone: this.phone,
            registrationCount: this.registrationCount,
            notes: this.notes,
            paymentStatus: this.paymentStatus,
            paymentMethod: this.paymentMethod,
        };
    }
}
exports.OrderDTO = OrderDTO;
//# sourceMappingURL=orderDTO.js.map