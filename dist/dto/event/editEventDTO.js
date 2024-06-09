'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EventDTO = void 0;
// src/dto/EventDTO.ts
const baseDTO_1 = require('@/dto/baseDTO');
class EventDTO extends baseDTO_1.BaseDTO {
  get vacancyQuantity() {
    return this.vacancy;
  }
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
    this.currentParticipantsCount = dto.currentParticipantsCount;
    this.participationFee = dto.participationFee;
    this.eventImageUrl = dto.eventImageUrl;
    this.isPublish = dto.isPublish;
    this.vacancy = dto.maxParticipants - dto.currentParticipantsCount;
  }
}
exports.EventDTO = EventDTO;
//# sourceMappingURL=editEventDTO.js.map
