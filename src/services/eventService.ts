//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
import _ from 'lodash';
import { Request } from 'express';
import { IStore as StoreDocument } from '@/models/Store';
import { EventDTO } from '@/dto/eventDTO';
import { EventRepository } from '@/repositories/EventRepository';
import { QueryParamsParser } from '@/services/eventQueryParams';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { OrderRepository } from '@/repositories/OrderRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { EventResponseType } from '@/types/EventResponseType';
import { EventDocument } from '@/interfaces/EventInterface';
import { LookupService } from './LookupService';
import { Types } from 'mongoose';
interface IEventDetail {
  event: Partial<EventDTO>;
  store: StoreDocument;
}
export class EventService {
  private EventRepository: EventRepository;
  private queryParams: QueryParamsParser;
  private lookupService: LookupService;
  constructor() {
    this.EventRepository = new EventRepository();
    this.queryParams = new QueryParamsParser();
    this.lookupService = new LookupService(
      new OrderRepository(),
      new EventRepository(),
      new TicketRepository(),
    );
  }
  async getById(id: string): Promise<IEventDetail> {
    const event = await this.EventRepository.findById(id);
    const eventDTO = new EventDTO(event);
    if (!eventDTO.isPublish) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }
    const owner = await this.lookupService.findStoreByUserId(eventDTO.storeId);
    return { event: eventDTO.toDetailDTO(), store: owner };
  }
  async getAll(queryParams: any): Promise<Partial<EventDTO>[]> {
    const _queryParams = this.queryParams.parse(queryParams);
    const eventData = await this.EventRepository.findAll(_queryParams);
    if (_.isEmpty(eventData)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return _.map(eventData, (event) => new EventDTO(event).toDetailDTO());
  }
  async create(content: EventDocument): Promise<boolean> {
    const _content = new EventDTO(content).toDetailDTO();
    return await this.EventRepository.create(_content);
  }
  async update(
    id: string,
    content: EventDocument,
  ): Promise<Partial<EventDTO> | null> {
    const updateContent = { ...content, idNumber: id };
    const _content = new EventDTO(updateContent);
    const _event = await this.EventRepository.update(_content);
    if (!_.isEmpty(_event)) {
      const _eventDTO = new EventDTO(_event);
      return _eventDTO.toDetailDTO();
    }
    throw new CustomError(
      CustomResponseType.NOT_FOUND,
      EventResponseType.FAILED_FOUND,
    );
  }
  public async getEventsForStore(
    storeId: Types.ObjectId,
    optionsReq: Request,
  ): Promise<Partial<EventDTO>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.EventRepository.getEventsByStoreId(
      storeId,
      queryParams,
    );
    if (!_.isEmpty(eventData)) {
      const eventDTOs = _.map(eventData, (event) =>
        new EventDTO(event).toDetailDTO(),
      );
      return eventDTOs;
    }
    throw new CustomError(
      CustomResponseType.NOT_FOUND,
      EventResponseType.FAILED_FOUND,
    );
  }

  public async getSummaryEvents(id: string): Promise<Partial<EventDTO>> {
    const event = await this.EventRepository.findById(id);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    const _eventDTO = new EventDTO(event);
    if (_eventDTO.isPublish && _eventDTO.isRegisterable) {
      return _eventDTO.toSummaryDTO();
    }
    throw new CustomError(
      CustomResponseType.UNAUTHORIZED,
      EventResponseType.FAILED_AUTHORIZATION,
    );
  }
}
