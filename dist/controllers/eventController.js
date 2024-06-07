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
exports.EventController = exports.EventMessages = void 0;
const eventService_1 = require("@/services/eventService");
const baseController_1 = require("@/controllers/baseController");
exports.EventMessages = {
    SUCCESS_CREATED: '建立活動成功，你真棒！',
    FAILED_CREATED: '建立活動失敗，幫你哭。',
    BAD_REQUEST: '無法找到相關活動。可能原因包括：活動已下架或報名尚未開放。',
    SUCCESS_REQUEST: '成功獲取桌遊活動信息！',
    SERVER_ERROR: '伺服器錯誤，請問問卡咪吧。',
    SUCCESS_UPDATE: '成功更新桌遊活動！',
    FAILED_UPDATE: '更新桌遊活動失敗，請再試一次。',
};
class EventController extends baseController_1.BaseController {
    constructor() {
        super(exports.EventMessages.SERVER_ERROR);
        this.createEvent = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.createEvent(req.body), exports.EventMessages.SUCCESS_CREATED, exports.EventMessages.FAILED_CREATED);
        });
        this.updateEvent = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.updateEvent(req.params.id, req.body), exports.EventMessages.SUCCESS_UPDATE, exports.EventMessages.FAILED_UPDATE);
        });
        this.getEventSummary = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getSummaryEvent(req.params.id), exports.EventMessages.SUCCESS_REQUEST, exports.EventMessages.BAD_REQUEST);
        });
        this.getOwnEvent = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getDetailEvent(req.body.storeId, Boolean(req.query.isPublish)), exports.EventMessages.SUCCESS_REQUEST, exports.EventMessages.BAD_REQUEST);
        });
        this.getEventDetail = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getDetailEvent(req.params.id, Boolean(req.query.isPublish)), exports.EventMessages.SUCCESS_REQUEST, exports.EventMessages.BAD_REQUEST);
        });
        this.getEvents = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield this.handleServiceResponse(() => this.eventService.getEvents(req), exports.EventMessages.SUCCESS_REQUEST, exports.EventMessages.BAD_REQUEST);
        });
        this.getEventsByStore = (req) => __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.eventService.getEventsByStore(req.params.storeId, req), exports.EventMessages.SUCCESS_REQUEST, exports.EventMessages.BAD_REQUEST);
        });
        this.eventService = new eventService_1.EventService();
    }
}
exports.EventController = EventController;
//# sourceMappingURL=eventController.js.map