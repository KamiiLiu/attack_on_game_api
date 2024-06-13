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
exports.OrderService = void 0;
const orderDTO_1 = require("@/dto/orderDTO");
const eventDTO_1 = require("@/dto/eventDTO");
const orderRepository_1 = require("@/repositories/orderRepository");
const eventRepository_1 = require("@/repositories/eventRepository");
const ticketRepository_1 = require("@/repositories/ticketRepository");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
const OrderResponseType_1 = require("@/types/OrderResponseType");
const Player_1 = __importDefault(require("@/models/Player"));
class OrderService {
    constructor() {
        this.orderRepository = new orderRepository_1.OrderRepository();
        this.eventRepository = new eventRepository_1.EventRepository();
        this.ticketRepository = new ticketRepository_1.TicketRepository();
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findById(id);
            return eventDTO.toDetailDTO();
        });
    }
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield Player_1.default.findOne({ user: queryParams.user });
            if (!player) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.ERROR_REGISTRATION_PERIOD);
            }
            throw new Error('Method not implemented.');
        });
    }
    create(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const player = yield Player_1.default.findOne({ user: content.user._id }).exec();
                if (!player) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.ERROR_PLAYER_FOUND);
                }
                const targetEvent = yield this.eventRepository.findById(content.body.eventId);
                const targetEventDTO = new eventDTO_1.EventDTO(targetEvent);
                const targetOrderDTO = new orderDTO_1.OrderDTO(Object.assign(Object.assign({}, content.body), { eventId: targetEvent._id, playerId: content.user._id }));
                if (!targetEventDTO.isRegisterable) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD);
                }
                if (targetEventDTO.availableSeat < targetOrderDTO.registrationCount) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_EXCEEDS_CAPACITY);
                }
                if (targetEventDTO.participationFee * targetOrderDTO.registrationCount !==
                    targetOrderDTO.getTotalAmount) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_MONEY);
                }
                const addedSeat = targetEventDTO.currentParticipantsCount +
                    targetOrderDTO.registrationCount;
                yield this.orderRepository.create(targetOrderDTO.toDetailDTO());
                yield this.eventRepository.updateParticipantsCount(targetEventDTO, addedSeat);
                const ticketPromises = [];
                for (let index = 0; index < targetOrderDTO.registrationCount; index++) {
                    ticketPromises.push(this.ticketRepository.create(targetOrderDTO.getIdNumber));
                }
                yield Promise.all(ticketPromises);
                return true;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, (error === null || error === void 0 ? void 0 : error.message) || error);
            }
        });
    }
    update(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented. This method is intentionally left unimplemented.');
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented. This method is intentionally left unimplemented.');
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map