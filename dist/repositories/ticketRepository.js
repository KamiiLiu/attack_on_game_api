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
exports.TicketRepository = void 0;
const TicketModel_1 = __importDefault(require("@/models/TicketModel"));
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
const TicketResponseType_1 = require("@/types/TicketResponseType");
const TicketStatus_1 = require("@/enums/TicketStatus");
const lodash_1 = __importDefault(require("lodash"));
const ticketDTO_1 = require("@/dto/ticketDTO");
const OtherResponseType_1 = require("@/types/OtherResponseType");
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
function handleDatabaseError(error, message) {
    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${message}:${error.message || error}`);
}
class TicketRepository {
    create(orderId, playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const idNumber = generateCustomNanoId();
                //const qrCodeUrl = await this.generateQRCode(idNumber);
                const ticketDTO = new ticketDTO_1.TicketDTO({
                    orderId,
                    playerId,
                });
                yield TicketModel_1.default.create(ticketDTO);
                return true;
            }
            catch (error) {
                handleDatabaseError(error, TicketResponseType_1.TicketResponseType.FAILED_CREATED);
            }
        });
    }
    findAllBuyers(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield TicketModel_1.default.find({ orderId: orderId });
                return tickets;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    markQrCodeAsUsed(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TicketModel_1.default.findOneAndUpdate({ idNumber: content.idNumber }, {
                    qrCodeStatus: true,
                    updatedAt: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
                }, { new: true }).exec();
            }
            catch (error) {
                handleDatabaseError(error, TicketResponseType_1.TicketResponseType.FAILED_UPDATE);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield TicketModel_1.default.findOne({ idNumber: id });
                if (lodash_1.default.isEmpty(ticket)) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
                }
                return ticket;
            }
            catch (error) {
                handleDatabaseError(error, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
            }
        });
    }
    findAll(orderId, playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield TicketModel_1.default.find({ orderId, playerId });
                if (lodash_1.default.isEmpty(tickets)) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
                }
                return tickets;
            }
            catch (error) {
                handleDatabaseError(error, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
            }
        });
    }
    updateStatus(objectIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(objectIds);
                // const ts = await TicketModel.find();
                // const tss = ts.map((x) => x.idNumber);
                yield TicketModel_1.default.updateMany({ idNumber: { $in: objectIds } }, {
                    $set: {
                        qrCodeStatus: TicketStatus_1.TicketStatus.COMPLETED,
                        qrCodeUsedTime: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
                        updatedAt: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
                    },
                });
                return true;
            }
            catch (error) {
                handleDatabaseError(error, TicketResponseType_1.TicketResponseType.FAILED_FOUND);
            }
        });
    }
}
exports.TicketRepository = TicketRepository;
//# sourceMappingURL=TicketRepository.js.map