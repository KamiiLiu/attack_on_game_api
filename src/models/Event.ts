import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@/interfaces/EventInterface';

const EventSchema: Schema = new Schema({
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: false },
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
  isAvailable: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Order = mongoose.model<IEvent>('Order', EventSchema);

export default Order;
//todo: required: false
