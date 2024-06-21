"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentObjValidationRule = void 0;
const express_validator_1 = require("express-validator");
exports.commentObjValidationRule = [
    (0, express_validator_1.body)('content')
        .notEmpty()
        .withMessage('content is required.')
        .isString()
        .withMessage('content must be String.'),
];
//# sourceMappingURL=commentObjValidator.js.map