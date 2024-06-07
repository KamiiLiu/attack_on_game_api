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
exports.EventRepository = void 0;
const EventModel_1 = __importDefault(require("@/models/EventModel"));
const EventQuery_1 = require("@/queries/EventQuery");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
class EventRepository {
    createEvent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new EventModel_1.default(content);
                yield event.save();
                return true;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${CustomError_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    updateEvent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EventModel_1.default.findOneAndUpdate({ _id: id }, {
                    title: content.title,
                    description: content.description,
                    isFoodAllowed: content.isFoodAllowed,
                    address: content.address,
                    eventStartTime: content.eventStartTime,
                    eventEndTime: content.eventEndTime,
                    registrationStartTime: content.registrationStartTime,
                    registrationEndTime: content.registrationEndTime,
                    maxParticipants: content.maxParticipants,
                    minParticipants: content.minParticipants,
                    currentParticipantsCount: content.currentParticipantsCount,
                    participationFee: content.participationFee,
                    eventImageUrl: content.eventImageUrl,
                    updatedAt: content.updatedAt,
                }, { new: true })
                    .lean()
                    .exec(); // 使用 lean() 來提高查詢效能，並將結果轉為純 JavaScript 對象
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${CustomError_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EventModel_1.default.findById(id);
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${CustomError_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    getAllEvents(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, skip, formationStatus, registrationStatus, sortBy, sortOrder, } = queryParams;
                const eventQuery = new EventQuery_1.EventQuery({}, {
                    forStatus: formationStatus,
                    regStatus: registrationStatus,
                });
                const query = eventQuery.buildEventQuery();
                const events = yield this._getEventsData(query, skip, limit, sortBy, sortOrder);
                return events;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${CustomError_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    getEventsByStoreId(storeId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, skip, formationStatus, registrationStatus, sortBy, sortOrder, } = queryParams;
                const eventQuery = new EventQuery_1.EventQuery({ storeId }, {
                    forStatus: formationStatus,
                    regStatus: registrationStatus,
                });
                const query = eventQuery.buildEventQuery();
                const events = yield this._getEventsData(query, skip, limit, sortBy, sortOrder);
                return events;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${CustomError_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    _getEventsData(eventQuery, skip, limit, sortBy, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sortOptions = { [sortBy]: sortOrder };
                const eventData = yield EventModel_1.default.find(eventQuery)
                    .skip(skip)
                    .limit(limit)
                    .sort(sortOptions)
                    .exec();
                return eventData || [];
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${CustomError_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventRepository.js.map