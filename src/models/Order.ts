import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../interfaces/OrderInterface';

const OrderSchema: Schema = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

// 创建并导出用户模型
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
