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
const eventDTO_1 = require("@/dto/eventDTO");
const EventRepository_1 = require("@/repositories/EventRepository");
const eventQueryParams_1 = require("@/services/eventQueryParams");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
const EventResponseType_1 = require("@/types/EventResponseType");
const LookupService_1 = require("./LookupService");
const OrderRepository_1 = require("@/repositories/OrderRepository");
const TicketRepository_1 = require("@/repositories/TicketRepository");
class EventService {
    constructor() {
        this.eventRepository = new EventRepository_1.EventRepository();
        this.queryParams = new eventQueryParams_1.QueryParamsParser();
        this.lookupService = new LookupService_1.LookupService(new OrderRepository_1.OrderRepository(), this.eventRepository, new TicketRepository_1.TicketRepository());
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findById(id);
            const eventDTO = new eventDTO_1.EventDTO(event);
            if (!eventDTO.isPublish) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.UNAUTHORIZED, EventResponseType_1.EventResponseType.FAILED_AUTHORIZATION);
            }
            const owner = yield this.lookupService.findStoreByStoreId(eventDTO.storeId);
            return { event: eventDTO.toDetailDTO(), store: owner };
        });
    }
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const _queryParams = this.queryParams.parse(queryParams);
            const eventData = yield this.eventRepository.findAll(_queryParams);
            if (lodash_1.default.isEmpty(eventData)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            return lodash_1.default.map(eventData, (event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
    create(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStoreById(queryParams);
            const _content = new eventDTO_1.EventDTO(Object.assign(Object.assign({}, queryParams.body), { storeId: store._id })).toDetailDTO();
            const eventDocument = yield this.eventRepository.create(_content);
            return new eventDTO_1.EventDTO(eventDocument);
        });
    }
    update(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStore(queryParams);
            const findEvent = yield this.eventRepository.findById(queryParams.params.id);
            console.log('findEvent', findEvent);
            console.log('store', store);
            console.log('queryParams.params.id', queryParams.params.id);
            if (store._id.toString() === findEvent.storeId.toString()) {
                const updateContent = Object.assign({ _id: findEvent._id, idNumber: findEvent.idNumber, storeId: store._id }, queryParams.body);
                const _content = new eventDTO_1.EventDTO(updateContent);
                const _event = yield this.eventRepository.update(_content);
                if (!lodash_1.default.isEmpty(_event)) {
                    const _eventDTO = new eventDTO_1.EventDTO(_event);
                    return _eventDTO.toDetailDTO();
                }
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
        });
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
    getEventsForStore(storeId, optionsReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = this.queryParams.parse(optionsReq);
            const eventData = yield this.eventRepository.getEventsByStoreId(storeId, queryParams);
            if (!lodash_1.default.isEmpty(eventData)) {
                const eventDTOs = lodash_1.default.map(eventData, (event) => new eventDTO_1.EventDTO(event).toDetailDTO());
                return eventDTOs;
            }
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
        });
    }
    getSummaryEvents(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findById(id);
            if (lodash_1.default.isEmpty(event)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            const _eventDTO = new eventDTO_1.EventDTO(event);
            if (_eventDTO.isPublish && _eventDTO.isRegisterable) {
                return _eventDTO.toSummaryDTO();
            }
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.UNAUTHORIZED, EventResponseType_1.EventResponseType.FAILED_AUTHORIZATION);
        });
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventService.js.map