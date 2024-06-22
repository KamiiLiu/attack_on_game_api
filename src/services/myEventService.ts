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
import { UserOrderDTO } from '@/dto/userOrderDTO';
export class MyEventService {
  private eventRepository: EventRepository;
  private lookupService: LookupService;
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.lookupService = new LookupService(
      this.orderRepository,
      this.eventRepository,
      new TicketRepository(),
    );
  }

  public async getOrderByEventId(req: Request): Promise<UserOrderDTO[]> {
    const store = await this.lookupService.findStore(req);
    console.log(req.params.eventId);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store.user,
      { idNumber: req.params.eventId },
    );
    console.log('eventData', eventData);
    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    const eventDTO = new EventDTO(eventData[0]);
    const buyers = await this.orderRepository.findAllBuyers(eventDTO._id);
    console.log('eventDTO._id', eventDTO._id);
    console.log('eventData[0]._id', eventData[0]._id);
    console.log('buyers', buyers);
    return buyers.map((x) => new UserOrderDTO(x));
  }

  public async getAllEventOrder(
    queryParams: Request,
  ): Promise<Partial<EventDTO>[]> {
    const store = await this.lookupService.findStore(queryParams);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store.user,
    );
    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }
}

export default MyEventService;
