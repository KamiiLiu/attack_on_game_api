import _ from 'lodash';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { EventDocument } from '@/interfaces/EventInterface';
import { TicketDocument } from '@/interfaces/TicketInterface';
import { OrderDTO } from '@/dto/orderDTO';
import { EventDTO } from '@/dto/eventDTO';
import { TicketDTO } from '@/dto/ticketDTO';
import { OrderRepository } from '@/repositories/orderRepository';
import { EventRepository } from '@/repositories/eventRepository';
import { TicketRepository } from '@/repositories/ticketRepository';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { OrderResponseType } from '@/types/OrderResponseType';
import { EventResponseType } from '@/types/EventResponseType';
import { CustomError } from '@/errors/CustomError';
import { Request } from 'express';
import Player from '@/models/Player';
interface IGetByIdResult {
  event: Partial<EventDocument>;
  order: Partial<OrderDocument>;
  tickets: Partial<TicketDocument>[];
}

export class OrderService {
  private orderRepository: OrderRepository;
  private eventRepository: EventRepository;
  private ticketRepository: TicketRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
  }
  async getById(queryParams: Request): Promise<IGetByIdResult> {
    const player = await Player.findOne({ user: queryParams.user });
    if (_.isEmpty(player)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.ERROR_PLAYER_FOUND,
      );
    }

    const order = await this.orderRepository.findById(
      queryParams.params.orderId,
    );
    if (!order) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }

    const ticketList = await this.ticketRepository.findAll(order.id, player.id);
    const event = await this.eventRepository.findByDBId(order.eventId);
    if (!event) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    const targetEventDTO = new EventDTO(event);
    const targetOrderDTO = new OrderDTO(order);
    const targetTicketsDTO = ticketList.map((x) =>
      new TicketDTO(x).toDetailDTO(),
    );

    return {
      event: targetEventDTO.toSummaryDTO(),
      order: targetOrderDTO.toDetailDTO(),
      tickets: targetTicketsDTO,
    };
  }
  async getAll(queryParams: Request): Promise<OrderDTO[]> {
    const player = await Player.findOne({ user: queryParams.user });
    if (!player) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.ERROR_REGISTRATION_PERIOD,
      );
    }
    throw new Error('Method not implemented.');
  }
  async create(content: any): Promise<boolean> {
    const player = await Player.findOne({ user: content.user._id }).exec();
    console.log('player', player);
    console.log('content', content.user._id);
    if (_.isEmpty(player)) {
      console.log(
        'OrderResponseType.ERROR_PLAYER_FOUND',
        OrderResponseType.CREATED_ERROR_PLAYER_FOUND,
      );
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.CREATED_ERROR_PLAYER_FOUND,
      );
    }
    const targetEvent = await this.eventRepository.findById(
      content.body.eventId,
    );
    if (_.isEmpty(targetEvent)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    console.log('targetEvent', targetEvent);
    const targetEventDTO = new EventDTO(targetEvent);
    const targetOrderDTO = new OrderDTO({
      ...content.body,
      eventId: targetEvent._id,
      playerId: content.user._id,
    });

    if (!targetEventDTO.isRegisterable) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD,
      );
    }

    if (
      targetEventDTO.participationFee * targetOrderDTO.registrationCount !==
      targetOrderDTO.getTotalAmount
    ) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_MONEY,
      );
    }

    const addedSeat =
      targetEventDTO.currentParticipantsCount +
      targetOrderDTO.registrationCount;
    await this.orderRepository.create(targetOrderDTO.toDetailDTO());
    await this.eventRepository.updateParticipantsCount(
      targetEventDTO,
      addedSeat,
    );
    const ticketPromises = [];
    for (let index = 0; index < targetOrderDTO.registrationCount; index++) {
      ticketPromises.push(this.ticketRepository.create(targetOrderDTO._id));
    }
    await Promise.all(ticketPromises);
    return true;
  }
}
