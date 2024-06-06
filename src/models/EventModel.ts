import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@/interfaces/EventInterface';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
const EventSchema: Schema = new Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  eventStartTime: { type: String, required: true },
  eventEndTime: { type: String, required: true },
  registrationStartTime: { type: String, required: true },
  registrationEndTime: { type: String, required: true },
  isFoodAllowed: { type: Boolean, required: true },
  maxParticipants: { type: Number, required: true },
  minParticipants: { type: Number, required: true },
  participationFee: { type: Number, required: true },
  eventImageUrl: { type: [String], required: true },
  currentParticipantsCount: { type: Number, default: 0 },
  isPublish: { type: Boolean, default: true },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});

EventSchema.index({ title: 1, updatedAt: 1 }, { unique: true });

const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;
