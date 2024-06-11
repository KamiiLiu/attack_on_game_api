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
const mongoose_1 = __importStar(require("mongoose"));
const OrderModel_1 = __importDefault(require("@/models/OrderModel"));
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const TicketSchema = new mongoose_1.Schema({
    orderIdNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const order = yield OrderModel_1.default.findOne({ idNumber: value });
                    return !!order;
                });
            },
            message: (props) => `Order with idNumber ${props.value} does not exist!`,
        },
    },
    playerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'players',
        required: true,
    },
    idNumber: { type: String, required: true },
    isQrCodeUsed: {
        type: Boolean,
        default: false,
    },
    qrCodeUrl: { type: String, required: true },
    createdAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
    updatedAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
});
TicketSchema.pre('save', function (next) {
    this.updatedAt = (0, dayjs_1.default)().format(TIME_FORMATTER_1.default);
    next();
});
const Ticket = mongoose_1.default.model('Ticket', TicketSchema);
exports.default = Ticket;
//# sourceMappingURL=TicketModel.js.map