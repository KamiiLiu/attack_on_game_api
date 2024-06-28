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
exports.EventController = void 0;
const eventService_1 = require("@/services/eventService");
const baseController_1 = require("@/controllers/baseController");
const EventResponseType_1 = require("@/types/EventResponseType");
const mongoose_1 = require("mongoose");
class EventController extends baseController_1.BaseController {
    constructor() {
        super(EventResponseType_1.EventResponseType);
        this.getById = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getById(req.params.id), EventResponseType_1.EventResponseType.SUCCESS_REQUEST);
        });
        this.getAll = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield this.handleServiceResponse(() => this.eventService.getAll(req), EventResponseType_1.EventResponseType.SUCCESS_REQUEST);
        });
        this.create = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.create(req), EventResponseType_1.EventResponseType.SUCCESS_CREATED);
        });
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.update(req), EventResponseType_1.EventResponseType.SUCCESS_UPDATE);
        });
        this.delete = (req) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            throw new Error('Method not implemented.');
        });
        this.getEventSummary = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getSummaryEvents(req.params.id), EventResponseType_1.EventResponseType.SUCCESS_REQUEST);
        });
        this.getOwnEvent = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getById(req.body.storeId), EventResponseType_1.EventResponseType.SUCCESS_REQUEST);
        });
        this.getEventsByStore = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getEventsForStore(new mongoose_1.Types.ObjectId(req.params.storeId), req), EventResponseType_1.EventResponseType.SUCCESS_REQUEST);
        });
        this.eventService = new eventService_1.EventService();
    }
}
exports.EventController = EventController;
//# sourceMappingURL=eventController.js.map