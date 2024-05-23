import { Document, Types } from 'mongoose';

export interface ITicket extends Document {
  _id: Types.ObjectId;
  orderId: Types.ObjectId;
  eventId: Types.ObjectId;
  quantity: number;
}
