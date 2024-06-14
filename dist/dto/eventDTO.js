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
const mongoose_1 = require("mongoose");
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const generateCustomNanoId_1 = require("@/utils/generateCustomNanoId");
class EventDTO extends baseDTO_1.BaseDTO {
    constructor(dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const dtoWithId = {
            _id: dto._id || new mongoose_1.Types.ObjectId(),
            idNumber: dto.idNumber || (0, generateCustomNanoId_1.generateCustomNanoId)(),
            createdAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
            updatedAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
        };
        super(dtoWithId);
        this._storeId = (_a = dto.storeId) !== null && _a !== void 0 ? _a : new mongoose_1.Types.ObjectId();
        this._title = (_b = dto.title) !== null && _b !== void 0 ? _b : '';
        this._address = (_c = dto.address) !== null && _c !== void 0 ? _c : '';
        this._isFoodAllowed = (_d = dto.isFoodAllowed) !== null && _d !== void 0 ? _d : false;
        this._description = (_e = dto.description) !== null && _e !== void 0 ? _e : '';
        this._eventStartTime = dto.eventStartTime
            ? (0, dayjs_1.default)(dto.eventStartTime).format(TIME_FORMATTER_1.default)
            : '';
        this._eventEndTime = dto.eventEndTime
            ? (0, dayjs_1.default)(dto.eventEndTime).format(TIME_FORMATTER_1.default)
            : '';
        this._registrationStartTime = dto.registrationStartTime
            ? (0, dayjs_1.default)(dto.registrationStartTime).format(TIME_FORMATTER_1.default)
            : '';
        this._registrationEndTime = dto.registrationEndTime
            ? (0, dayjs_1.default)(dto.registrationEndTime).format(TIME_FORMATTER_1.default)
            : '';
        this._maxParticipants = (_f = dto.maxParticipants) !== null && _f !== void 0 ? _f : 0;
        this._minParticipants = (_g = dto.minParticipants) !== null && _g !== void 0 ? _g : 0;
        this._currentParticipantsCount = (_h = dto.currentParticipantsCount) !== null && _h !== void 0 ? _h : 0;
        this._participationFee = (_j = dto.participationFee) !== null && _j !== void 0 ? _j : 0;
        this._eventImageUrl = (_k = dto.eventImageUrl) !== null && _k !== void 0 ? _k : [''];
        this._isPublish = (_l = dto.isPublish) !== null && _l !== void 0 ? _l : true;
    }
    get isRegisterable() {
        const now = (0, dayjs_1.default)();
        return (now.isSameOrBefore(this._registrationEndTime) &&
            now.isSameOrAfter(this._registrationStartTime));
    }
    get availableSeat() {
        return this._maxParticipants - this._currentParticipantsCount;
    }
    get storeId() {
        return this._storeId;
    }
    get isPublish() {
        return this._isPublish;
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
            idNumber: this.idNumber,
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