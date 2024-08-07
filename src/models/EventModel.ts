import mongoose, { Schema } from 'mongoose';
import { EventDocument } from '@/interfaces/EventInterface';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import DEFAULT_ADDRESS from '@/const/DEFAULT_ADDRESS';
const EventSchema: Schema = new Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
    required: true,
  },
  idNumber: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    city: {
      type: String,
      default: DEFAULT_ADDRESS.city,
    },
    district: {
      type: String,
      default: DEFAULT_ADDRESS.district,
    },
    lng: {
      type: Number,
      default: DEFAULT_ADDRESS.lng,
    },
    lat: {
      type: Number,
      default: DEFAULT_ADDRESS.lat,
    },
  },
  eventStartTime: { type: String, required: true },
  eventEndTime: { type: String, required: true },
  registrationStartTime: { type: String, required: true },
  registrationEndTime: { type: String, required: true },
  isFoodAllowed: { type: Boolean, required: true },
  maxParticipants: { type: Number, required: true },
  minParticipants: { type: Number, required: true },
  participationFee: { type: Number, required: true },
  eventImageUrl: { type: [String], default: [] },
  currentParticipantsCount: { type: Number, default: 0 },
  isPublish: { type: Boolean, default: true },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});

EventSchema.index({ title: 1, updatedAt: 1 }, { unique: true });

const EventModel = mongoose.model<EventDocument>('Event', EventSchema);

export default EventModel;
