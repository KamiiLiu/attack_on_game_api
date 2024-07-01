"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("@/controllers/paymentController");
const router = express_1.default.Router();
router.post('/', paymentController_1.getPaymetData);
router.post('/notify', paymentController_1.getNotifyData);
router.post('/return', paymentController_1.getReturnData);
exports.default = router;
//# sourceMappingURL=payment.js.map