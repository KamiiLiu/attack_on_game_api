"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const updateLocale_1 = __importDefault(require("dayjs/plugin/updateLocale"));
require("dayjs/locale/zh-tw");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(updateLocale_1.default);
dayjs_1.default.locale('zh-tw');
dayjs_1.default.updateLocale('zh-tw', {
    weekStart: 0,
});
dayjs_1.default.tz.setDefault('Asia/Taipei');
exports.default = dayjs_1.default;
//# sourceMappingURL=dayjs.js.map