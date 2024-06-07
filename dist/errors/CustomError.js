"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPECIAL_ERROR_MSG = exports.MONGODB_ERROR_MSG = exports.CustomError = void 0;
const CustomResponseType_1 = require("@/enums/CustomResponseType");
class CustomError extends Error {
    constructor(code, msg) {
        super(msg);
        this.code = code || CustomResponseType_1.CustomResponseType.OTHER;
        this.msg = msg;
    }
}
exports.CustomError = CustomError;
exports.MONGODB_ERROR_MSG = '資料庫的相關錯誤';
exports.SPECIAL_ERROR_MSG = '神秘的錯誤，可能是世界奇蹟';
//# sourceMappingURL=CustomError.js.map