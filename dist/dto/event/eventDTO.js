"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDTO = void 0;
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
const baseDTO_1 = require("@/dto/baseDTO");
const TIME_FOMMATER_1 = __importDefault(require("@/const/TIME_FOMMATER"));
class EventDTO extends baseDTO_1.BaseDTO {
    constructor(dto) {
        super(dto);
        this._storeId = dto.storeId;
        this._title = dto.title;
        this._address = dto.address;
        this._isFoodAllowed = dto.isFoodAllowed;
        this._description = dto.description;
        this._eventStartTime = (0, dayjs_1.default)(dto.eventStartTime).format(TIME_FOMMATER_1.default);
        this._eventEndTime = (0, dayjs_1.default)(dto.eventEndTime).format(TIME_FOMMATER_1.default);
        this._registrationStartTime = (0, dayjs_1.default)(dto.registrationStartTime).format(TIME_FOMMATER_1.default);
        this._registrationEndTime = (0, dayjs_1.default)(dto.registrationEndTime).format(TIME_FOMMATER_1.default);
        this._maxParticipants = dto.maxParticipants;
        this._minParticipants = dto.minParticipants;
        this._currentParticipantsCount = dto.currentParticipantsCount;
        this._participationFee = dto.participationFee;
        this._eventImageUrl = dto.eventImageUrl;
        this._isPublish = dto.isPublish || true;
    }
    get isRegisterable() {
        const now = (0, dayjs_1.default)();
        return (now.isSameOrBefore(this._eventEndTime) &&
            now.isSameOrAfter(this._eventStartTime));
    }
    get storeId() {
        return this._storeId;
    }
    get isPublish() {
        return this._isPublish;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get address() {
        return this._address;
    }
    get isFoodAllowed() {
        return this._isFoodAllowed;
    }
    get description() {
        return this._description;
    }
    get eventStartTime() {
        return this._eventStartTime;
    }
    get eventEndTime() {
        return this._eventEndTime;
    }
    get registrationStartTime() {
        return this._registrationStartTime;
    }
    get registrationEndTime() {
        return this._registrationEndTime;
    }
    get maxParticipants() {
        return this._maxParticipants;
    }
    get minParticipants() {
        return this._minParticipants;
    }
    get currentParticipantsCount() {
        return this._currentParticipantsCount;
    }
    get participationFee() {
        return this._participationFee;
    }
    get eventImageUrl() {
        return this._eventImageUrl;
    }
    toSummaryDTO() {
        return {
            title: this.title,
            address: this.address,
            eventStartTime: this.eventStartTime,
            eventEndTime: this.eventEndTime,
            maxParticipants: this.maxParticipants,
            minParticipants: this.minParticipants,
            currentParticipantsCount: this.currentParticipantsCount,
            participationFee: this.participationFee,
        };
    }
    toDetailDTO() {
        return {
            _id: this.id,
            storeId: this._storeId,
            isFoodAllowed: this._isFoodAllowed,
            description: this._description,
            title: this.title,
            address: this.address,
            eventStartTime: this.eventStartTime,
            eventEndTime: this.eventEndTime,
            registrationStartTime: this.registrationStartTime,
            registrationEndTime: this.registrationEndTime,
            maxParticipants: this.maxParticipants,
            minParticipants: this.minParticipants,
            currentParticipantsCount: this.currentParticipantsCount,
            participationFee: this.participationFee,
            eventImageUrl: this.eventImageUrl,
        };
    }
}
exports.EventDTO = EventDTO;
//# sourceMappingURL=eventDTO.js.map