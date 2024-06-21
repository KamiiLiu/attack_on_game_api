import { Request } from 'express';
import { OrderRepository } from '@/repositories/OrderRepository';
import { EventRepository } from '@/repositories/EventRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { LookupService } from './LookupService';
import { EventDTO } from '@/dto/eventDTO';
import { OrderDTO } from '@/dto/orderDTO';
import { TicketDTO } from '@/dto/ticketDTO';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { OrderResponseType } from '@/types/OrderResponseType';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { EventDocument } from '@/interfaces/EventInterface';
import { TicketDocument } from '@/interfaces/TicketInterface';
import { IPlayer as PlayerDocument } from '@/models/Player';
import { Types } from 'mongoose';
import { Status } from '@/enums/OrderStatus';
import { IQuery } from '@/enums/OrderRequest';
interface IGetByIdResult {
  event: Partial<EventDocument>;
  order: Partial<OrderDocument>;
  tickets: Partial<TicketDocument>[];
}
export class OrderService {
  private orderRepository: OrderRepository;
  private lookupService: LookupService;
  private eventRepository: EventRepository;
  private ticketRepository: TicketRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
    this.lookupService = new LookupService(
      this.orderRepository,
      new EventRepository(),
      new TicketRepository(),
    );
  }

  public async create(req: Request): Promise<OrderDocument> {
    const { eventId, playerId, body } = req.body;

    const event = await this.lookupService.findEventById(eventId);
    const player = await this.lookupService.findPlayer(playerId);

    const orderDTO = this.createOrderDTO(body, event, player);
    this.validateOrder(event, orderDTO);

    const order = await this.createOrder(orderDTO);
    await this.updateEventParticipants(event, orderDTO);
    await this.createTickets(order._id, playerId, orderDTO.registrationCount);

    return order;
  }

  public async getById(queryParams: Request): Promise<IGetByIdResult> {
    const player = await this.lookupService.findPlayer(queryParams);
    const order = await this.lookupService.findOrder(
      queryParams.params.orderId,
    );
    const eventId = order.eventId;
    if (!eventId) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.FAILED_VALIDATION_EVENT_ID,
      );
    }
    const event = await this.lookupService.findEventByDbId(eventId);

    const targetOrderDTO = new OrderDTO(order);
    const targetEventDTO = new EventDTO(event);

    if (targetOrderDTO.status === Status.CANCEL) {
      return {
        event: targetEventDTO.toSummaryDTO(),
        order: targetOrderDTO.toDetailDTO(),
        tickets: [],
      };
    }

    const ticketList = await this.lookupService.findTickets(
      order.id,
      player.user,
    );
    const targetTicketsDTO = ticketList.map((ticket) =>
      new TicketDTO(ticket).toDetailDTO(),
    );

    return {
      event: targetEventDTO.toSummaryDTO(),
      order: targetOrderDTO.toDetailDTO(),
      tickets: targetTicketsDTO,
    };
  }

  public async getAll(queryParams: Request): Promise<Partial<OrderDTO>[]> {
    const player = await this.lookupService.findPlayer(queryParams);
    const { limit, status, skip } = queryParams.query as IQuery;
    const orderList = await this.lookupService.findOrderList(player.user, {
      limit,
      status,
      skip,
    });
    return orderList.map((order) => new OrderDTO(order).toDetailDTO());
  }

  private createOrderDTO(
    body: any,
    event: Partial<EventDocument>,
    player: PlayerDocument,
  ): OrderDTO {
    return new OrderDTO({
      ...body,
      eventId: event._id,
      playerId: player.user,
    });
  }

  private validateOrder(
    event: Partial<EventDocument>,
    orderDTO: OrderDTO,
  ): void {
    const targetEventDTO = new EventDTO(event);
    if (!targetEventDTO.isRegisterable) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD,
      );
    }
    if (
      targetEventDTO.participationFee * orderDTO.registrationCount !==
      orderDTO.getTotalAmount
    ) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_MONEY,
      );
    }
    if (targetEventDTO.availableSeat < orderDTO.registrationCount) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_EXCEEDS_CAPACITY,
      );
    }
  }
  private async createOrder(orderDTO: OrderDTO): Promise<OrderDocument> {
    return await this.orderRepository.create(orderDTO.toDetailDTO());
  }
  private async updateEventParticipants(
    event: Partial<EventDocument>,
    orderDTO: OrderDTO,
  ): Promise<void> {
    const targetEventDTO = new EventDTO(event);
    const addedSeat =
      targetEventDTO.currentParticipantsCount + orderDTO.registrationCount;
    await this.eventRepository.updateParticipantsCount(
      targetEventDTO,
      addedSeat,
    );
  }
  private async createTickets(
    orderId: Types.ObjectId,
    userId: Types.ObjectId,
    registrationCount: number,
  ): Promise<void> {
    const ticketPromises = [];
    for (let index = 0; index < registrationCount; index++) {
      ticketPromises.push(this.ticketRepository.create(orderId, userId));
    }
    await Promise.all(ticketPromises);
  }
}

export default OrderService;
