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
import { TicketCodeDTO } from '@/dto/TicketCodeDTO';
interface IUserOrderDTO {
  event: Partial<EventDocument>;
  user: UserOrderDTO[];
}
export class MyEventService {
  private eventRepository: EventRepository;
  private lookupService: LookupService;
  private orderRepository: OrderRepository;
  private ticketRepository: TicketRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
    this.lookupService = new LookupService(
      this.orderRepository,
      this.eventRepository,
      new TicketRepository(),
    );
  }

  public async getOrderByEventId(req: Request): Promise<IUserOrderDTO> {
    const store = await this.lookupService.findStore(req);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store._id,
      { idNumber: req.params.eventId },
    );
    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    const eventDTO = new EventDTO(eventData[0]);
    const buyers = await this.orderRepository.findAllBuyers(eventDTO._id);
    return {
      event: eventDTO.toDetailDTO(),
      user: buyers.map((x) => new UserOrderDTO(x)),
    };
  }
  public async getTicketByEventId(req: Request): Promise<TicketCodeDTO[]> {
    const store = await this.lookupService.findStore(req);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store._id,
      { idNumber: req.params.eventId },
    );
    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    const eventDTO = new EventDTO(eventData[0]);
    const buyers = await this.orderRepository.findAllBuyers(eventDTO._id);
    const buyersWithTickets = await Promise.all(
      buyers.map(async (buyer) => {
        const buyerTickets = await this.ticketRepository.findAllBuyers(
          buyer._id,
        );

        const player = await this.lookupService.findPlayerById(buyer.playerId);
        return new TicketCodeDTO(buyerTickets, buyer, player);
      }),
    );
    return buyersWithTickets;
  }
  public async getAllEventOrder(): Promise<boolean> {
    this.ticketRepository.updateAll();
    return true;
    // const store = await this.lookupService.findStore(queryParams);
    // const eventData = await this.eventRepository.getEventsByAprilStoreId(
    //   store._id,
    // );
    // if (!eventData.length) {
    //   throw new CustomError(
    //     CustomResponseType.NOT_FOUND,
    //     EventResponseType.FAILED_FOUND,
    //   );
    // }
    // return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }
}

export default MyEventService;
