"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCodeDTO = void 0;
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TicketStatus_1 = require("@/enums/TicketStatus");
class TicketCodeDTO {
    constructor(ticketDto, orderDto, playDto) {
        this.name = orderDto.name || '';
        this.avatar = playDto.avatar || '';
        this.qrCodeStatus = ticketDto.qrCodeStatus || TicketStatus_1.TicketStatus.PENDING;
        this.qrCodeUsedTime =
            ticketDto.qrCodeUsedTime || (0, dayjs_1.default)().format(TIME_FORMATTER_1.default);
        this.idNumber = ticketDto.idNumber || '';
    }
    toDetailDTO() {
        return this;
    }
}
exports.TicketCodeDTO = TicketCodeDTO;
//# sourceMappingURL=TicketCodeDTO.js.map