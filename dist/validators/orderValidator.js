"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidator = void 0;
const orderConfig_1 = require("@/config/validators/orderConfig");
class OrderValidator {
    static validateOrder() {
        return Object.values(orderConfig_1.validationConfig.body).flat();
    }
    static validateOrderQuery() {
        return Object.values(orderConfig_1.validationConfig.query).flat();
    }
    static validateObjectIds(parameters) {
        return orderConfig_1.validationConfig.param[parameters];
    }
}
exports.OrderValidator = OrderValidator;
//# sourceMappingURL=orderValidator.js.map