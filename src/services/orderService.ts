import _ from 'lodash';
import { Request } from 'express';
import { OrderRepository } from '@/repositories/OrderRepository';
import { EventRepository } from '@/repositories/EventRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { LookupService } from './LookupService';
import { EventDTO } from '@/dto/eventDTO';
import { OrderDTO } from '@/dto/orderDTO';
import { OrderListDTO } from '@/dto/orderListDTO';
import { TicketDTO } from '@/dto/ticketDTO';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { OrderResponseType } from '@/types/OrderResponseType';
import { IStore as StoreDocument } from '@/models/Store';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { EventDocument } from '@/interfaces/EventInterface';
import { TicketDocument } from '@/interfaces/TicketInterface';
import { IPlayer as PlayerDocument } from '@/models/Player';
import { EventResponseType } from '@/types/EventResponseType';
import { TicketResponseType } from '@/types/TicketResponseType';
import Player from '@/models/Player';
import { Types } from 'mongoose';
import { Status } from '@/enums/OrderStatus';
import { IQuery } from '@/enums/OrderRequest';
interface IGetByIdResult {
  event: Partial<EventDocument>;
  order: Partial<OrderDocument>;
  tickets: Partial<TicketDocument>[];
  store: StoreDocument;
}
const SKIP = 0;
const LIMIT = 100;
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
    const { eventId } = req.body;

    const [event, player] = await Promise.all([
      this.lookupService.findEventById(eventId),
      this.lookupService.findPlayer(req),
    ]);

    const orderDTO = this.createOrderDTO(req.body, event, player);
    this.validateOrder(event, orderDTO);

    const order = await this.createOrder(orderDTO);
    await this.updateEventParticipants(event, orderDTO);
    await this.createTickets(order._id, player._id, orderDTO.registrationCount);

    return order;
  }

  public async getById(queryParams: Request): Promise<IGetByIdResult> {
    const [player, order] = await Promise.all([
      this.lookupService.findPlayer(queryParams),
      this.lookupService.findOrder(queryParams.params.orderId),
    ]);

    if (order.playerId.toString() !== player._id.toString()) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.FAILED_AUTHORIZATION,
      );
    }

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
    const store = await this.lookupService.findStoreByStoreId(
      targetEventDTO.storeId,
    );
    if (targetOrderDTO.status === Status.CANCEL) {
      return {
        event: targetEventDTO.toSummaryDTO(),
        order: targetOrderDTO.toDetailDTO(),
        tickets: [],
        store,
      };
    }

    const ticketList = await this.lookupService.findTickets(
      order.id,
      player._id,
    );
    const targetTicketsDTO = ticketList.map((ticket) =>
      new TicketDTO(ticket).toDetailDTO(),
    );

    return {
      event: targetEventDTO.toSummaryDTO(),
      order: targetOrderDTO.toDetailDTO(),
      tickets: targetTicketsDTO,
      store,
    };
  }

  async getAll(queryParams: Request): Promise<OrderListDTO[]> {
    const player = await this.findPlayer(queryParams);
    const { limit = LIMIT, status, skip = SKIP } = queryParams.query as IQuery;
    const orderList = await this.lookupService.findOrderList(player._id, {
      limit,
      status,
      skip,
    });
    console.log(orderList.length);
    const eventIds = orderList.map((x) => x.eventId);
    const eventList = await this.eventRepository.getEventsData(
      {
        _id: { $in: eventIds },
      },
      0,
      100,
    );

    const result = orderList
      .map((order) => {
        const findEvent = eventList.find(
          (event) => event._id.toString() === order.eventId.toString(),
        );
        if (findEvent) return new OrderListDTO(order, findEvent);
        return undefined;
      })
      .filter((x): x is OrderListDTO => x !== undefined);
    console.log(result.length);
    return result;
  }

  private async findPlayer(queryParams: Request): Promise<PlayerDocument> {
    const player = await Player.findOne({ user: queryParams.user });
    if (_.isEmpty(player)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.ERROR_PLAYER_FOUND,
      );
    }
    return player;
  }

  private async findOrder(orderId: string): Promise<OrderDocument> {
    const order = await this.orderRepository.findById(orderId);
    if (_.isEmpty(order)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }
    return order;
  }
  private async findOrderList(
    playerId: Types.ObjectId,
    query: IQuery,
  ): Promise<OrderDTO[]> {
    const queryObject: any = {
      playerId,
    };
    if (query.status) {
      queryObject.status = query.status;
    }
    const LIMIT_Q = query.limit ?? LIMIT;
    const order = await this.orderRepository.findAll(queryObject, {
      limit: LIMIT_Q,
      skip: query.skip || SKIP,
    });
    console.log(order.length);
    if (_.isEmpty(order)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }
    return order.map((order) => new OrderDTO(order));
  }

  private async findEventByDbId(
    eventId: Types.ObjectId,
  ): Promise<Partial<EventDocument>> {
    const event = await this.eventRepository.findByDBId(eventId);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return event;
  }
  private async findEventById(
    eventId: string,
  ): Promise<Partial<EventDocument>> {
    const event = await this.eventRepository.findById(eventId);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return event;
  }
  private async findTickets(
    orderId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<TicketDocument[]> {
    const ticketList = await this.ticketRepository.findAll(orderId, userId);
    if (_.isEmpty(ticketList)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        TicketResponseType.FAILED_FOUND,
      );
    }
    return ticketList;
  }
  private createOrderDTO(
    body: any,
    event: Partial<EventDocument>,
    player: PlayerDocument,
  ): OrderDTO {
    return new OrderDTO({
      ...body,
      eventId: event._id,
      playerId: player._id,
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
