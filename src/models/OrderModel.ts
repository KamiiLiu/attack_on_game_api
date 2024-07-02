import mongoose, { Schema } from 'mongoose';
import { OrderDocument } from '@/interfaces/OrderInterface';
import {
  Status,
  PaymentStatus,
  PaymentMethod,
  DefaultStatus,
} from '@/enums/OrderStatus';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
const OrderSchema: Schema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
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
  status: {
    type: String,
    enum: Object.values(Status),
    default: DefaultStatus.STATUS,
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: DefaultStatus.Payment_Status,
  },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethod),
    default: DefaultStatus.Payment_Method,
  },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});
OrderSchema.index({ eventId: 1, playerId: 1 }, { unique: true });
const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
