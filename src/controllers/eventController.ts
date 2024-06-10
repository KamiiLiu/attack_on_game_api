import { EventService } from '@/services/eventService';
import { BaseController } from '@/controllers/baseController';
import { ResponseDTO } from '@/dto/responseDTO';
import { EventResponseType } from '@/types/EventResponseType';
import { Request } from 'express';
import { Types } from 'mongoose';
import { IBaseController } from '@/controllers/IBaseController';
export class EventController extends BaseController implements IBaseController {
  private eventService: EventService;

  constructor() {
    super(EventResponseType);
    this.eventService = new EventService();
  }
  getById(req: Request): Promise<ResponseDTO> {
    return this.handleServiceResponse(
      () => this.eventService.getById(new Types.ObjectId(req.params.id)),
      EventResponseType.SUCCESS_REQUEST,
    );
  }
  async getAll(req: Request): Promise<ResponseDTO> {
    return await this.handleServiceResponse(
      () => this.eventService.getAll(req),
      EventResponseType.SUCCESS_REQUEST,
    );
  }
  create(req: Request): Promise<ResponseDTO> {
    return this.handleServiceResponse(
      () => this.eventService.create(req.body),
      EventResponseType.SUCCESS_CREATED,
    );
  }
  update(req: Request): Promise<ResponseDTO> {
    return this.handleServiceResponse(
      () =>
        this.eventService.update(new Types.ObjectId(req.params.id), req.body),
      EventResponseType.SUCCESS_UPDATE,
    );
  }
  delete(req: Request): Promise<ResponseDTO> {
    console.log(req);
    throw new Error('Method not implemented.');
  }
  public getEventSummary = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () =>
        this.eventService.getSummaryEvents(new Types.ObjectId(req.params.id)),
      EventResponseType.SUCCESS_REQUEST,
    );
  };

  public getOwnEvent = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.getById(req.body.storeId),
      EventResponseType.SUCCESS_REQUEST,
    );
  };
  public getEventsByStore = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () =>
        this.eventService.getEventsForStore(
          new Types.ObjectId(req.params.storeId),
          req,
        ),
      EventResponseType.SUCCESS_REQUEST,
    );
  };
}
