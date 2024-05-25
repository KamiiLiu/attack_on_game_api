import mongoose, { Document, Types } from 'mongoose';

export interface IEvent extends Document {
  _id: Types.ObjectId;
  storeId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  eventStartTime: Date;
  eventEndTime: Date;
  registrationStartTime: Date;
  registrationEndTime: Date;
  isFoodAllowed: boolean;
  address: string;
  maxParticipants: number;
  minParticipants: number;
  currentParticipantsCount: number;
  participationFee: number;
  isPublish: boolean;
  eventImageUrl: [string];
  createdAt: Date;
  updatedAt: Date;
}
