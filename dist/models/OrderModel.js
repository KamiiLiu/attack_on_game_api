"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const OrderStatus_1 = require("@/enums/OrderStatus");
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const OrderSchema = new mongoose_1.Schema({
    eventId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    playerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    idNumber: { type: String, required: true, unique: true },
    registrationCount: { type: Number, required: true },
    payment: { type: Number, required: true },
    discount: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, default: '' },
    isCommented: { type: Boolean, default: false },
    status: {
        type: String,
        enum: Object.values(OrderStatus_1.Status),
        default: OrderStatus_1.DefaultStatus.STATUS,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(OrderStatus_1.PaymentStatus),
        default: OrderStatus_1.DefaultStatus.Payment_Status,
    },
    paymentMethod: {
        type: String,
        enum: Object.values(OrderStatus_1.PaymentMethod),
        default: OrderStatus_1.DefaultStatus.Payment_Method,
    },
    createdAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
    updatedAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
});
OrderSchema.index({ eventId: 1, playerId: 1 }, { unique: true });
const Order = mongoose_1.default.model('Order', OrderSchema);
exports.default = Order;
//# sourceMappingURL=OrderModel.js.map