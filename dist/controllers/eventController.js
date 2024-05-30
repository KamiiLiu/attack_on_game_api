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
const eventService_1 = __importDefault(require("@/services/eventService"));
const responseHandlers_1 = require("@/utils/responseHandlers");
const EventController = {
    getEventList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield eventService_1.default.findEventList(req.query);
                console.log('xxx');
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    getEventDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const isPublish = req.query.isPublish === 'true';
                const result = yield eventService_1.default.findEventByEventId(eventId, isPublish);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    getEventsByShop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPublish = req.query.isPublish === 'true';
                const { storeId } = req.params;
                const result = yield eventService_1.default.findShopEvent(storeId, isPublish);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    updatedEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const result = yield eventService_1.default.updateEvent(eventId, req.body);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = '665185043aae4f4d91cc4c25';
                const eventData = Object.assign(Object.assign({}, req.body), { storeId });
                const result = yield eventService_1.default.createEvent(eventData);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    publishEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.body;
                const result = yield eventService_1.default.updatePublishStatus(eventId, true);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    unpublishEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.body;
                const result = yield eventService_1.default.updatePublishStatus(eventId, false);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
};
exports.default = EventController;
//# sourceMappingURL=eventController.js.map