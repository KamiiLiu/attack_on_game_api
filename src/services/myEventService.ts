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
import { TicketStatus } from '@/enums/TicketStatus';
import _ from 'lodash';
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

    const buyersWithTickets: UserOrderDTO[] = await Promise.all(
      buyers.map(async (buyer) => {
        const player = await this.lookupService.findPlayerById(buyer.playerId);
        return new UserOrderDTO(player, buyer);
      }),
    );

    return {
      event: eventDTO.toDetailDTO(),
      user: buyersWithTickets,
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

    const buyerIds = buyers.map((buyer) => buyer.playerId);
    const playerIds = buyers.map((buyer) => buyer.playerId);

    const [players, allTickets] = await Promise.all([
      this.lookupService.findPlayersByIds(playerIds),
      this.ticketRepository.findTicketsByBuyerIds(buyerIds),
    ]);
    const playersMap = new Map(
      players.map((player) => [player._id.toString(), player]),
    );
    const ticketsMap = new Map(
      buyers.map((buyer) => [
        buyer._id.toString(),
        allTickets.filter(
          (ticket) => ticket.orderId.toString() === buyer._id.toString(),
        ),
      ]),
    );
    const buyersWithTickets: TicketCodeDTO[] = buyers
      .filter((buyer) => playersMap.has(buyer.playerId.toString()))
      .flatMap((buyer) => {
        const player = playersMap.get(buyer.playerId.toString());
        const buyerTickets = ticketsMap.get(buyer._id.toString()) || [];
        return buyerTickets.map(
          (ticket) => new TicketCodeDTO(ticket, buyer, player!),
        );
      });
    return buyersWithTickets;
  }
  public async getAllEventOrder(
    queryParams: Request,
  ): Promise<Partial<EventDTO>[]> {
    const store = await this.lookupService.findStore(queryParams);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store._id,
    );

    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }

    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }

  public async validateQrCode(queryParams: Request): Promise<Partial<boolean>> {
    const store = await this.lookupService.findStore(queryParams);
    const ticketsByStore = await this.getTicketByEventId(queryParams);
    const event = await this.eventRepository.findById(
      queryParams.params.eventId,
    );

    if (event.storeId.toString() !== store._id.toString()) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }

    const tickets: string[] = queryParams.body.tickets;
    const qrCodeList: string[] = [];

    tickets.forEach((x) => {
      const targetTicket = ticketsByStore.find((t) => t.idNumber === x);
      if (
        !_.isEmpty(targetTicket) &&
        targetTicket.qrCodeStatus === TicketStatus.PENDING
      ) {
        qrCodeList.push(targetTicket.idNumber);
      }
    });

    if (!_.isEmpty(qrCodeList)) {
      await this.ticketRepository.updateStatus(qrCodeList);
    }

    return true;
  }
}

export default MyEventService;
