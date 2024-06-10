import _ from 'lodash';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { OrderDTO } from '@/dto/orderDTO';
import { EventDTO } from '@/dto/eventDTO';
import { OrderRepository } from '@/repositories/orderRepository';
import { EventRepository } from '@/repositories/eventRepository';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { IBaseService } from '@/services/IBaseService';
import { OrderResponseType } from '@/types/OrderResponseType';
import { Types } from 'mongoose';
export class OrderService implements IBaseService<OrderDTO> {
  private orderRepository: OrderRepository;
  private eventRepository: EventRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
  }
  async getById(id: Types.ObjectId): Promise<OrderDTO> {
    const event = await this.eventRepository.findById(id);
    return eventDTO.toDetailDTO();
  }
  getAll(queryParams: any): Promise<OrderDTO[]> {
    throw new Error('Method not implemented.');
  }
  async create(content: any): Promise<boolean> {
    const targetEvent = await this.eventRepository.findById(
      new Types.ObjectId(content.eventId),
    );
    const targetEventDTO = new EventDTO(targetEvent);
    const targetOrderDTO = new OrderDTO(content);
    if (!targetEventDTO.isRegisterable) {
      throw new CustomError(
        CustomResponseType.CREATED,
        OrderResponseType.BAD_REQUEST,
      );
    }
    if (targetEventDTO.availableSeat < targetOrderDTO.registrationCount) {
      throw new CustomError(
        CustomResponseType.CREATED,
        OrderResponseType.BAD_REQUEST,
      );
    }
    await this.orderRepository.create(targetOrderDTO.toDetailDTO());
    await this.eventRepository.updateParticipantsCount();
  }
  update(id: Types.ObjectId, content: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: Types.ObjectId): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
