import mongoose, { Schema } from 'mongoose';
import { TicketDocument } from '@/interfaces/TicketInterface';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import { TicketStatus } from '@/enums/TicketStatus';
const TicketSchema: Schema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
    required: true,
  },
  idNumber: { type: String, required: true },
  qrCodeStatus: {
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.PENDING,
  },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  qrCodeUsedTime: { type: String, default: '' },
});
TicketSchema.pre('save', function (next) {
  this.updatedAt = dayjs().format(TIME_FORMATTER);
  next();
});
const Ticket = mongoose.model<TicketDocument>('Ticket', TicketSchema);
export default Ticket;
