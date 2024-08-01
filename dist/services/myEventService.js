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
exports.MyEventService = void 0;
const EventRepository_1 = require("@/repositories/EventRepository");
const LookupService_1 = require("./LookupService");
const CustomError_1 = require("@/errors/CustomError");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const EventResponseType_1 = require("@/types/EventResponseType");
const eventDTO_1 = require("@/dto/eventDTO");
const OrderRepository_1 = require("@/repositories/OrderRepository");
const TicketRepository_1 = require("@/repositories/TicketRepository");
const userOrderDTO_1 = require("@/dto/userOrderDTO");
const TicketCodeDTO_1 = require("@/dto/TicketCodeDTO");
const TicketStatus_1 = require("@/enums/TicketStatus");
const lodash_1 = __importDefault(require("lodash"));
class MyEventService {
    constructor() {
        this.orderRepository = new OrderRepository_1.OrderRepository();
        this.eventRepository = new EventRepository_1.EventRepository();
        this.ticketRepository = new TicketRepository_1.TicketRepository();
        this.lookupService = new LookupService_1.LookupService(this.orderRepository, this.eventRepository, new TicketRepository_1.TicketRepository());
    }
    getOrderByEventId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStore(req);
            const eventData = yield this.eventRepository.getEventsByAprilStoreId(store._id, { idNumber: req.params.eventId });
            if (!eventData.length) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            const eventDTO = new eventDTO_1.EventDTO(eventData[0]);
            const buyers = yield this.orderRepository.findAllBuyers(eventDTO._id);
            const buyersWithTickets = yield Promise.all(buyers.map((buyer) => __awaiter(this, void 0, void 0, function* () {
                const player = yield this.lookupService.findPlayerById(buyer.playerId);
                return new userOrderDTO_1.UserOrderDTO(player, buyer);
            })));
            return {
                event: eventDTO.toDetailDTO(),
                user: buyersWithTickets,
            };
        });
    }
    getTicketByEventId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStore(req);
            const eventData = yield this.eventRepository.getEventsByAprilStoreId(store._id, { idNumber: req.params.eventId });
            if (!eventData.length) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            const eventDTO = new eventDTO_1.EventDTO(eventData[0]);
            const buyers = yield this.orderRepository.findAllBuyers(eventDTO._id);
            const buyerIds = buyers.map((buyer) => buyer.playerId);
            const playerIds = buyers.map((buyer) => buyer.playerId);
            const [players, allTickets] = yield Promise.all([
                this.lookupService.findPlayersByIds(playerIds),
                this.ticketRepository.findTicketsByBuyerIds(buyerIds),
            ]);
            const playersMap = new Map(players.map((player) => [player._id.toString(), player]));
            const ticketsMap = new Map(buyers.map((buyer) => [
                buyer._id.toString(),
                allTickets.filter((ticket) => ticket.playerId.toString() === buyer.playerId.toString()),
            ]));
            const buyersWithTickets = buyers
                .filter((buyer) => playersMap.has(buyer.playerId.toString()))
                .flatMap((buyer) => {
                    const player = playersMap.get(buyer.playerId.toString());
                    const buyerTickets = ticketsMap.get(buyer._id.toString()) || [];
                    return buyerTickets.map((ticket) => new TicketCodeDTO_1.TicketCodeDTO(ticket, buyer, player));
                });
            return buyersWithTickets;
        });
    }
    getAllEventOrder(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStore(queryParams);
            const eventData = yield this.eventRepository.getEventsByAprilStoreId(store._id);
            if (!eventData.length) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
            }
            return eventData.map((event) => new eventDTO_1.EventDTO(event).toDetailDTO());
        });
    }
    validateQrCode(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.lookupService.findStore(queryParams);
            const ticketsByStore = yield this.getTicketByEventId(queryParams);
            const event = yield this.eventRepository.findById(queryParams.params.eventId);
            if (event.storeId.toString() !== store._id.toString()) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.UNAUTHORIZED, EventResponseType_1.EventResponseType.FAILED_AUTHORIZATION);
            }
            const tickets = queryParams.body.tickets;
            const qrCodeList = [];
            tickets.forEach((x) => {
                const targetTicket = ticketsByStore.find((t) => t.idNumber === x);
                if (!lodash_1.default.isEmpty(targetTicket) &&
                    targetTicket.qrCodeStatus === TicketStatus_1.TicketStatus.PENDING) {
                    qrCodeList.push(targetTicket.idNumber);
                }
            });
            if (!lodash_1.default.isEmpty(qrCodeList)) {
                yield this.ticketRepository.updateStatus(qrCodeList);
            }
            return true;
        });
    }
}
exports.MyEventService = MyEventService;
exports.default = MyEventService;
//# sourceMappingURL=myEventService.js.map