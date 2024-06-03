"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventDTO_1 = require("@/dto/event/eventDTO");
const eventRepository_1 = require("@/repositories/eventRepository");
class EventService {
    constructor() {
        this.eventRepository = new eventRepository_1.EventRepository();
    }
    createEvent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const _content = new eventDTO_1.EventDTO(content).toDetailDTO();
            return yield this.eventRepository.createEvent(_content);
        });
    }
    updatedEvent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const _content = new eventDTO_1.EventDTO(content);
            return yield this.eventRepository.updatedEvent(id, _content);
        });
    }
    getDetailEvent(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, isPublish = true) {
            const _event = yield this.eventRepository.getEventById(id);
            if (_event) {
                const _eventDTO = new eventDTO_1.EventDTO(_event);
                if (isPublish) {
                    return _eventDTO.isPublish ? _eventDTO.toDetailDTO() : null;
                }
                else {
                    return _eventDTO.toDetailDTO();
                }
            }
            return null;
        });
    }
    getSummaryEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _event = yield this.eventRepository.getEventById(id);
            if (_event) {
                const _eventDTO = new eventDTO_1.EventDTO(_event);
                return _eventDTO.isPublish && _eventDTO.isRegisterable
                    ? _eventDTO.toSummaryDTO()
                    : null;
            }
            return null;
        });
    }
    getEvents(optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = yield this.eventRepository.getAllEvents(optionsReq);
            return eventData.map((event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
    getEventsByStore(storeId, optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = yield this.eventRepository.getEventsByStoreId(storeId, optionsReq);
            return eventData.map((event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
}
exports.EventService = EventService;
/*
  async updateEvent(eventId: string, eventData: IEvent) {
    try {
      const query = {
        _id: eventId,
        $expr: {
          $and: [
            { $gte: [eventData.currentParticipantsCount, '$minParticipants'] };
            { $lte: [eventData.currentParticipantsCount, '$maxParticipants'] };
          ],
        };
      };
      const updatedEvent = await Event.findOneAndUpdate(query, eventData, {
        new: true,
      }); //TODO:updatedAt: new Date()
      if (!updatedEvent) {
        return handleClientError('沒有這個活動～或活動已被下架');
      }
      return handleSuccess();
    } catch (error) {
      return handleServerError(error, '更新活動資料時發生意外');
    }
  };
  async updatePublishStatus(eventId: string, status: boolean = true) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        new mongoose.Types.ObjectId(eventId),
        { isPublish: status, updatedAt: new Date() };
        { new: true };
      );
      if (!updatedEvent) {
        return handleClientError('找不到這個活動');
      }
      return handleSuccess();
    } catch (error) {
      return handleServerError(error, '更新活動資料時發生意外');
    }
  };
};
 */
//# sourceMappingURL=eventService.js.map