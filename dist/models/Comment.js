"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const CommentSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        ref: 'events',
        required: true,
    },
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'stores',
    },
    content: { type: String, require: true },
    createdAt: { type: String, default: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default) },
    type: { type: String, require: true },
    messageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'comments',
    },
});
exports.Comment = (0, mongoose_1.model)('comments', CommentSchema);
//# sourceMappingURL=Comment.js.map