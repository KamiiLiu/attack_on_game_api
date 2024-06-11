import mongoose, { Schema } from 'mongoose';
import { TicketDocument } from '@/interfaces/TicketInterface';
import Order from '@/models/OrderModel';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
const TicketSchema: Schema = new Schema({
  orderIdNumber: {
    type: String,
    required: true,
    validate: {
      validator: async function (value: string) {
        const order = await Order.findOne({ idNumber: value });
        return !!order;
      },
      message: (props: any) =>
        `Order with idNumber ${props.value} does not exist!`,
    },
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
    required: true,
  },
  idNumber: { type: String, required: true },
  isQrCodeUsed: {
    type: Boolean,
    default: false,
  },
  qrCodeUrl: { type: String, required: true },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});
TicketSchema.pre('save', function (next) {
  this.updatedAt = dayjs().format(TIME_FORMATTER);
  next();
});
const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);
export default Ticket;
