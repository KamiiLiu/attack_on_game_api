import { Timestamp } from 'mongodb';
import { Document, Types } from 'mongoose';

export interface IEvent extends Document {
  _id: Types.ObjectId;
  storeId: Types.ObjectId;
  title: string;
  description: string;
  eventStartTime: Timestamp;
  eventEndTime: Timestamp;
  registrationStartTime: Timestamp;
  registrationEndTime: Timestamp;
  isFoodAllowed: boolean;
  maxParticipants: number;
  minParticipants: number;
  currentParticipantsCount: number;
  participationFee: string;
  isAvailable: boolean;
  eventImageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
