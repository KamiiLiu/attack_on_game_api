"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = exports.EventMessages = void 0;
const eventService_1 = require("@/services/eventService");
const baseController_1 = require("@/controllers/baseController");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
exports.EventMessages = {
    SUCCESS_CREATED: '建立活動成功，你真棒！',
    FAILED_CREATED: '建立活動失敗，幫你哭。',
    BAD_REQUEST: '無法找到相關活動。可能原因包括：活動已下架或報名尚未開放。',
    SUCCESS_REQUEST: '成功獲取桌遊活動信息！',
    SERVER_ERROR: '伺服器錯誤，請問問卡咪吧。',
    SUCCESS_UPDATE: '成功更新桌遊活動！',
    FAILED_UPDATE: '更新桌遊活動失敗，請再試一次。',
};
class EventController extends baseController_1.BaseController {
    constructor() {
        super();
        this.createEvent = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isResSuccess = yield this.eventService.createEvent(req.body);
                if (isResSuccess) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.CREATED, exports.EventMessages.SUCCESS_CREATED);
                }
                return this.formatResponse(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, exports.EventMessages.FAILED_CREATED);
            }
            catch (error) {
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, exports.EventMessages.SERVER_ERROR, error);
            }
        });
        this.updatedEvent = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isResSuccess = yield this.eventService.updatedEvent(req.params.id, req.body);
                if (isResSuccess) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.UPDATED, exports.EventMessages.SUCCESS_UPDATE);
                }
                return this.formatResponse(CustomResponseType_1.CustomResponseType.DATABASE_OPERATION_FAILED, exports.EventMessages.FAILED_UPDATE);
            }
            catch (error) {
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, exports.EventMessages.SERVER_ERROR, error);
            }
        });
        // 取得事件摘要資料的方法
        this.getEventSummary = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.eventService.getSummaryEvent(req.params.id);
                if (event) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.SUCCESS, exports.EventMessages.SUCCESS_REQUEST, event);
                }
                else {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.NOT_FOUND, exports.EventMessages.BAD_REQUEST);
                }
            }
            catch (error) {
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, exports.EventMessages.SERVER_ERROR, error);
            }
        });
        // 下架活動的方法
        //public deactivateEvent = async (req: Request): Promise<ResponseDTO> => {};
        this.getEventDetail = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.eventService.getDetailEvent(req.params.id, Boolean(req.query.isPublish));
                if (event) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.SUCCESS, exports.EventMessages.SUCCESS_REQUEST, event);
                }
                else {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.NOT_FOUND, exports.EventMessages.BAD_REQUEST);
                }
            }
            catch (error) {
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, exports.EventMessages.SERVER_ERROR, error);
            }
        });
        this.getEvents = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.eventService.getEvents(req);
                if (events.length !== 0) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.SUCCESS, exports.EventMessages.SUCCESS_REQUEST, events);
                }
                else {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.NOT_FOUND, exports.EventMessages.BAD_REQUEST);
                }
            }
            catch (error) {
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, exports.EventMessages.SERVER_ERROR, error);
            }
        });
        this.getEventsByStore = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.eventService.getEventsByStore(req.params.storeId, req);
                if (events.length !== 0) {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.SUCCESS, exports.EventMessages.SUCCESS_REQUEST, events);
                }
                else {
                    return this.formatResponse(CustomResponseType_1.CustomResponseType.NOT_FOUND, exports.EventMessages.BAD_REQUEST);
                }
            }
            catch (error) {
                return this.formatResponse(CustomResponseType_1.CustomResponseType.SYSTEM_ERROR, exports.EventMessages.SERVER_ERROR, error);
            }
        });
        this.eventService = new eventService_1.EventService();
    }
}
exports.EventController = EventController;
/*
class EventController {
  private readonly eventService = new EventService();
  public getEventList = (req: Request, res: Response) => =>{
    try {
      const result = await this.eventService.findEventList(req.query);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  };
  public getEventDetail = (req: Request, res: Response) => =>{
    try {
      const { eventId } = req.params;
      const isPublish: boolean = req.query.isPublish === 'true';
      const result = await this.eventService.findEventByEventId(
        eventId,
        isPublish,
      );
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  };
  public getEventsByShop = (req: Request, res: Response) => =>{
    try {
      const isPublish: boolean = req.query.isPublish === 'true';
      const { storeId } = req.params;
      const result = await this.eventService.findShopEvent(storeId, isPublish);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  };
  public updatedEvent = (req: Request, res: Response) => =>{
    try {
      const { eventId } = req.params;
      const result = await this.eventService.updateEvent(eventId, req.body);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  };
  public createEvent = (req: Request, res: Response) => =>{
    try {
      const storeId = '665185043aae4f4d91cc4c25';
      const createProductDto = new CreateEventDTO({ ...req.body, storeId });
      const result = await this.eventService.createEvent(createProductDto);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  };
  */
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
//# sourceMappingURL=eventController.js.map