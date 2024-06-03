"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("@/models/Order"));
//import mongoose from 'mongoose';
const OrderService = {
    createOrder(OrderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingOrder = yield Order_1.default.findOne({
                    playerId: OrderData.playerId,
                    createdAt: OrderData.createdAt,
                });
                if (existingOrder) {
                    //return handleClientError('同一時間重複下訂單', 409);
                }
                const newOrder = new Order_1.default(OrderData);
                yield newOrder.save();
                //return handleSuccess(201);
            }
            catch (error) {
                //return handleServerError(error, '創建訂單時發生錯誤');
            }
        });
    },
};
exports.default = OrderService;
/*
const OrderSchema: Schema = new Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stores',
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
    required: true,
  },
  quantity: { type: Number, required: true },
  payment: { type: Number, required: true },
  discount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

*/
//# sourceMappingURL=orderService.js.map