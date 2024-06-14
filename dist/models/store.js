"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    avatar: String,
    introduce: String,
    address: String,
    phone: String,
});
exports.Store = (0, mongoose_1.model)('stores', storeSchema);
//# sourceMappingURL=store.js.map