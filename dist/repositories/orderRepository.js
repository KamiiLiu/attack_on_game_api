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
exports.OrderRepository = void 0;
const OrderModel_1 = __importDefault(require("@/models/OrderModel"));
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
const OrderResponseType_1 = require("@/types/OrderResponseType");
const OtherResponseType_1 = require("@/types/OtherResponseType");
const lodash_1 = __importDefault(require("lodash"));
class OrderRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield OrderModel_1.default.findOne({ idNumber: id });
                if (lodash_1.default.isEmpty(event)) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.FAILED_FOUND);
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
                const tickets = yield OrderModel_1.default.find(Object.assign({}, queryParams));
                if (lodash_1.default.isEmpty(tickets)) {
                    throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.NOT_FOUND, OrderResponseType_1.OrderResponseType.FAILED_FOUND);
                }
                return tickets;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    create(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new OrderModel_1.default(content);
                yield event.save();
                return true;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:::::::::::::${error.message || error}`);
            }
        });
    }
    update(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderModel_1.default.findOneAndUpdate({ _id: content.id }, {
                    payment: content.payment,
                    discount: content.discount,
                    name: content.name,
                    phone: content.phone,
                    registrationCount: content.registrationCount,
                    notes: content.notes,
                    paymentStatus: content.paymentStatus,
                    paymentMethod: content.paymentMethod,
                    updatedAt: content.updatedAt,
                }, { new: true }).exec();
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    delete(id) {
        console.log(id);
        throw new Error('Method not implemented.');
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=orderRepository.js.map