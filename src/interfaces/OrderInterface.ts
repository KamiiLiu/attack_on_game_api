import mongoose, { Document, Types } from 'mongoose';
import { PaymentStatus, PaymentMethod } from '@/enums/OrderStatus';
export interface OrderDocument extends Document {
  _id: Types.ObjectId;
  idNumber: string;
  eventId: mongoose.Types.ObjectId;
  playerId: mongoose.Types.ObjectId;
  payment: number;
  discount: number;
  name: string;
  phone: string;
  registrationCount: string;
  notes: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}
