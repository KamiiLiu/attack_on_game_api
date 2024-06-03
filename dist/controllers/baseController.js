"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const responseDTO_1 = require("@/dto/responseDTO");
class BaseController {
    formatResponse(status = CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, message, data) {
        const options = {
            status,
            message,
            data,
        };
        return new responseDTO_1.ResponseDTO(options);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map