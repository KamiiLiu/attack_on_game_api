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
import { EventResponseType } from '@/types/EventResponseType';
import { LookupService } from './LookupService';
import { Types } from 'mongoose';
import { OrderRepository } from '@/repositories/OrderRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
interface IEvent {
  event: Partial<EventDTO>;
  store: StoreDocument;
}
export class EventService {
  private eventRepository: EventRepository;
  private queryParams: QueryParamsParser;
  private lookupService: LookupService;
  constructor() {
    this.eventRepository = new EventRepository();
    this.queryParams = new QueryParamsParser();
    this.lookupService = new LookupService(
      new OrderRepository(),
      this.eventRepository,
      new TicketRepository(),
    );
  }
  async getById(id: string): Promise<IEvent> {
    const event = await this.eventRepository.findById(id);
    const eventDTO = new EventDTO(event);
    if (!eventDTO.isPublish) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }
    const owner = await this.lookupService.findStoreByStoreId(eventDTO.storeId);
    return { event: eventDTO.toDetailDTO(), store: owner };
  }
  async getAll(queryParams: any): Promise<Partial<EventDTO>[]> {
    const _queryParams = this.queryParams.parse(queryParams);
    const eventData = await this.eventRepository.findAll(_queryParams);
    if (_.isEmpty(eventData)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return _.map(eventData, (event) => new EventDTO(event).toDetailDTO());
  }
  async create(queryParams: Request): Promise<EventDTO> {
    const store = await this.lookupService.findStoreById(queryParams);
    const _content = new EventDTO({
      ...queryParams.body,
      storeId: store._id,
    }).toDetailDTO();
    const eventDocument = await this.eventRepository.create(_content);
    return new EventDTO(eventDocument);
  }
  async update(queryParams: Request): Promise<Partial<EventDTO> | null> {
    const store = await this.lookupService.findStore(queryParams);
    const findEvent = await this.eventRepository.findById(
      queryParams.params.id,
    );
    if (store._id.toString() === findEvent.storeId.toString()) {
      const updateContent = {
        _id: findEvent._id,
        idNumber: findEvent.idNumber,
        storeId: store._id,
        ...queryParams.body,
      };
      const _content = new EventDTO(updateContent);
      const _event = await this.eventRepository.update(_content);
      if (!_.isEmpty(_event)) {
        const _eventDTO = new EventDTO(_event);
        return _eventDTO.toDetailDTO();
      }
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    throw new CustomError(
      CustomResponseType.NOT_FOUND,
      EventResponseType.FAILED_FOUND,
    );
  }
  delete(id: string): Promise<EventDTO | null> {
    throw new Error('Method not implemented.');
  }
  public async getEventsForStore(
    storeId: Types.ObjectId,
    optionsReq: Request,
  ): Promise<Partial<EventDTO>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getEventsByStoreId(
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
    const event = await this.eventRepository.findById(id);
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
