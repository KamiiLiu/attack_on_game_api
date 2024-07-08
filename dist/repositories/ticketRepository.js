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
const lodash_1 = __importDefault(require("lodash"));
const ticketDTO_1 = require("@/dto/ticketDTO");
const OtherResponseType_1 = require("@/types/OtherResponseType");
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
                    updatedAt: new Date().toISOString(),
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
    updateAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 更新 qrCodeUsedTime 和 qrCodeUrl 字段
                yield TicketModel_1.default.updateMany({}, {
                    $unset: { isQrCodeUsed: '' },
                });
                // // 更新 qrCodeStatus 字段
                // await TicketModel.updateMany({ qrCodeStatus: { $exists: false } }, [
                //   { $set: { qrCodeStatus: 'pending' } },
                //   { $unset: { isQrCodeUsed: '' } },
                // ]);
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