"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
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
    createdAt: { type: Date, default: Date.now },
    type: { type: String, require: true },
    messageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'comments',
    },
});
exports.Comment = (0, mongoose_1.model)('comments', CommentSchema);
//# sourceMappingURL=Comment.js.map