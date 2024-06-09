"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDTO = void 0;
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
class ResponseDTO {
    constructor(options) {
        this.status = CustomResponseType_1.CustomResponseType.SYSTEM_ERROR;
        this.message = CustomError_1.SPECIAL_ERROR_MSG;
        this.data = null;
        this.status = options.status || this.status;
        this.message = options.message || this.message;
        this.data = options.data || this.data;
    }
}
exports.ResponseDTO = ResponseDTO;
//# sourceMappingURL=responseDTO.js.map