"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventDTO = void 0;
const baseDTO_1 = require("@/dto/baseDTO");
class CreateEventDTO extends baseDTO_1.BaseDTO {
    constructor(dto) {
        super(dto);
        this.storeId = dto.storeId;
        this.title = dto.title;
        this.description = dto.description;
        this.address = dto.address;
        this.eventStartTime = dto.eventStartTime;
        this.eventEndTime = dto.eventEndTime;
        this.registrationStartTime = dto.registrationStartTime;
        this.registrationEndTime = dto.registrationEndTime;
        this.isFoodAllowed = dto.isFoodAllowed;
        this.maxParticipants = dto.maxParticipants;
        this.minParticipants = dto.minParticipants;
        this.participationFee = dto.participationFee;
        this.eventImageUrl = dto.eventImageUrl;
    }
}
exports.CreateEventDTO = CreateEventDTO;
//# sourceMappingURL=createEventDTO.js.map