"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orderService_1 = __importDefault(require("@/services/orderService"));
const baseController_1 = require("@/controllers/baseController");
const OrderResponseType_1 = require("@/types/OrderResponseType");
class OrderController extends baseController_1.BaseController {
    constructor() {
        super(OrderResponseType_1.OrderResponseType);
        this.orderService = new orderService_1.default();
    }
    getById(req) {
        throw new Error('Method not implemented.');
    }
    getAll(req) {
        throw new Error('Method not implemented.');
    }
    create(req) {
        return this.handleServiceResponse(() => this.orderService.createNewOrder(req.body), OrderResponseType_1.OrderResponseType.SUCCESS_CREATED);
    }
    update(req) {
        throw new Error('Method not implemented.');
    }
    delete(req) {
        throw new Error('Method not implemented.');
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map