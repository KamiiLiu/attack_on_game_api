'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EventDTO = void 0;
// src/dto/EventDTO.ts
const baseDTO_1 = require('@/dto/baseDTO');
class EventDTO extends baseDTO_1.BaseDTO {
  constructor(dto) {
    super(dto);
    this.storeId = dto.storeId;
    this.title = dto.title;
    this.address = dto.address;
    this.eventStartTime = dto.eventStartTime;
    this.eventEndTime = dto.eventEndTime;
    this.registrationStartTime = dto.registrationStartTime;
    this.registrationEndTime = dto.registrationEndTime;
    this.maxParticipants = dto.maxParticipants;
    this.minParticipants = dto.minParticipants;
    this.currentParticipantsCount = dto.currentParticipantsCount;
    this.participationFee = dto.participationFee;
    this.eventImageUrl = dto.eventImageUrl;
    this.isPublish = dto.isPublish;
  }
  get isEventPublished() {
    return this.isPublish;
  }
  toPreviewObject() {
    return {
      _id: this._id,
      storeId: this.storeId,
      title: this.title,
      address: this.address,
      eventStartTime: this.eventStartTime,
      eventEndTime: this.eventEndTime,
      registrationStartTime: this.registrationStartTime,
      registrationEndTime: this.registrationEndTime,
      maxParticipants: this.maxParticipants,
      minParticipants: this.minParticipants,
      currentParticipantsCount: this.currentParticipantsCount,
      participationFee: this.participationFee,
      eventImageUrl: this.eventImageUrl,
    };
  }
}
exports.EventDTO = EventDTO;
//# sourceMappingURL=EventDTO.js.map
