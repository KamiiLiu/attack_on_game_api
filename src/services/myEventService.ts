import { Request } from 'express';
import { EventRepository } from '@/repositories/EventRepository';
import { LookupService } from './LookupService';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { EventResponseType } from '@/types/EventResponseType';
import { EventDTO } from '@/dto/eventDTO';
import { EventDocument } from '@/interfaces/EventInterface';
import { OrderRepository } from '@/repositories/OrderRepository';
import { TicketRepository } from '@/repositories/TicketRepository';

export class MyEventService {
  private EventRepository: EventRepository;
  private lookupService: LookupService;

  constructor() {
    this.EventRepository = new EventRepository();
    this.lookupService = new LookupService(
      new OrderRepository(),
      this.EventRepository,
      new TicketRepository(),
    );
  }

  public async getOrderByyEventId(id: string): Promise<Partial<EventDTO>> {
    const event = await this.lookupService.findEventById(id);
    const eventDTO = new EventDTO(event);
    if (!eventDTO.isPublish) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }
    return eventDTO.toDetailDTO();
  }

  public async getAllEventOrder(
    queryParams: Request['query'],
  ): Promise<Partial<EventDTO>[]> {
    const eventData = await this.EventRepository.findAll(queryParams);
    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }

  public async createEvent(content: EventDocument): Promise<boolean> {
    const eventDTO = new EventDTO(content).toDetailDTO();
    return await this.EventRepository.create(eventDTO);
  }

  public async updateEvent(
    id: string,
    content: EventDocument,
  ): Promise<Partial<EventDTO> | null> {
    const event = await this.lookupService.findEventById(id);
    const eventDTO = new EventDTO(content).toDetailDTO();
    return await this.EventRepository.update(id, eventDTO);
  }

  public async deleteEvent(id: string): Promise<boolean> {
    return await this.EventRepository.delete(id);
  }
}

export default MyEventService;
