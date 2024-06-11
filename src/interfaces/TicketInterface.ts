import { Document, Types } from 'mongoose';
export interface TicketDocument extends Document {
  _id: Types.ObjectId;
  playerId: Types.ObjectId;
  idNumber: string;
  orderIdNumber: string;
  isQrCodeUsed: boolean;
  qrCodeUrl: string;
  createdAt: string;
  updatedAt: string;
}
