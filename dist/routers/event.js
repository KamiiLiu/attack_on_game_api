"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = __importDefault(require("@/controllers/eventController"));
const handleValidationErrors_1 = require("@/middlewares/handleValidationErrors");
const eventValidator_1 = __importDefault(require("@/validators/eventValidator"));
const router = (0, express_1.Router)();
router.post('/', eventValidator_1.default, handleValidationErrors_1.handleValidationErrors, eventController_1.default.createEvent);
exports.default = router;
//# sourceMappingURL=event.js.map