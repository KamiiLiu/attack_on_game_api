"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidator = void 0;
const validationConfig_1 = require("@/config/validationConfig");
class EventValidator {
    static validateEvent() {
        return Object.values(validationConfig_1.validationConfig.body).flat();
    }
    static validateEventQuery() {
        return Object.values(validationConfig_1.validationConfig.query).flat();
    }
    static validateObjectIds(parameters) {
        return validationConfig_1.validationConfig.param[parameters];
    }
}
exports.EventValidator = EventValidator;
//# sourceMappingURL=eventValidator.js.map