"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// CustomError.ts
class CustomError extends Error {
    constructor(code, msg) {
        super(msg); // 將 msg 傳遞給 Error 的父類構造函數
        this.code = code;
        this.msg = msg;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map