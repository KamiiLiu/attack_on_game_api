"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNanoidIds = exports.validateObjectIds = void 0;
const mongoose_1 = require("mongoose");
const validateObjectIds = (value) => {
    return mongoose_1.Types.ObjectId.isValid(value);
};
exports.validateObjectIds = validateObjectIds;
const validateNanoidIds = (value) => {
    const nanoidRegex = /^[a-z0-9]{8}$/;
    if (!nanoidRegex.test(value)) {
        throw new Error('Invalid ID format');
    }
    return true;
};
exports.validateNanoidIds = validateNanoidIds;
//# sourceMappingURL=commonConfig.js.map