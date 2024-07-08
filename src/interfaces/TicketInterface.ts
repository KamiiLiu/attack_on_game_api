import { Document, Types } from 'mongoose';
import { TicketStatus } from '@/enums/TicketStatus';
export interface TicketDocument extends Document {
  _id: Types.ObjectId;
  playerId: Types.ObjectId;
  idNumber: string;
  orderId: Types.ObjectId;
  qrCodeStatus: TicketStatus;
  qrCodeUsedTime: string;
  createdAt: string;
  updatedAt: string;
}
