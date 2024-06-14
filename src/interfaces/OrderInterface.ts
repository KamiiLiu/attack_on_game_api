import { Document, Types } from 'mongoose';
import { PaymentStatus, PaymentMethod, Status } from '@/enums/OrderStatus';
export interface OrderDocument extends Document {
  _id: Types.ObjectId;
  idNumber: string;
  eventId: Types.ObjectId;
  playerId: Types.ObjectId;
  payment: number;
  discount: number;
  name: string;
  phone: string;
  registrationCount: number;
  notes: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  isCommented: boolean;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
