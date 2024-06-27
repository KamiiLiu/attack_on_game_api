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
const DEFAULT_ADDRESS_1 = __importDefault(require("@/const/DEFAULT_ADDRESS"));
class EventDTO extends baseDTO_1.BaseDTO {
    constructor(dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const dtoWithId = {
            _id: dto._id || new mongoose_1.Types.ObjectId(),
            idNumber: dto.idNumber || (0, generateCustomNanoId_1.generateCustomNanoId)(),
            createdAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
            updatedAt: (0, dayjs_1.default)(dto.createdAt).format(TIME_FORMATTER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
        };
        super(dtoWithId);
        this.storeId = (_a = dto.storeId) !== null && _a !== void 0 ? _a : new mongoose_1.Types.ObjectId();
        this.title = (_b = dto.title) !== null && _b !== void 0 ? _b : '';
        this.address = (_c = dto.address) !== null && _c !== void 0 ? _c : '';
        this.isFoodAllowed = (_d = dto.isFoodAllowed) !== null && _d !== void 0 ? _d : false;
        this.description = (_e = dto.description) !== null && _e !== void 0 ? _e : '';
        this.eventStartTime = dto.eventStartTime
            ? (0, dayjs_1.default)(dto.eventStartTime).format(TIME_FORMATTER_1.default)
            : '';
        this.eventEndTime = dto.eventEndTime
            ? (0, dayjs_1.default)(dto.eventEndTime).format(TIME_FORMATTER_1.default)
            : '';
        this.registrationStartTime = dto.registrationStartTime
            ? (0, dayjs_1.default)(dto.registrationStartTime).format(TIME_FORMATTER_1.default)
            : '';
        this.registrationEndTime = dto.registrationEndTime
            ? (0, dayjs_1.default)(dto.registrationEndTime).format(TIME_FORMATTER_1.default)
            : '';
        this.maxParticipants = (_f = dto.maxParticipants) !== null && _f !== void 0 ? _f : 0;
        this.minParticipants = (_g = dto.minParticipants) !== null && _g !== void 0 ? _g : 0;
        this.currentParticipantsCount = (_h = dto.currentParticipantsCount) !== null && _h !== void 0 ? _h : 0;
        this.participationFee = (_j = dto.participationFee) !== null && _j !== void 0 ? _j : 0;
        this.eventImageUrl = (_k = dto.eventImageUrl) !== null && _k !== void 0 ? _k : [''];
        this.isPublish = (_l = dto.isPublish) !== null && _l !== void 0 ? _l : true;
        this.location = (_m = dto.location) !== null && _m !== void 0 ? _m : {
            city: DEFAULT_ADDRESS_1.default.city,
            district: DEFAULT_ADDRESS_1.default.district,
            lng: DEFAULT_ADDRESS_1.default.lng,
            lat: DEFAULT_ADDRESS_1.default.lat,
        };
    }
    get isRegisterable() {
        const now = (0, dayjs_1.default)();
        return (now.isSameOrBefore(this.registrationEndTime) &&
            now.isSameOrAfter(this.registrationStartTime));
    }
    toSummaryDTO() {
        return {
            title: this.title,
            address: this.address,
            location: this.location,
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
            storeId: this.storeId,
            isFoodAllowed: this.isFoodAllowed,
            description: this.description,
            title: this.title,
            address: this.address,
            location: this.location,
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