import { Request } from 'express';
import { EventService } from '@/services/eventService';
import { BaseController } from '@/controllers/baseController';

import { ResponseDTO } from '@/dto/responseDTO';
import { IHTTPSMessage } from '@/interfaces/HTTPSMessageInterface';

export const EventMessages: IHTTPSMessage = {
  SUCCESS_CREATED: '建立活動成功，你真棒！',
  FAILED_CREATED: '建立活動失敗，幫你哭。',
  BAD_REQUEST: '無法找到相關活動。可能原因包括：活動已下架或報名尚未開放。',
  SUCCESS_REQUEST: '成功獲取桌遊活動信息！',
  SERVER_ERROR: '伺服器錯誤，請問問卡咪吧。',
  SUCCESS_UPDATE: '成功更新桌遊活動！',
  FAILED_UPDATE: '更新桌遊活動失敗，請再試一次。',
};

export class EventController extends BaseController {
  private eventService: EventService;

  constructor() {
    super(EventMessages.SERVER_ERROR);
    this.eventService = new EventService();
  }

  public createEvent = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.createEvent(req.body),
      EventMessages.SUCCESS_CREATED,
      EventMessages.FAILED_CREATED,
    );
  };

  public updateEvent = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.updateEvent(req.params.id, req.body),
      EventMessages.SUCCESS_UPDATE,
      EventMessages.FAILED_UPDATE,
    );
  };

  public getEventSummary = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.getSummaryEvent(req.params.id),
      EventMessages.SUCCESS_REQUEST,
      EventMessages.BAD_REQUEST,
    );
  };

  public getOwnEvent = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () =>
        this.eventService.getDetailEvent(
          req.body.storeId,
          Boolean(req.query.isPublish),
        ),
      EventMessages.SUCCESS_REQUEST,
      EventMessages.BAD_REQUEST,
    );
  };

  public getEventDetail = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () =>
        this.eventService.getDetailEvent(
          req.params.id,
          Boolean(req.query.isPublish),
        ),
      EventMessages.SUCCESS_REQUEST,
      EventMessages.BAD_REQUEST,
    );
  };

  public getEvents = async (req: Request): Promise<ResponseDTO> => {
    const aaa = await this.handleServiceResponse(
      () => this.eventService.getEvents(req),
      EventMessages.SUCCESS_REQUEST,
      EventMessages.BAD_REQUEST,
    );
    console.log('xxxxx');
    console.log(aaa);
    return aaa;
  };

  public getEventsByStore = async (req: Request): Promise<ResponseDTO> => {
    return this.handleServiceResponse(
      () => this.eventService.getEventsByStore(req.params.storeId, req),
      EventMessages.SUCCESS_REQUEST,
      EventMessages.BAD_REQUEST,
    );
  };
}
