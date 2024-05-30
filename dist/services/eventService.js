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
const Event_1 = __importDefault(require("@/models/Event"));
const eventUtils_1 = require("@/utils/eventUtils");
const EventStatus_1 = require("@/enums/EventStatus");
const responseHandlers_1 = require("@/utils/responseHandlers");
const mongoose_1 = __importDefault(require("mongoose"));
//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
const EventService = {
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingEvent = yield Event_1.default.findOne({
                    title: eventData.title,
                    eventStartTime: eventData.eventStartTime,
                });
                if (existingEvent) {
                    return (0, responseHandlers_1.handleClientError)('已存在相同的活動', 409);
                }
                const newEvent = new Event_1.default(eventData);
                yield newEvent.save();
                return (0, responseHandlers_1.handleSuccess)(201);
            }
            catch (error) {
                return (0, responseHandlers_1.handleServerError)(error, '創建活動時發生錯誤');
            }
        });
    },
    findEventList(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit = 10, status = EventStatus_1.ActivityFormationStatus.DEFAULT, skip = 0, registrationOpen = false, }) {
            try {
                const query = registrationOpen
                    ? (0, eventUtils_1.buildRegistrationTimeQuery)(status)
                    : (0, eventUtils_1.buildAllTimeQuery)(status);
                console.log('query', query);
                const eventData = yield Event_1.default.find()
                    .skip(skip * limit)
                    .limit(limit)
                    .sort({ eventStartTime: 1 });
                if (!eventData.length) {
                    return (0, responseHandlers_1.handleClientError)('此次搜尋，網站沒有任何結果');
                }
                return (0, responseHandlers_1.handleSuccess)(201, undefined, eventData);
            }
            catch (error) {
                return (0, responseHandlers_1.handleServerError)(error, '尋找店家資料時發生意外');
            }
        });
    },
    findShopEvent(storeId_1) {
        return __awaiter(this, arguments, void 0, function* (storeId, checkVisibility = true) {
            try {
                //TODO:把query也放進來
                /*
                {
              limit = 10,
              status = STATUS.DEFAULT,
              skip = 0,
              registrationOpen = false,
            }
                */
                const query = {
                    storeId: new mongoose_1.default.Types.ObjectId(storeId),
                };
                if (checkVisibility) {
                    query['isPublish'] = true;
                }
                const events = yield Event_1.default.find(query).sort({ eventStartTime: 1 }); //由近排到遠
                if (!events) {
                    return (0, responseHandlers_1.handleClientError)('這家商店沒有活動');
                }
                return (0, responseHandlers_1.handleSuccess)(200, undefined, events);
            }
            catch (error) {
                return (0, responseHandlers_1.handleServerError)(error, '尋找店家資料時發生意外');
            }
        });
    },
    findEventByEventId(eventId_1) {
        return __awaiter(this, arguments, void 0, function* (eventId, checkVisibility = false) {
            try {
                const event = yield Event_1.default.findById(eventId);
                if (!event) {
                    return (0, responseHandlers_1.handleClientError)('找不到這個活動');
                }
                if (checkVisibility) {
                    if (!(0, eventUtils_1.handleEventPublish)(event)) {
                        return (0, responseHandlers_1.handleClientError)('這個活動已被商家下架');
                    }
                }
                return { success: true, status: 200, eventData: event, message: 'OK' };
            }
            catch (error) {
                return (0, responseHandlers_1.handleServerError)(error, '更新活動資料時發生意外');
            }
        });
    },
    updateEvent(eventId, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    _id: eventId,
                    $expr: {
                        $and: [
                            { $gte: [eventData.currentParticipantsCount, '$minParticipants'] },
                            { $lte: [eventData.currentParticipantsCount, '$maxParticipants'] },
                        ],
                    },
                };
                const updatedEvent = yield Event_1.default.findOneAndUpdate(query, eventData, {
                    new: true,
                }); //TODO:updatedAt: new Date()
                if (!updatedEvent) {
                    return (0, responseHandlers_1.handleClientError)('沒有這個活動～或活動已被下架');
                }
                return (0, responseHandlers_1.handleSuccess)();
            }
            catch (error) {
                return (0, responseHandlers_1.handleServerError)(error, '更新活動資料時發生意外');
            }
        });
    },
    updatePublishStatus(eventId_1) {
        return __awaiter(this, arguments, void 0, function* (eventId, status = true) {
            try {
                const updatedEvent = yield Event_1.default.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(eventId), { isPublish: status, updatedAt: new Date() }, { new: true });
                if (!updatedEvent) {
                    return (0, responseHandlers_1.handleClientError)('找不到這個活動');
                }
                return (0, responseHandlers_1.handleSuccess)();
            }
            catch (error) {
                return (0, responseHandlers_1.handleServerError)(error, '更新活動資料時發生意外');
            }
        });
    },
};
exports.default = EventService;
//# sourceMappingURL=eventService.js.map