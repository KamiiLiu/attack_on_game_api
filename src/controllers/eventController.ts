import { EventService } from '@/services/eventService';
import { BaseController } from '@/controllers/baseController';
import { ResponseDTO } from '@/dto/responseDTO';
import { EventResponseType } from '@/types/EventResponseType';
import { Request } from 'express';
import { IBaseController } from '@/controllers/IBaseController';
import { Types } from 'mongoose';
export class EventController extends BaseController implements IBaseController {
  private eventService: EventService;

  constructor() {
    super(EventResponseType);
    this.eventService = new EventService();
  }
  public getById = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.getById(req.params.id),
      EventResponseType.SUCCESS_REQUEST,
    );
  };
  public getAll = async (req: Request): Promise<ResponseDTO> => {
    return await this.handleServiceResponse(
      () => this.eventService.getAll(req),
      EventResponseType.SUCCESS_REQUEST,
    );
  };
  public create = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.create(req),
      EventResponseType.SUCCESS_CREATED,
    );
  };
  public update = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.update(req),
      EventResponseType.SUCCESS_UPDATE,
    );
  };
  public delete = async (req: Request): Promise<ResponseDTO> => {
    console.log(req);
    throw new Error('Method not implemented.');
  };
  public getEventSummary = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.getSummaryEvents(req.params.id),
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
