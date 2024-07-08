"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketDTO = void 0;
const baseDTO_1 = require("@/dto/baseDTO");
const mongoose_1 = require("mongoose");
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TicketStatus_1 = require("@/enums/TicketStatus");
class TicketDTO extends baseDTO_1.BaseDTO {
    constructor(dto) {
        var _a;
        const dtoWithId = {
            _id: dto._id || new mongoose_1.Types.ObjectId(),
            idNumber: (_a = dto.idNumber) !== null && _a !== void 0 ? _a : generateTicketNumber(),
            createdAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
            updatedAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
        };
        super(dtoWithId);
        this.orderId = dto.orderId || new mongoose_1.Types.ObjectId();
        this.playerId = dto.playerId || new mongoose_1.Types.ObjectId();
        this.qrCodeStatus = dto.qrCodeStatus || TicketStatus_1.TicketStatus.PENDING;
        this.qrCodeUsedTime = dto.qrCodeUsedTime || '';
    }
    toDetailDTO() {
        return {
            orderId: this.orderId,
            idNumber: this.idNumber,
            qrCodeStatus: this.qrCodeStatus,
            qrCodeUsedTime: this.qrCodeUsedTime,
        };
    }
}
exports.TicketDTO = TicketDTO;
function generateTicketNumber() {
    const today = (0, dayjs_1.default)().format('YYMMDD');
    const randomStr = Math.random().toString(36).slice(2, 6).toLowerCase();
    const orderNumber = `ticket-${today}-${randomStr}`;
    return orderNumber;
}
//# sourceMappingURL=ticketDTO.js.map