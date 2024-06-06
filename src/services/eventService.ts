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
  public async createEvent(content: IEvent): Promise<boolean> {
    const _content = new EventDTO(content).toDetailDTO();
    return await this.eventRepository.createEvent(_content);
  }
  public async updateEvent(id: string, content: IEvent): Promise<boolean> {
    const _content = new EventDTO(content);
    console.log('xxxx');
    console.log(_content);
    return await this.eventRepository.updateEvent(id, _content);
  }
  public async getDetailEvent(
    id: string,
    isPublish = true,
  ): Promise<Partial<IEvent> | null> {
    const _event = await this.eventRepository.getEventById(id);
    if (!_.isEmpty(_event)) {
      const _eventDTO = new EventDTO(_event);
      return isPublish
        ? _eventDTO.isPublish
          ? _eventDTO.toDetailDTO()
          : null
        : _eventDTO.toDetailDTO();
    }
    return null;
  }
  public async getSummaryEvent(id: string): Promise<Partial<IEvent> | null> {
    const _event = await this.eventRepository.getEventById(id);
    if (!_.isEmpty(_event)) {
      const _eventDTO = new EventDTO(_event);
      return _eventDTO.isPublish && _eventDTO.isRegisterable
        ? _eventDTO.toSummaryDTO()
        : null;
    }
    return null;
  }

  public async getEventsByStore(
    storeId: string,
    optionsReq: Request,
  ): Promise<Partial<IEvent>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getEventsByStoreId(
      storeId,
      queryParams,
    );
    return _.map(eventData, (event) => new EventDTO(event).toDetailDTO());
  }
  public async getEvents(optionsReq: Request): Promise<Partial<IEvent>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getAllEvents(queryParams);
    return _.map(eventData, (event) => new EventDTO(event).toDetailDTO());
  }
}
