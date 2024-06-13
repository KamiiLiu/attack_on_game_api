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
const EventResponseType_1 = require("@/types/EventResponseType");
const OtherResponseType_1 = require("@/types/OtherResponseType");
const lodash_1 = __importDefault(require("lodash"));
class EventRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield EventModel_1.default.findOne({ idNumber: id });
                if (lodash_1.default.isEmpty(event)) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, EventResponseType_1.EventResponseType.FAILED_FOUND);
                }
                return event;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    findAll(queryParams) {
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
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    create(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new EventModel_1.default(content);
                yield event.save();
                return true;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    updateParticipantsCount(content, addedSeat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(addedSeat);
                console.log(content);
                return yield EventModel_1.default.findOneAndUpdate({ _id: content._id }, {
                    currentParticipantsCount: addedSeat,
                    updatedAt: content.updatedAt,
                })
                    .lean()
                    .exec();
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    update(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EventModel_1.default.findOneAndUpdate({ idNumber: content.idNumber }, {
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
                    .exec();
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EventModel_1.default.findByIdAndDelete(id).exec();
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
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
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
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
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventRepository.js.map