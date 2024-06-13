import mongoose, { Schema } from 'mongoose';
import { OrderDocument } from '@/interfaces/OrderInterface';
import {
  PaymentStatus,
  PaymentMethod,
  DefaultQuery,
} from '@/enums/OrderStatus';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
const OrderSchema: Schema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events',
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
    required: true,
  },
  idNumber: { type: String, required: true, unique: true },
  registrationCount: { type: Number, required: true },
  payment: { type: Number, required: true },
  discount: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String, default: '' },
  isCommented: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: DefaultQuery.Payment_Status,
  },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethod),
    default: DefaultQuery.Payment_Method,
  },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});
OrderSchema.index({ eventId: 1, playerId: 1 }, { unique: true });
const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
