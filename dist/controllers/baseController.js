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
exports.BaseController = void 0;
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const responseDTO_1 = require("@/dto/responseDTO");
const lodash_1 = __importDefault(require("lodash"));
class BaseController {
    constructor(server_error_msg) {
        this.server_error_msg = server_error_msg;
    }
    formatResponse(status = CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, message, data) {
        const options = {
            status,
            message,
            data,
        };
        return new responseDTO_1.ResponseDTO(options);
    }
    handleServiceResponse(serviceMethod, successMessage, failureMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield serviceMethod();
                if (!lodash_1.default.isEmpty(result.data)) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.SUCCESS, successMessage, result);
                }
                else {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, lodash_1.default.get(result, 'error.message', failureMessage));
                }
            }
            catch (error) {
                const errorMessage = lodash_1.default.get(error, 'message', this.server_error_msg);
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, errorMessage);
            }
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map