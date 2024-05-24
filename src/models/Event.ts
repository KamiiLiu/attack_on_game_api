import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@/interfaces/EventInterface';

const EventSchema: Schema = new Schema({
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventStartTime: { type: Date, required: true },
  eventEndTime: { type: Date, required: true },
  registrationStartTime: { type: Date, required: true },
  registrationEndTime: { type: Date, required: true },
  isFoodAllowed: { type: Boolean, required: true },
  maxParticipants: { type: Number, required: true },
  minParticipants: { type: Number, required: true },
  currentParticipantsCount: { type: Number, required: true },
  participationFee: { type: Number, required: true },
  eventImageUrl: { type: String, required: true },
  isPublish{ type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EventSchema.index({ title: 1, eventStartTime: 1 }, { unique: true });

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
//todo: required: false
