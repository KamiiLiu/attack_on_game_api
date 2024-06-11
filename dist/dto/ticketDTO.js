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
const nanoid_1 = require("nanoid");
class TicketDTO extends baseDTO_1.BaseDTO {
    constructor(dto) {
        const dtoWithId = {
            _id: dto._id || new mongoose_1.Types.ObjectId(),
            idNumber: dto.idNumber || (0, nanoid_1.nanoid)(),
            createdAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
            updatedAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
        };
        super(dtoWithId);
        this.orderIdNumber = dto.orderIdNumber || '';
        this.playerId = dto.playerId || new mongoose_1.Types.ObjectId();
        this.isQrCodeUsed = dto.isQrCodeUsed || false;
        this.qrCodeUrl = dto.qrCodeUrl || '';
    }
    toDetailDTO() {
        return {
            orderIdNumber: this.orderIdNumber,
            isQrCodeUsed: this.isQrCodeUsed,
            qrCodeUrl: this.qrCodeUrl,
        };
    }
}
exports.TicketDTO = TicketDTO;
//# sourceMappingURL=ticketDTO.js.map