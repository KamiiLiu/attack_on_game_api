import Event from '@/models/Event';
import { EventStatus } from '@/enums/EventStatus';
import { IEvent } from '@/interfaces/EventInterface';
import { Request, Response, NextFunction } from 'express';
import dayjs from '@/utils/dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
const now = new Date();
const EventService = {
  async findEvent(eventId: string, res: Response, checkVisibility = false) {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: '沒有這個活動捏！！' });
    }
    if (checkVisibility) {
      const status = this.findEventStatus(event);
      if (status === EventStatus.OFF_SHELF) {
        return res.status(404).json({ message: '這個活動已被商家下架' });
      }
    }
    return event;
  },
  async updateEvent(eventId: string, data: Partial<IEvent>, res: Response) {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: '沒有這個活動捏！！' });
      }
      const status = this.findEventStatus(event);
      if (status === EventStatus.OFF_SHELF) {
        return res.status(404).json({ message: '這個活動已被商家下架' });
      }
      const eventDetail = await Event.findByIdAndUpdate(eventId, data, {
        new: true,
      });
      if (!eventDetail) {
        return res.status(404).json({ message: '沒有這個活動捏！！' });
      }
      return eventDetail;
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: `Error updating event: ${error.message}` });
      } else {
        return res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  },

  findEventStatus(event: IEvent) {
    if (!event.isAvailable) {
      return EventStatus.OFF_SHELF;
    } else if (event.currentParticipantsCount < event.minParticipants) {
      return EventStatus.NOT_FORMED;
    } else if (event.currentParticipantsCount < event.maxParticipants) {
      return EventStatus.FORMED;
    } else if (event.currentParticipantsCount === event.maxParticipants) {
      return EventStatus.FULL;
    } else {
      console.warn('怪怪的');
      return EventStatus.OTHER;
    }
  },
};

export default EventService;
/*
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

*/
