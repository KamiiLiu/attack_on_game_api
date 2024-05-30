import Event from '@/models/Event';
import { IEvent } from '@/interfaces/EventInterface';
import {
  handleEventPublish,
  buildAllTimeQuery,
  buildRegistrationTimeQuery,
} from '@/utils/eventUtils';
import { ActivityFormationStatus as STATUS } from '@/enums/EventStatus';
import {
  handleServerError,
  handleClientError,
  handleSuccess,
} from '@/utils/responseHandlers';
import mongoose from 'mongoose';
//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
const EventService = {
  async createEvent(eventData: Partial<IEvent>) {
    try {
      const existingEvent = await Event.findOne({
        title: eventData.title,
        eventStartTime: eventData.eventStartTime,
      });
      if (existingEvent) {
        return handleClientError('已存在相同的活動', 409);
      }
      const newEvent = new Event(eventData);
      await newEvent.save();
      return handleSuccess(201);
    } catch (error) {
      return handleServerError(error, '創建活動時發生錯誤');
    }
  },
  async findEventList({
    limit = 10,
    status = STATUS.DEFAULT,
    skip = 0,
    registrationOpen = false,
  }) {
    try {
      const query = registrationOpen
        ? buildRegistrationTimeQuery(status)
        : buildAllTimeQuery(status);
      console.log('query', query);
      const eventData = await Event.find()
        .skip(skip * limit)
        .limit(limit)
        .sort({ eventStartTime: 1 });
      if (!eventData.length) {
        return handleClientError('此次搜尋，網站沒有任何結果');
      }
      return handleSuccess(201, undefined, eventData);
    } catch (error) {
      return handleServerError(error, '尋找店家資料時發生意外');
    }
  },
  async findShopEvent(storeId: string, checkVisibility = true) {
    try {
      //TODO:把query也放進來
      /*
      {
    limit = 10,
    status = STATUS.DEFAULT,
    skip = 0,
    registrationOpen = false,
  }
      */
      const query: { storeId: mongoose.Types.ObjectId; [key: string]: any } = {
        storeId: new mongoose.Types.ObjectId(storeId),
      };
      if (checkVisibility) {
        query['isPublish'] = true;
      }
      const events = await Event.find(query).sort({ eventStartTime: 1 }); //由近排到遠
      if (!events) {
        return handleClientError('這家商店沒有活動');
      }
      return handleSuccess(200, undefined, events);
    } catch (error) {
      return handleServerError(error, '尋找店家資料時發生意外');
    }
  },
  async findEventByEventId(eventId: string, checkVisibility = false) {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return handleClientError('找不到這個活動');
      }
      if (checkVisibility) {
        if (!handleEventPublish(event as IEvent)) {
          return handleClientError('這個活動已被商家下架');
        }
      }
      return { success: true, status: 200, eventData: event, message: 'OK' };
    } catch (error) {
      return handleServerError(error, '更新活動資料時發生意外');
    }
  },
  async updateEvent(eventId: string, eventData: IEvent) {
    try {
      const query = {
        _id: eventId,
        $expr: {
          $and: [
            { $gte: [eventData.currentParticipantsCount, '$minParticipants'] },
            { $lte: [eventData.currentParticipantsCount, '$maxParticipants'] },
          ],
        },
      };
      const updatedEvent = await Event.findOneAndUpdate(query, eventData, {
        new: true,
      }); //TODO:updatedAt: new Date()
      if (!updatedEvent) {
        return handleClientError('沒有這個活動～或活動已被下架');
      }
      return handleSuccess();
    } catch (error) {
      return handleServerError(error, '更新活動資料時發生意外');
    }
  },
  async updatePublishStatus(eventId: string, status: boolean = true) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        new mongoose.Types.ObjectId(eventId),
        { isPublish: status, updatedAt: new Date() },
        { new: true },
      );
      if (!updatedEvent) {
        return handleClientError('找不到這個活動');
      }
      return handleSuccess();
    } catch (error) {
      return handleServerError(error, '更新活動資料時發生意外');
    }
  },
};

export default EventService;
