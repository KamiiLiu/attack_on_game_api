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
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const TicketStatus_1 = require("@/enums/TicketStatus");
const TicketSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    playerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'players',
        required: true,
    },
    idNumber: { type: String, required: true },
    qrCodeStatus: {
        type: String,
        enum: Object.values(TicketStatus_1.TicketStatus),
        default: TicketStatus_1.TicketStatus.PENDING,
    },
    createdAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
    updatedAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
    qrCodeUsedTime: { type: String, default: '' },
});
TicketSchema.pre('save', function (next) {
    this.updatedAt = (0, dayjs_1.default)().format(TIME_FORMATTER_1.default);
    next();
});
const Ticket = mongoose_1.default.model('Ticket', TicketSchema);
exports.default = Ticket;
//# sourceMappingURL=TicketModel.js.map