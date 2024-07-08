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
const OrderRepository_1 = require("@/repositories/OrderRepository");
const EventRepository_1 = require("@/repositories/EventRepository");
const TicketRepository_1 = require("@/repositories/TicketRepository");
const LookupService_1 = require("./LookupService");
const eventDTO_1 = require("@/dto/eventDTO");
const orderDTO_1 = require("@/dto/orderDTO");
const orderListDTO_1 = require("@/dto/orderListDTO");
const ticketDTO_1 = require("@/dto/ticketDTO");
const CustomError_1 = require("@/errors/CustomError");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const OrderResponseType_1 = require("@/types/OrderResponseType");
const EventResponseType_1 = require("@/types/EventResponseType");
const TicketResponseType_1 = require("@/types/TicketResponseType");
const Player_1 = __importDefault(require("@/models/Player"));
const OrderStatus_1 = require("@/enums/OrderStatus");
class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository_1.OrderRepository();
        this.eventRepository = new EventRepository_1.EventRepository();
        this.ticketRepository = new TicketRepository_1.TicketRepository();
        this.lookupService = new LookupService_1.LookupService(this.orderRepository, new EventRepository_1.EventRepository(), new TicketRepository_1.TicketRepository());
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.body;
            const event = yield this.lookupService.findEventById(eventId);
            const player = yield this.lookupService.findPlayer(req);
            const orderDTO = this.createOrderDTO(req.body, event, player);
            this.validateOrder(event, orderDTO);
            const order = yield this.createOrder(orderDTO);
            yield this.updateEventParticipants(event, orderDTO);
            yield this.createTickets(order._id, player._id, orderDTO.registrationCount);
            return order;
        });
    }
    getById(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.lookupService.findPlayer(queryParams);
            const order = yield this.lookupService.findOrder(queryParams.params.orderId);
            if (order.playerId.toString() !== player._id.toString()) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.FAILED_AUTHORIZATION);
            }
            const eventId = order.eventId;
            if (!eventId) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.FAILED_VALIDATION_EVENT_ID);
            }
            const event = yield this.lookupService.findEventByDbId(eventId);
            const targetOrderDTO = new orderDTO_1.OrderDTO(order);
            const targetEventDTO = new eventDTO_1.EventDTO(event);
            const store = yield this.lookupService.findStoreByStoreId(targetEventDTO.storeId);
            if (targetOrderDTO.status === OrderStatus_1.Status.CANCEL) {
                return {
                    event: targetEventDTO.toSummaryDTO(),
                    order: targetOrderDTO.toDetailDTO(),
                    tickets: [],
                    store,
                };
            }
            const ticketList = yield this.lookupService.findTickets(order.id, player._id);
            const targetTicketsDTO = ticketList.map((ticket) => new ticketDTO_1.TicketDTO(ticket).toDetailDTO());
            return {
                event: targetEventDTO.toSummaryDTO(),
                order: targetOrderDTO.toDetailDTO(),
                tickets: targetTicketsDTO,
                store,
            };
        });
    }
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.findPlayer(queryParams);
            const { limit, status, skip } = queryParams.query;
            const orderList = yield this.lookupService.findOrderList(player._id, {
                limit,
                status,
                skip,
            });
            const eventIds = orderList.map((x) => x.eventId);
            const eventList = yield this.eventRepository.getEventsData({
                _id: { $in: eventIds },
            });
            const result = orderList
                .map((x) => {
                const findEvent = eventList.find((y) => {
                    return y._id.toString() == x.eventId.toString();
                });
                if (findEvent)
                    return new orderListDTO_1.OrderListDTO(x, findEvent);
                return undefined;
            })
                .filter((x) => x !== undefined);
            return result;
        });
    }
    findPlayer(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield Player_1.default.findOne({ user: queryParams.user });
            if (lodash_1.default.isEmpty(player)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.ERROR_PLAYER_FOUND);
            }
            return player;
        });
    }
    findOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findById(orderId);
            if (lodash_1.default.isEmpty(order)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.FAILED_FOUND);
            }
            return order;
        });
    }
    findOrderList(playerId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryObject = {
                playerId,
            };
            if (query.status) {
                queryObject.status = query.status;
            }
            const order = yield this.orderRepository.findAll(queryObject, {
                limit: query.limit,
                skip: query.skip,
            });
            if (lodash_1.default.isEmpty(order)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.FAILED_FOUND);
            }
            return order.map((order) => new orderDTO_1.OrderDTO(order));
        });
    }
    findEventByDbId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findByDBId(eventId);
            if (lodash_1.default.isEmpty(event)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            return event;
        });
    }
    findEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.eventRepository.findById(eventId);
            if (lodash_1.default.isEmpty(event)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            return event;
        });
    }
    findTickets(orderId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketList = yield this.ticketRepository.findAll(orderId, userId);
            if (lodash_1.default.isEmpty(ticketList)) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
            }
            return ticketList;
        });
    }
    createOrderDTO(body, event, player) {
        return new orderDTO_1.OrderDTO(Object.assign(Object.assign({}, body), { eventId: event._id, playerId: player._id }));
    }
    validateOrder(event, orderDTO) {
        const targetEventDTO = new eventDTO_1.EventDTO(event);
        if (!targetEventDTO.isRegisterable) {
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD);
        }
        if (targetEventDTO.participationFee * orderDTO.registrationCount !==
            orderDTO.getTotalAmount) {
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_MONEY);
        }
        if (targetEventDTO.availableSeat < orderDTO.registrationCount) {
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, OrderResponseType_1.OrderResponseType.CREATED_ERROR_EXCEEDS_CAPACITY);
        }
    }
    createOrder(orderDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.create(orderDTO.toDetailDTO());
        });
    }
    updateEventParticipants(event, orderDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetEventDTO = new eventDTO_1.EventDTO(event);
            const addedSeat = targetEventDTO.currentParticipantsCount + orderDTO.registrationCount;
            yield this.eventRepository.updateParticipantsCount(targetEventDTO, addedSeat);
        });
    }
    createTickets(orderId, userId, registrationCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketPromises = [];
            for (let index = 0; index < registrationCount; index++) {
                ticketPromises.push(this.ticketRepository.create(orderId, userId));
            }
            yield Promise.all(ticketPromises);
        });
    }
}
exports.OrderService = OrderService;
exports.default = OrderService;
//# sourceMappingURL=orderService.js.map