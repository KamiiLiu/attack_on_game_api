"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const CustomResponseType_1 = require("@/enums/CustomResponseType");
class CustomError extends Error {
    constructor(code, msg) {
        super(msg);
        this.code = code || CustomResponseType_1.CustomResponseType.OTHER;
        this.msg = msg;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map