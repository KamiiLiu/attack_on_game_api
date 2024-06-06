//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
import _ from 'lodash';
import { Request } from 'express';
import { IEvent } from '@/interfaces/EventInterface';
import { EventDTO } from '@/dto/event/eventDTO';
import { EventRepository } from '@/repositories/eventRepository';
import { QueryParamsParser } from '@/services/eventQueryParams';

export class EventService {
  private eventRepository: EventRepository;
  private queryParams: QueryParamsParser;

  constructor() {
    this.eventRepository = new EventRepository();
    this.queryParams = new QueryParamsParser();
  }

  public async createEvent(
    content: IEvent,
  ): Promise<{ success: boolean; error?: any }> {
    const _content = new EventDTO(content).toDetailDTO();
    return await this.eventRepository.createEvent(_content);
  }

  public async updateEvent(
    id: string,
    content: IEvent,
  ): Promise<{ success: boolean; error?: any; data?: Partial<IEvent> | null }> {
    const _content = new EventDTO(content);
    const _event = await this.eventRepository.updateEvent(id, _content);
    if (!_.isEmpty(_event.data)) {
      const _eventDTO = new EventDTO(_event.data);
      return { success: _event.success, data: _eventDTO.toDetailDTO() };
    }
    return { success: _event.success, error: _event.error };
  }

  public async getDetailEvent(
    id: string,
    isPublish = true,
  ): Promise<{ success: boolean; error?: any; data?: Partial<IEvent> | null }> {
    const _event = await this.eventRepository.getEventById(id);
    if (!_.isEmpty(_event.data)) {
      const _eventDTO = new EventDTO(_event.data);
      if (isPublish && !_eventDTO.isPublish) {
        return { success: _event.success };
      }
      return { success: _event.success, data: _eventDTO.toDetailDTO() };
    }
    return { success: _event.success, error: _event.error };
  }

  public async getSummaryEvent(
    id: string,
  ): Promise<{ success: boolean; error?: any; data?: Partial<IEvent> | null }> {
    const _event = await this.eventRepository.getEventById(id);
    if (!_.isEmpty(_event.data)) {
      const _eventDTO = new EventDTO(_event.data);
      if (_eventDTO.isPublish && _eventDTO.isRegisterable) {
        return { success: _event.success, data: _eventDTO.toSummaryDTO() };
      }
      return { success: _event.success };
    }
    return { success: _event.success, error: _event.error };
  }

  public async getEventsByStore(
    storeId: string,
    optionsReq: Request,
  ): Promise<{
    success: boolean;
    error?: any;
    data?: Partial<IEvent>[] | null;
  }> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getEventsByStoreId(
      storeId,
      queryParams,
    );
    if (eventData.success) {
      const eventDTOs = _.map(eventData.data, (event) =>
        new EventDTO(event).toDetailDTO(),
      );
      return { success: eventData.success, data: eventDTOs };
    }
    return { success: eventData.success, error: eventData.error };
  }

  public async getEvents(optionsReq: Request): Promise<{
    success: boolean;
    error?: any;
    data?: Partial<IEvent>[] | null;
  }> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getAllEvents(queryParams);
    if (eventData.success) {
      const eventDTOs = _.map(eventData.data, (event) =>
        new EventDTO(event).toDetailDTO(),
      );
      return { success: eventData.success, data: eventDTOs };
    }
    return { success: eventData.success, error: eventData.error };
  }
}
