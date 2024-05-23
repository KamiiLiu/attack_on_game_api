import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  _id: Types.ObjectId;
  playerId: Types.ObjectId;
  payment: number;
  discount: number;
  createdAt: Date;
}
