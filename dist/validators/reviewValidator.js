"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidator = void 0;
const orderConfig_1 = require("@/config/validators/orderConfig");
class ReviewValidator {
    static validateReview() {
        return Object.values(orderConfig_1.validationConfig.body).flat();
    }
    static validateReviewQuery() {
        return Object.values(orderConfig_1.validationConfig.query).flat();
    }
    static validateObjectIds(parameters) {
        return orderConfig_1.validationConfig.param[parameters];
    }
}
exports.ReviewValidator = ReviewValidator;
//# sourceMappingURL=reviewValidator.js.map