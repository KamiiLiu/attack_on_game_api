import mongoose, { Schema } from 'mongoose';
import { ITicket } from '../interfaces/TicketInterface';

// 定义票据架构
const TicketSchema: Schema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// 创建并导出票据模型
const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket;
