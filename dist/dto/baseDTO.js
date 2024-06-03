"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDTO = void 0;
const mongoose_1 = require("mongoose");
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FOMMATER_1 = __importDefault(require("@/const/TIME_FOMMATER"));
class BaseDTO {
    constructor(dto) {
        this._id = dto._id || new mongoose_1.Types.ObjectId();
        this.createdAt =
            (0, dayjs_1.default)(dto.createdAt).format(TIME_FOMMATER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FOMMATER_1.default);
        this.updatedAt =
            (0, dayjs_1.default)(dto.createdAt).format(TIME_FOMMATER_1.default) ||
                (0, dayjs_1.default)().format(TIME_FOMMATER_1.default);
    }
}
exports.BaseDTO = BaseDTO;
//# sourceMappingURL=baseDTO.js.map