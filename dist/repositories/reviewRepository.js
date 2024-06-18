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
exports.ReviewRepository = void 0;
const Review_1 = require("@/models/Review");
const lodash_1 = __importDefault(require("lodash"));
const CustomError_1 = require("@/errors/CustomError");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const OtherResponseType_1 = require("@/types/OtherResponseType");
class ReviewRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    findAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield Review_1.ReviewModel.find(queryParams);
                if (lodash_1.default.isEmpty(reviews)) {
                    throw new Error("No reviews found");
                }
                return reviews;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    create(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Review_1.ReviewModel.create(content);
                return true;
            }
            catch (error) {
                throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, `${OtherResponseType_1.MONGODB_ERROR_MSG}:${error.message || error}`);
            }
        });
    }
    update(content) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.ReviewRepository = ReviewRepository;
//# sourceMappingURL=reviewRepository.js.map