import mongoose, { Schema } from 'mongoose';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { PaymentStatus, PaymentMethod } from '@/enums/OrderStatus';
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
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String, default: '' },
  paymentStatus: { type: PaymentStatus, default: PaymentStatus.PENDING },
  paymentMethod: { type: PaymentMethod, default: PaymentMethod.CREDIT_CARD },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});
OrderSchema.index({ eventId: 1, playerId: 1 }, { unique: true });
const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
