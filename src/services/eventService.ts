//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
import { Request } from 'express';
import { IEvent } from '@/interfaces/EventInterface';
import { EventDTO } from '@/dto/event/eventDTO';
import { EventRepository } from '@/repositories/eventRepository';
export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  public async createEvent(content: IEvent): Promise<boolean> {
    const _content = new EventDTO(content).toDetailDTO();
    console.log('xxx', _content);
    return await this.eventRepository.createEvent(_content);
  }
  public async updatedEvent(id: string, content: IEvent): Promise<boolean> {
    const _content = new EventDTO(content);
    return await this.eventRepository.updatedEvent(id, _content);
  }
  public async getDetailEvent(
    id: string,
    isPublish = true,
  ): Promise<Partial<IEvent> | null> {
    const _event = await this.eventRepository.getEventById(id);
    if (_event) {
      const _eventDTO = new EventDTO(_event);
      if (isPublish) {
        return _eventDTO.isPublish ? _eventDTO.toDetailDTO() : null;
      } else {
        return _eventDTO.toDetailDTO();
      }
    }
    return null;
  }
  public async getSummaryEvent(id: string): Promise<Partial<IEvent> | null> {
    const _event = await this.eventRepository.getEventById(id);
    if (_event) {
      const _eventDTO = new EventDTO(_event);
      return _eventDTO.isPublish && _eventDTO.isRegisterable
        ? _eventDTO.toSummaryDTO()
        : null;
    }
    return null;
  }
  public async getEvents(optionsReq: Request): Promise<Partial<IEvent>[]> {
    const eventData = await this.eventRepository.getAllEvents(optionsReq);
    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }
  public async getEventsByStore(
    storeId: string,
    optionsReq: Request,
  ): Promise<Partial<IEvent>[]> {
    const eventData = await this.eventRepository.getEventsByStoreId(
      storeId,
      optionsReq,
    );
    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }
}
/*
  async updateEvent(eventId: string, eventData: IEvent) {
    try {
      const query = {
        _id: eventId,
        $expr: {
          $and: [
            { $gte: [eventData.currentParticipantsCount, '$minParticipants'] };
            { $lte: [eventData.currentParticipantsCount, '$maxParticipants'] };
          ],
        };
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
  };
  async updatePublishStatus(eventId: string, status: boolean = true) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        new mongoose.Types.ObjectId(eventId),
        { isPublish: status, updatedAt: new Date() };
        { new: true };
      );
      if (!updatedEvent) {
        return handleClientError('找不到這個活動');
      }
      return handleSuccess();
    } catch (error) {
      return handleServerError(error, '更新活動資料時發生意外');
    }
  };
};
 */
