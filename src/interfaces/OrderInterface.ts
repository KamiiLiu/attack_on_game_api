import { Document, PopulatedDoc, Types } from 'mongoose';
import { PaymentStatus, PaymentMethod, Status } from '@/enums/OrderStatus';
import { EventDocument } from '@/interfaces/EventInterface';
export interface OrderDocument extends Document {
  _id: Types.ObjectId;
  idNumber: string;
  eventId: PopulatedDoc<EventDocument & Document>;
  playerId: Types.ObjectId;
  payment: number;
  discount: number;
  name: string;
  phone: string;
  registrationCount: number;
  email: string;
  notes: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  isCommented: boolean;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
