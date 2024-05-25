import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@/interfaces/EventInterface';
const EventSchema: Schema = new Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  eventStartTime: { type: Date, required: true },
  eventEndTime: { type: Date, required: true },
  registrationStartTime: { type: Date, required: true },
  registrationEndTime: { type: Date, required: true },
  isFoodAllowed: { type: Boolean, required: true },
  maxParticipants: { type: Number, required: true },
  minParticipants: { type: Number, required: true },
  currentParticipantsCount: { type: Number, default: 0 }, //TODO:假設這個值不給外面傳入
  participationFee: { type: Number, required: true },
  eventImageUrl: { type: [String], required: true },
  isPublish: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EventSchema.index({ title: 1, eventStartTime: 1 }, { unique: true });

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
//TODO: 檢查有些是required: false
