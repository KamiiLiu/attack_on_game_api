import Order from '@/models/Order';
import { IOrder } from '@/interfaces/OrderInterface';
//import mongoose from 'mongoose';

const OrderService = {
  async createOrder(OrderData: Partial<IOrder>) {
    try {
      const existingOrder = await Order.findOne({
        playerId: OrderData.playerId,
        createdAt: OrderData.createdAt,
      });
      if (existingOrder) {
        //return handleClientError('同一時間重複下訂單', 409);
      }
      const newOrder = new Order(OrderData);
      await newOrder.save();
      //return handleSuccess(201);
    } catch (error) {
      //return handleServerError(error, '創建訂單時發生錯誤');
    }
  },
};

export default OrderService;

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
