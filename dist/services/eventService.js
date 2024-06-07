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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
const lodash_1 = __importDefault(require("lodash"));
const eventDTO_1 = require("@/dto/event/eventDTO");
const eventRepository_1 = require("@/repositories/eventRepository");
const eventQueryParams_1 = require("@/services/eventQueryParams");
class EventService {
    constructor() {
        this.eventRepository = new eventRepository_1.EventRepository();
        this.queryParams = new eventQueryParams_1.QueryParamsParser();
    }
    createEvent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const _content = new eventDTO_1.EventDTO(content).toDetailDTO();
            return yield this.eventRepository.createEvent(_content);
        });
    }
    updateEvent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const _content = new eventDTO_1.EventDTO(content);
            const _event = yield this.eventRepository.updateEvent(id, _content);
            if (!lodash_1.default.isEmpty(_event.data)) {
                const _eventDTO = new eventDTO_1.EventDTO(_event.data);
                return { success: true, data: _eventDTO.toDetailDTO() };
            }
            return { success: false, error: _event.error };
        });
    }
    getDetailEvent(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, isPublish = true) {
            const _event = yield this.eventRepository.getEventById(id);
            if (!lodash_1.default.isEmpty(_event.data)) {
                const _eventDTO = new eventDTO_1.EventDTO(_event.data);
                if (isPublish && !_eventDTO.isPublish) {
                    return { success: false };
                }
                return { success: _event.success, data: _eventDTO.toDetailDTO() };
            }
            return { success: false, error: _event.error };
        });
    }
    getSummaryEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _event = yield this.eventRepository.getEventById(id);
            if (!lodash_1.default.isEmpty(_event.data)) {
                const _eventDTO = new eventDTO_1.EventDTO(_event.data);
                if (_eventDTO.isPublish && _eventDTO.isRegisterable) {
                    return { success: true, data: _eventDTO.toSummaryDTO() };
                }
                return { success: false };
            }
            return { success: false, error: _event.error };
        });
    }
    getEventsByStore(storeId, optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = this.queryParams.parse(optionsReq);
            const eventData = yield this.eventRepository.getEventsByStoreId(storeId, queryParams);
            if (eventData.success) {
                const eventDTOs = lodash_1.default.map(eventData.data, (event) => new eventDTO_1.EventDTO(event).toDetailDTO());
                return { success: eventData.success, data: eventDTOs };
            }
            return { success: eventData.success, error: eventData.error };
        });
    }
    getEvents(optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = this.queryParams.parse(optionsReq);
            const eventData = yield this.eventRepository.getAllEvents(queryParams);
            if (eventData.success) {
                const eventDTOs = lodash_1.default.map(eventData.data, (event) => new eventDTO_1.EventDTO(event).toDetailDTO());
                return { success: eventData.success, data: eventDTOs };
            }
            return { success: eventData.success, error: eventData.error };
        });
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventService.js.map