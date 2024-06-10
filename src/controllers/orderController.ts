import OrderService from '@/services/orderService';
import { BaseController } from '@/controllers/baseController';
import { ResponseDTO } from '@/dto/responseDTO';
import { Request } from 'express';
import { Types } from 'mongoose';
import { IBaseController } from '@/controllers/IBaseController';
import { OrderResponseType } from '@/types/OrderResponseType';
export class OrderController extends BaseController implements IBaseController {
  private orderService: OrderService;

  constructor() {
    super(OrderResponseType);
    this.orderService = new OrderService();
  }
  getById(req: Request): Promise<ResponseDTO> {
    throw new Error('Method not implemented.');
  }
  getAll(req: Request): Promise<ResponseDTO> {
    throw new Error('Method not implemented.');
  }
  create(req: Request): Promise<ResponseDTO> {
    return this.handleServiceResponse(
      () => this.orderService.createNewOrder(req.body),
      OrderResponseType.SUCCESS_CREATED,
    );
  }
  update(req: Request): Promise<ResponseDTO> {
    throw new Error('Method not implemented.');
  }
  delete(req: Request): Promise<ResponseDTO> {
    throw new Error('Method not implemented.');
  }
}
