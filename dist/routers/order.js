"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("@/controllers/orderController"));
// import { jwtAuthenticator } from '../middlewares/auth';
const router = (0, express_1.Router)();
// router.get('/cart/:eventId', jwtAuthenticator, orderController.getCartItems);
router.post('/', orderController_1.default.createOrder);
router.get('/', orderController_1.default.getOrderList);
// router.post(
//   '/order/:userId/order',
//   jwtAuthenticator,
//   orderController.createUserOrder,
// );
// router.post('/order/:orderID', jwtAuthenticator, orderController.updateOrder);
exports.default = router;
//# sourceMappingURL=order.js.map