//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
import _ from 'lodash';
import { Request } from 'express';
import { IEvent } from '@/interfaces/EventInterface';
import { EventDTO } from '@/dto/event/eventDTO';
import { EventRepository } from '@/repositories/eventRepository';
import { QueryParamsParser } from '@/services/eventQueryParams';
import { IHTTPSMessage } from '@/interfaces/HTTPSMessageInterface';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
export class EventService {
  private eventRepository: EventRepository;
  private queryParams: QueryParamsParser;
  private msg: IHTTPSMessage;
  constructor(v: IHTTPSMessage) {
    this.eventRepository = new EventRepository();
    this.queryParams = new QueryParamsParser();
    this.msg = v;
  }

  public async createNewEvent(content: IEvent): Promise<boolean> {
    const _content = new EventDTO(content).toDetailDTO();
    return await this.eventRepository.createEvent(_content);
  }

  public async updateEvent(
    id: string,
    content: IEvent,
  ): Promise<Partial<IEvent>> {
    const _content = new EventDTO(content);
    const _event = await this.eventRepository.updateEvent(id, _content);
    if (!_.isEmpty(_event)) {
      const _eventDTO = new EventDTO(_event);
      return _eventDTO.toDetailDTO();
    }
    throw new CustomError(CustomResponseType.NOT_FOUND, this.msg.FAILED_FOUND);
  }

  public async getEventDetails(
    id: string,
    isPublish = true,
  ): Promise<Partial<IEvent> | null> {
    const event = await this.eventRepository.getEventById(id);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        this.msg.FAILED_FOUND,
      );
    }
    const eventDTO = new EventDTO(event);
    if (isPublish && !eventDTO.isPublish) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        this.msg.BAD_REQUEST,
      );
    }
    return eventDTO.toDetailDTO();
  }
  public async getEventSummary(id: string): Promise<Partial<IEvent> | null> {
    const event = await this.eventRepository.getEventById(id);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        this.msg.FAILED_FOUND,
      );
    }
    const _eventDTO = new EventDTO(event);
    if (_eventDTO.isPublish && _eventDTO.isRegisterable) {
      return _eventDTO.toSummaryDTO();
    }
    throw new CustomError(
      CustomResponseType.UNAUTHORIZED,
      this.msg.BAD_REQUEST,
    );
  }
  public async getEventsForStore(
    storeId: string,
    optionsReq: Request,
  ): Promise<Partial<IEvent>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getEventsByStoreId(
      storeId,
      queryParams,
    );
    console.log(eventData);
    if (!_.isEmpty(eventData)) {
      const eventDTOs = _.map(eventData, (event) =>
        new EventDTO(event).toDetailDTO(),
      );
      return eventDTOs;
    }
    throw new CustomError(CustomResponseType.NOT_FOUND, this.msg.FAILED_FOUND);
  }

  public async getAllEvents(optionsReq: Request): Promise<Partial<IEvent>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getAllEvents(queryParams);
    if (_.isEmpty(eventData)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        this.msg.FAILED_FOUND,
      );
    }
    return _.map(eventData, (event) => new EventDTO(event).toDetailDTO());
  }
}
