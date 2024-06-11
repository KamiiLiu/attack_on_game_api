import _ from 'lodash';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { OrderDTO } from '@/dto/orderDTO';
import { EventDTO } from '@/dto/eventDTO';
import { OrderRepository } from '@/repositories/orderRepository';
import { EventRepository } from '@/repositories/eventRepository';
import { TicketRepository } from '@/repositories/ticketRepository';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { IBaseService } from '@/services/IBaseService';
import { OrderResponseType } from '@/types/OrderResponseType';
import { Types } from 'mongoose';
import Player from '@/models/Player';
export class OrderService implements IBaseService<OrderDTO> {
  private orderRepository: OrderRepository;
  private eventRepository: EventRepository;
  private ticketRepository: TicketRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
  }
  async getById(id: string): Promise<OrderDTO> {
    const event = await this.eventRepository.findById(id);
    return eventDTO.toDetailDTO();
  }
  async getAll(queryParams: any): Promise<OrderDTO[]> {
    const player = await Player.findOne({ user: req.params.id });
    throw new Error('Method not implemented.');
  }
  async create(content: any): Promise<boolean> {
    const targetEvent = await this.eventRepository.findById(content.eventId);
    const targetEventDTO = new EventDTO(targetEvent);
    const targetOrderDTO = new OrderDTO(content);

    if (!targetEventDTO.isRegisterable) {
      throw new CustomError(
        CustomResponseType.CREATED,
        OrderResponseType.ERROR_REGISTRATION_PERIOD,
      );
    }

    if (targetEventDTO.availableSeat < targetOrderDTO.registrationCount) {
      throw new CustomError(
        CustomResponseType.CREATED,
        OrderResponseType.ERROR_EXCEEDS_CAPACITY,
      );
    }
    await this.orderRepository.create(targetOrderDTO.toDetailDTO());
    await this.eventRepository.updateParticipantsCount(targetEventDTO);
    const ticketPromises = [];
    for (let index = 0; index < targetOrderDTO.registrationCount; index++) {
      ticketPromises.push(
        this.ticketRepository.create(targetOrderDTO.idNumber),
      );
    }
    await Promise.all(ticketPromises);
    return true;
  }
  async update(id: string, content: any): Promise<Partial<EventDTO> | null> {
    throw new Error(
      'Method not implemented. This method is intentionally left unimplemented.',
    );
  }

  async delete(id: string): Promise<Partial<EventDTO> | null> {
    throw new Error(
      'Method not implemented. This method is intentionally left unimplemented.',
    );
  }
}
