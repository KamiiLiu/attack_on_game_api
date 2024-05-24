import Event from '@/models/Event';
import { IEvent } from '@/interfaces/EventInterface';
import { handleEventPublish } from '@/utils/eventUtils';
const EventService = {
  async createEvent(data: Partial<IEvent>) {
    try {
      // TODO:是否存在這個商店
      const existingEvent = await Event.findOne({
        title: data.title,
        eventStartTime: data.eventStartTime,
      });
      if (existingEvent) {
        return { success: false, status: 409, message: '已存在相同的活動' };
      }

      const event = new Event(data);
      await Event.create(event);
      return { success: true, status: 201, message: '建立成功' };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: `創建活動時發生錯誤: ${error}`,
      };
    }
  },
  async findEvent(eventId: string, checkVisibility = false) {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return { success: false, status: 404, message: '沒有這個活動捏！！' };
      }
      if (checkVisibility) {
        const isPublish = handleEventPublish(event as IEvent);
        if (!isPublish) {
          return {
            success: false,
            status: 404,
            message: '這個活動已被商家下架',
          };
        }
      }
      return { success: true, status: 200, data: event };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: `更新活動時發生錯誤${error}`,
      };
    }
  },
  async updateEvent(eventId: string, data: IEvent) {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return { success: false, status: 404, message: '沒有這個活動捏！！' };
      }
      if (!event.isPublish) {
        return { success: false, status: 404, message: '這個活動已被商家下架' };
      }

      const updatedEvent = await Event.findByIdAndUpdate(eventId, data, {
        new: true,
      });
      if (!updatedEvent) {
        return {
          success: false,
          status: 404,
          message: '更新後沒有找到這個活動捏！！',
        };
      }
      return { success: true, status: 200, event: updatedEvent };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: `更新活動時發生錯誤${error}`,
      };
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
  isPublish: boolean;
  eventImageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

*/
