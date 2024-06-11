import { Document, Types } from 'mongoose';

export interface EventDocument extends Document {
  _id: Types.ObjectId;
  idNumber: string;
  storeId: Types.ObjectId;
  title: string;
  description: string;
  eventStartTime: string;
  eventEndTime: string;
  registrationStartTime: string;
  registrationEndTime: string;
  isFoodAllowed: boolean;
  address: string;
  maxParticipants: number;
  minParticipants: number;
  currentParticipantsCount: number;
  participationFee: number;
  isPublish: boolean;
  eventImageUrl: string[];
  createdAt: string;
  updatedAt: string;
}
