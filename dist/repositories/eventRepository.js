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
const eventRequest_1 = require("@/enums/eventRequest");
class EventRepository {
    constructor() {
        this.defaultLimit = eventRequest_1.DefaultQuery.LIMIT;
        this.defaultSkip = eventRequest_1.DefaultQuery.SKIP;
    }
    createEvent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('ssss', content);
                const event = new EventModel_1.default(content);
                yield event.save();
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    updatedEvent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(content.updatedAt);
                const result = yield EventModel_1.default.findOneAndUpdate({ _id: id }, {
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
                }, { new: true });
                console.log(result);
                return true;
            }
            catch (error) {
                console.log(error);
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
    getAllEvents(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { truthLimit, truthSkip, truthFormationStatus, truthRegistrationStatus, } = this.parseQueryParams(req);
            const eventQuery = new EventQuery_1.EventQuery(req.query, {
                forStatus: truthFormationStatus,
                regStatus: truthRegistrationStatus,
            });
            const query = eventQuery.buildEventQuery();
            return this._getEventsData(query, truthSkip, truthLimit);
        });
    }
    getEventsByStoreId(storeId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { truthLimit, truthSkip, truthFormationStatus, truthRegistrationStatus, } = this.parseQueryParams(req);
            const eventQuery = new EventQuery_1.EventQuery(Object.assign({ storeId }, req.query), {
                forStatus: truthFormationStatus,
                regStatus: truthRegistrationStatus,
            });
            const query = eventQuery.buildEventQuery();
            return this._getEventsData(query, truthSkip, truthLimit);
        });
    }
    _getEventsData(eventQuery, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = yield EventModel_1.default.find(eventQuery)
                .skip(skip)
                .limit(limit)
                .sort({ eventStartTime: 1 })
                .exec();
            return eventData || [];
        });
    }
    parseQueryParams(req) {
        const { limit = eventRequest_1.DefaultQuery.LIMIT, skip = eventRequest_1.DefaultQuery.SKIP, formationStatus = eventRequest_1.DefaultQuery.FOR_STATUS, registrationStatus = eventRequest_1.DefaultQuery.REG_STATUS, } = req.query || {};
        const truthLimit = Math.min(Number(limit), eventRequest_1.DefaultQuery.MAX_LIMIT);
        const truthSkip = Number(skip);
        const truthFormationStatus = Number(formationStatus);
        const truthRegistrationStatus = Number(registrationStatus);
        return {
            truthLimit,
            truthSkip,
            truthFormationStatus,
            truthRegistrationStatus,
        };
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventRepository.js.map