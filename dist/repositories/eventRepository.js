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
class EventRepository {
    createEvent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new EventModel_1.default(content);
                yield event.save();
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    updateEvent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield EventModel_1.default.findOneAndUpdate({ _id: id }, {
                    title: content.title,
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
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield EventModel_1.default.findById(id);
            return event;
        });
    }
    getAllEvents(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, skip, formationStatus, registrationStatus, sortBy, sortOrder, } = queryParams;
            const eventQuery = new EventQuery_1.EventQuery({}, {
                forStatus: formationStatus,
                regStatus: registrationStatus,
            });
            const query = eventQuery.buildEventQuery();
            return this._getEventsData(query, skip, limit, sortBy, sortOrder);
        });
    }
    getEventsByStoreId(storeId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, skip, formationStatus, registrationStatus, sortBy, sortOrder, } = queryParams;
            const eventQuery = new EventQuery_1.EventQuery({ storeId }, {
                forStatus: formationStatus,
                regStatus: registrationStatus,
            });
            const query = eventQuery.buildEventQuery();
            return this._getEventsData(query, skip, limit, sortBy, sortOrder);
        });
    }
    _getEventsData(eventQuery, skip, limit, sortBy, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const sortOptions = { [sortBy]: sortOrder };
            const eventData = yield EventModel_1.default.find(eventQuery)
                .skip(skip)
                .limit(limit)
                .sort(sortOptions)
                .exec();
            return eventData || [];
        });
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventRepository.js.map