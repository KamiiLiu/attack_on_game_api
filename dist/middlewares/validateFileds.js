"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileds = void 0;
const validateFileds = (allowedFileds) => {
    return (req, res, next) => {
        const errors = [];
        const bodyKeys = Object.keys(req.body);
        // check each key of body
        bodyKeys.forEach((key) => {
            if (!allowedFileds.includes(key)) {
                errors.push({
                    msg: `Unexpected field ${key}`,
                    param: key,
                });
            }
        });
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }
        next();
    };
};
exports.validateFileds = validateFileds;
//# sourceMappingURL=validateFileds.js.map