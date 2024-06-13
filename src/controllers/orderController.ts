import { OrderService } from '@/services/orderService';
import { BaseController } from '@/controllers/baseController';
import { ResponseDTO } from '@/dto/responseDTO';
import { Request } from 'express';
import { IBaseController } from '@/controllers/IBaseController';
import { OrderResponseType } from '@/types/OrderResponseType';
export class OrderController extends BaseController implements IBaseController {
  private orderService: OrderService;

  constructor() {
    super(OrderResponseType);
    this.orderService = new OrderService();
  }
  public getById = async (req: Request): Promise<ResponseDTO> => {
    return await this.handleServiceResponse(
      () => this.orderService.getById(req),
      OrderResponseType.SUCCESS_REQUEST,
    );
  };
  public getAll = async (req: Request): Promise<ResponseDTO> => {
    return await this.handleServiceResponse(
      () => this.orderService.getAll(req),
      OrderResponseType.SUCCESS_REQUEST,
    );
  };
  public create = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.orderService.create(req),
      OrderResponseType.SUCCESS_CREATED,
    );
  };
  update(req: Request): Promise<ResponseDTO> {
    throw new Error('Method not implemented.');
  }
  delete(req: Request): Promise<ResponseDTO> {
    throw new Error('Method not implemented.');
  }
}
