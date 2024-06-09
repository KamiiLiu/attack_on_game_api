import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../interfaces/OrderInterface';

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
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
