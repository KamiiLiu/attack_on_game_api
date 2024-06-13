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
const lodash_1 = __importDefault(require("lodash"));
const orderDTO_1 = require("@/dto/orderDTO");
const eventDTO_1 = require("@/dto/eventDTO");
const ticketDTO_1 = require("@/dto/ticketDTO");
const orderRepository_1 = require("@/repositories/orderRepository");
const eventRepository_1 = require("@/repositories/eventRepository");
const ticketRepository_1 = require("@/repositories/ticketRepository");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const OrderResponseType_1 = require("@/types/OrderResponseType");
const EventResponseType_1 = require("@/types/EventResponseType");
const TicketResponseType_1 = require("@/types/TicketResponseType");
const CustomError_1 = require("@/errors/CustomError");
const Player_1 = __importDefault(require("@/models/Player"));
class OrderService {
    constructor() {
        this.orderRepository = new orderRepository_1.OrderRepository();
        this.eventRepository = new eventRepository_1.EventRepository();
        this.ticketRepository = new ticketRepository_1.TicketRepository();
    }
    getById(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield Player_1.default.findOne({ user: queryParams.user });
            if (lodash_1.default.isEmpty(player)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.ERROR_PLAYER_FOUND);
            }
            console.log('player', player);
            console.log('queryParams.params.orderId', queryParams.params.orderId);
            const order = yield this.orderRepository.findById(queryParams.params.orderId);
            console.log('order', order);
            if (lodash_1.default.isEmpty(order)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.FAILED_FOUND);
            }
            const ticketList = yield this.ticketRepository.findAll(order.id, player.user);
            const event = yield this.eventRepository.findByDBId(order.eventId);
            if (lodash_1.default.isEmpty(event)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            if (lodash_1.default.isEmpty(ticketList)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
            }
            const targetEventDTO = new eventDTO_1.EventDTO(event);
            const targetOrderDTO = new orderDTO_1.OrderDTO(order);
            const targetTicketsDTO = ticketList.map((x) => new ticketDTO_1.TicketDTO(x).toDetailDTO());
            return {
                event: targetEventDTO.toSummaryDTO(),
                order: targetOrderDTO.toDetailDTO(),
                tickets: targetTicketsDTO,
            };
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
            const player = yield Player_1.default.findOne({ user: content.user._id }).exec();
            console.log('player', player);
            console.log('content', content.user._id);
            if (lodash_1.default.isEmpty(player)) {
                console.log('OrderResponseType.ERROR_PLAYER_FOUND', OrderResponseType_1.OrderResponseType.CREATED_ERROR_PLAYER_FOUND);
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.CREATED_ERROR_PLAYER_FOUND);
            }
            const targetEvent = yield this.eventRepository.findById(content.body.eventId);
            if (lodash_1.default.isEmpty(targetEvent)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            console.log('targetEvent', targetEvent);
            const targetEventDTO = new eventDTO_1.EventDTO(targetEvent);
            const targetOrderDTO = new orderDTO_1.OrderDTO(Object.assign(Object.assign({}, content.body), { eventId: targetEvent._id, playerId: player.user }));
            if (!targetEventDTO.isRegisterable) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD);
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
                ticketPromises.push(this.ticketRepository.create(targetOrderDTO));
            }
            yield Promise.all(ticketPromises);
            return true;
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map