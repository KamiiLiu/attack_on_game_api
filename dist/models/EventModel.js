"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const DEFAULT_ADDRESS_1 = __importDefault(require("@/const/DEFAULT_ADDRESS"));
const EventSchema = new mongoose_1.Schema({
    storeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'store',
        required: true,
    },
    idNumber: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        city: {
            type: String,
            default: DEFAULT_ADDRESS_1.default.city,
        },
        district: {
            type: String,
            default: DEFAULT_ADDRESS_1.default.district,
        },
        lng: {
            type: Number,
            default: DEFAULT_ADDRESS_1.default.lng,
        },
        lat: {
            type: Number,
            default: DEFAULT_ADDRESS_1.default.lat,
        },
    },
    eventStartTime: { type: String, required: true },
    eventEndTime: { type: String, required: true },
    registrationStartTime: { type: String, required: true },
    registrationEndTime: { type: String, required: true },
    isFoodAllowed: { type: Boolean, required: true },
    maxParticipants: { type: Number, required: true },
    minParticipants: { type: Number, required: true },
    participationFee: { type: Number, required: true },
    eventImageUrl: { type: [String], default: [] },
    currentParticipantsCount: { type: Number, default: 0 },
    isPublish: { type: Boolean, default: true },
    createdAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
    updatedAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
});
EventSchema.index({ title: 1, updatedAt: 1 }, { unique: true });
const EventModel = mongoose_1.default.model('Event', EventSchema);
exports.default = EventModel;
//# sourceMappingURL=EventModel.js.map