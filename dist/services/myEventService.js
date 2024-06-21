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
exports.MyEventService = void 0;
const EventRepository_1 = require("@/repositories/EventRepository");
const LookupService_1 = require("./LookupService");
const CustomError_1 = require("@/errors/CustomError");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const EventResponseType_1 = require("@/types/EventResponseType");
const eventDTO_1 = require("@/dto/eventDTO");
const OrderRepository_1 = require("@/repositories/OrderRepository");
const TicketRepository_1 = require("@/repositories/TicketRepository");
class MyEventService {
    constructor() {
        this.EventRepository = new EventRepository_1.EventRepository();
        this.lookupService = new LookupService_1.LookupService(new OrderRepository_1.OrderRepository(), this.EventRepository, new TicketRepository_1.TicketRepository());
    }
    getOrderByEventId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStore(req);
            const event = yield this.lookupService.findEventById(id);
            const eventDTO = new eventDTO_1.EventDTO(event);
            if (!eventDTO.isPublish) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.UNAUTHORIZED, EventResponseType_1.EventResponseType.FAILED_AUTHORIZATION);
            }
            return eventDTO.toDetailDTO();
        });
    }
    getAllEventOrder(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = yield this.EventRepository.findAll(queryParams);
            if (!eventData.length) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            return eventData.map((event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
    createEvent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventDTO = new eventDTO_1.EventDTO(content).toDetailDTO();
            return yield this.EventRepository.create(eventDTO);
        });
    }
    updateEvent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.lookupService.findEventById(id);
            const eventDTO = new eventDTO_1.EventDTO(content).toDetailDTO();
            return yield this.EventRepository.update(id, eventDTO);
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.EventRepository.delete(id);
        });
    }
}
exports.MyEventService = MyEventService;
exports.default = MyEventService;
//# sourceMappingURL=myEventService.js.map