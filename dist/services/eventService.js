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
            return yield this.eventRepository.updateEvent(id, _content);
        });
    }
    getDetailEvent(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, isPublish = true) {
            const _event = yield this.eventRepository.getEventById(id);
            if (!lodash_1.default.isEmpty(_event)) {
                const _eventDTO = new eventDTO_1.EventDTO(_event);
                return isPublish
                    ? _eventDTO.isPublish
                        ? _eventDTO.toDetailDTO()
                        : null
                    : _eventDTO.toDetailDTO();
            }
            return null;
        });
    }
    getSummaryEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _event = yield this.eventRepository.getEventById(id);
            if (!lodash_1.default.isEmpty(_event)) {
                const _eventDTO = new eventDTO_1.EventDTO(_event);
                return _eventDTO.isPublish && _eventDTO.isRegisterable
                    ? _eventDTO.toSummaryDTO()
                    : null;
            }
            return null;
        });
    }
    getEventsByStore(storeId, optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = this.queryParams.parse(optionsReq);
            const eventData = yield this.eventRepository.getEventsByStoreId(storeId, queryParams);
            return lodash_1.default.map(eventData, (event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
    getEvents(optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = this.queryParams.parse(optionsReq);
            const eventData = yield this.eventRepository.getAllEvents(queryParams);
            return lodash_1.default.map(eventData, (event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventService.js.map