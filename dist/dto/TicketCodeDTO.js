"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCodeDTO = void 0;
const TicketStatus_1 = require("@/enums/TicketStatus");
class TicketCodeDTO {
    constructor(ticketDto, orderDto, playDto) {
        this.name = orderDto.name || '';
        this.avatar = playDto.avatar || '';
        this.qrCodeStatus = ticketDto.qrCodeStatus || TicketStatus_1.TicketStatus.PENDING;
        this.qrCodeUsedTime = ticketDto.qrCodeUsedTime || '';
        this.idNumber = ticketDto.idNumber || '';
    }
    toDetailDTO() {
        return this;
    }
}
exports.TicketCodeDTO = TicketCodeDTO;
//# sourceMappingURL=TicketCodeDTO.js.map