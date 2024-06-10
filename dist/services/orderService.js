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
exports.OrderService = void 0;
const orderDTO_1 = require("@/dto/orderDTO");
const eventDTO_1 = require("@/dto/eventDTO");
const orderRepository_1 = require("@/repositories/orderRepository");
const eventRepository_1 = require("@/repositories/eventRepository");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
const OrderResponseType_1 = require("@/types/OrderResponseType");
const mongoose_1 = require("mongoose");
class OrderService {
    constructor() {
        this.orderRepository = new orderRepository_1.OrderRepository();
        this.eventRepository = new eventRepository_1.EventRepository();
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findById(id);
            return eventDTO.toDetailDTO();
        });
    }
    getAll(queryParams) {
        throw new Error('Method not implemented.');
    }
    create(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetEvent = yield this.eventRepository.findById(new mongoose_1.Types.ObjectId(content.eventId));
            const targetEventDTO = new eventDTO_1.EventDTO(targetEvent);
            const targetOrderDTO = new orderDTO_1.OrderDTO(content);
            if (!targetEventDTO.isRegisterable) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.CREATED, OrderResponseType_1.OrderResponseType.BAD_REQUEST);
            }
            if (targetEventDTO.availableSeat < targetOrderDTO.registrationCount) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.CREATED, OrderResponseType_1.OrderResponseType.BAD_REQUEST);
            }
            yield this.orderRepository.create(targetOrderDTO.toDetailDTO());
            yield this.eventRepository.updateParticipantsCount();
        });
    }
    update(id, content) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map