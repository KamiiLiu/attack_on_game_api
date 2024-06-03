import { Request } from 'express';
import { EventService } from '@/services/eventService';
import { BaseController } from '@/controllers/baseController';
import { CustomResponseType } from '@/enums/CustomResponseType';
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
    super();
    this.eventService = new EventService();
  }

  public createEvent = async (req: Request): Promise<ResponseDTO> => {
    try {
      const isResSuccess = await this.eventService.createEvent(req.body);
      if (isResSuccess) {
        return this.formatResponse(
          CustomResponseType.CREATED,
          EventMessages.SUCCESS_CREATED,
        );
      }
      return this.formatResponse(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        EventMessages.FAILED_CREATED,
      );
    } catch (error) {
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        EventMessages.SERVER_ERROR,
        error,
      );
    }
  };
  public updatedEvent = async (req: Request): Promise<ResponseDTO> => {
    try {
      const isResSuccess = await this.eventService.updatedEvent(
        req.params.id,
        req.body,
      );
      if (isResSuccess) {
        return this.formatResponse(
          CustomResponseType.UPDATED,
          EventMessages.SUCCESS_UPDATE,
        );
      }
      return this.formatResponse(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        EventMessages.FAILED_UPDATE,
      );
    } catch (error) {
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        EventMessages.SERVER_ERROR,
        error,
      );
    }
  };
  // 取得事件摘要資料的方法
  getEventSummary = async (req: Request): Promise<ResponseDTO> => {
    try {
      const event = await this.eventService.getSummaryEvent(req.params.id);
      if (event) {
        return this.formatResponse(
          CustomResponseType.SUCCESS,
          EventMessages.SUCCESS_REQUEST,
          event,
        );
      } else {
        return this.formatResponse(
          CustomResponseType.NOT_FOUND,
          EventMessages.BAD_REQUEST,
        );
      }
    } catch (error) {
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        EventMessages.SERVER_ERROR,
        error,
      );
    }
  };

  // 下架活動的方法
  //public deactivateEvent = async (req: Request): Promise<ResponseDTO> => {};
  public getEventDetail = async (req: Request): Promise<ResponseDTO> => {
    try {
      const event = await this.eventService.getDetailEvent(
        req.params.id,
        Boolean(req.query.isPublish),
      );
      if (event) {
        return this.formatResponse(
          CustomResponseType.SUCCESS,
          EventMessages.SUCCESS_REQUEST,
          event,
        );
      } else {
        return this.formatResponse(
          CustomResponseType.NOT_FOUND,
          EventMessages.BAD_REQUEST,
        );
      }
    } catch (error) {
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        EventMessages.SERVER_ERROR,
        error,
      );
    }
  };
  public getEvents = async (req: Request): Promise<ResponseDTO> => {
    try {
      const events = await this.eventService.getEvents(req);
      if (events.length !== 0) {
        return this.formatResponse(
          CustomResponseType.SUCCESS,
          EventMessages.SUCCESS_REQUEST,
          events,
        );
      } else {
        return this.formatResponse(
          CustomResponseType.NOT_FOUND,
          EventMessages.BAD_REQUEST,
        );
      }
    } catch (error) {
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        EventMessages.SERVER_ERROR,
        error,
      );
    }
  };

  public getEventsByStore = async (req: Request): Promise<ResponseDTO> => {
    try {
      const events = await this.eventService.getEventsByStore(
        req.params.storeId,
        req,
      );
      if (events.length !== 0) {
        return this.formatResponse(
          CustomResponseType.SUCCESS,
          EventMessages.SUCCESS_REQUEST,
          events,
        );
      } else {
        return this.formatResponse(
          CustomResponseType.NOT_FOUND,
          EventMessages.BAD_REQUEST,
        );
      }
    } catch (error) {
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        EventMessages.SERVER_ERROR,
        error,
      );
    }
  };
}

// public publishEvent = (req: Request, res: Response) => =>{
//   try {
//     const { eventId } = req.body;
//     const result = await this.eventService.updatePublishStatus(eventId, true);
//     handleResult(result, res);
//   } catch (error) {
//     handleServerError(error);
//   }
// };
// public unpublishEvent = (req: Request, res: Response) => =>{
//   try {
//     const { eventId } = req.body;
//     const result = await this.eventService.updatePublishStatus(
//       eventId,
//       false,
//     );
//     handleResult(result, res);
//   } catch (error) {
//     handleServerError(error);
//   }
// };
