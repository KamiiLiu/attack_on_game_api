import _ from 'lodash';
import mongoose from 'mongoose';
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
    try {
      const player = await Player.findOne({ user: content.user._id }).exec();
      if (!player) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          OrderResponseType.ERROR_PLAYER_FOUND,
        );
      }
      const targetEvent = await this.eventRepository.findById(
        content.body.eventId,
      );
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

      if (targetEventDTO.availableSeat < targetOrderDTO.registrationCount) {
        throw new CustomError(
          CustomResponseType.VALIDATION_ERROR,
          OrderResponseType.CREATED_ERROR_EXCEEDS_CAPACITY,
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
        ticketPromises.push(
          this.ticketRepository.create(targetOrderDTO.getIdNumber),
        );
      }
      await Promise.all(ticketPromises);
      return true;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        error?.message || error,
      );
    }
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
