"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log('aaa', errors);
    console.log('aaa', errors.isEmpty());
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array().map((x) => x.msg) });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=handleValidationErrors.js.map