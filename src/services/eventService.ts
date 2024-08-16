//TODO:上傳照片的方式可能也要研究一下
//TODO:寫一個fs模塊，批量上傳假資料
import _ from 'lodash';
import { Request } from 'express';
import { IStore as StoreDocument } from '@/models/Store';
import { EventDTO } from '@/dto/eventDTO';
import { EventRepository } from '@/repositories/EventRepository';
import { QueryParamsParser } from '@/services/eventQueryParams';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { EventResponseType } from '@/types/EventResponseType';
import { LookupService } from './LookupService';
import { Types } from 'mongoose';
import { OrderRepository } from '@/repositories/OrderRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
interface IEvent {
  event: Partial<EventDTO>;
  store: StoreDocument;
}
export class EventService {
  private eventRepository: EventRepository;
  private queryParams: QueryParamsParser;
  private lookupService: LookupService;
  constructor() {
    this.eventRepository = new EventRepository();
    this.queryParams = new QueryParamsParser();
    this.lookupService = new LookupService(
      new OrderRepository(),
      this.eventRepository,
      new TicketRepository(),
    );
  }
  /**
   * @api {get} /event/:eventId 取得單一活動
   * @apiName GetEventById
   * @apiGroup EVENT_桌遊活動
   * @apiVersion 1.2.0
   *
   * @apiParam {String} eventId 活動ID，對應到的是資料庫中idNumber的欄位，會是八碼亂碼，像是"s9d35g6j”
   *
   * @apiError (400) {Object} Error-Response 驗證錯誤
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": "驗證錯誤",
   *       "message": [
   *           "請提供有效的 6位數Id 格式"
   *       ]
   *     }
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 成功訊息
   * @apiSuccess {Object} data 回傳資料
   * @apiSuccess {Object} data.event 活動資訊
   * @apiSuccess {Object} data.store 店家資訊
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "成功",
   *       "message": "成功獲取桌遊活動信息！",
   *       "data": {
   *         "event": {
   *           "idNumber": "xabqk64c",
   *           "storeId": "666fb208d0bb0dbef3fb6c8a",
   *           "isFoodAllowed": true,
   *           "description": "各位辛苦的上班族們！工作了一天，是時候來放鬆一下了。我們準備了一場下班後的桌遊聚會，邀請大家一起來玩桌遊、聊天、釋放壓力。不論你是桌遊高手還是新手，都歡迎來參加，讓我們一起度過一個輕鬆愉快的晚上吧！😊",
   *           "title": "初心者迴戰",
   *           "address": "台北市中山區南京東路三段65號",
   *           "location": {
   *             "lng": 121.538348990278,
   *             "lat": 25.0523119909,
   *             "city": "台北市",
   *             "district": "中山區"
   *           },
   *           "eventStartTime": "2024-08-23 08:00",
   *           "eventEndTime": "2024-09-03 19:00",
   *           "registrationStartTime": "2024-08-13 02:00",
   *           "registrationEndTime": "2024-08-21 06:00",
   *           "maxParticipants": 6,
   *           "minParticipants": 3,
   *           "currentParticipantsCount": 4,
   *           "participationFee": 150,
   *           "eventImageUrl": [
   *             "https://i.imgur.com/DO5TXPS.jpeg"
   *           ]
   *         },
   *         "store": {
   *           "_id": "666fb208d0bb0dbef3fb6c8a",
   *           "name": "桌遊貓貓♡派對樂園♡南京店♡",
   *           "user": "666fb08dd0bb0dbef3fb6c40",
   *           "avatar": "https://i.imgur.com/fiQl2cH.jpeg",
   *           "introduce": "桌遊貓貓♡派對樂園♡南京店!大家好~~我是店長貓貓，喵喵喵!我們致力於提供豐富的桌遊資源，讓每位顧客都能在這裡找到自己喜歡的遊戲。店內的環境舒適且設備齊全，非常適合與朋友或家人一起享受遊戲時光。店內的員工熱情且專業，能夠為顧客提供詳細的遊戲介紹和指導，確保每個人都能輕鬆上手並享受遊戲的樂趣。此外，桌遊領域還定期舉辦各類桌遊活動和比賽，讓顧客能夠結識更多志同道合的朋友，並一起分享遊戲的快樂。",
   *           "address": "台北市中山區南京東路三段65號",
   *           "phone": "0983143829",
   *           "__v": 0
   *         }
   *       }
   *     }
   */
  async getById(id: string): Promise<IEvent> {
    const event = await this.eventRepository.findById(id);
    const eventDTO = new EventDTO(event);
    if (!eventDTO.isPublish) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }
    const owner = await this.lookupService.findStoreByStoreId(eventDTO.storeId);
    return { event: eventDTO.toDetailDTO(), store: owner };
  }
  /**
   * @api {get} /event/ 獲取所有活動
   * @apiName GetAllEvents
   * @apiGroup EVENT_桌遊活動
   * @apiVersion 1.2.0
   *
   * @apiQuery {Number} [limit=12] 一次回傳幾筆資料
   * @apiQuery {Number} [skip=0] 是否要跳過幾筆資料
   * @apiQuery {Number} [formationStatus=0] 全部 = 0, 未滿團 = 1, 已成團 = 2, 已滿團 = 3
   * @apiQuery {Number} [registrationStatus=0] 全部狀態 = 0, 報名時間未開始 = 1, 報名時間內 = 2, 報名時間已結束 = 3
   * @apiQuery {String} [sortBy="eventStartTime"] 排序依據。可選值：participationFee, eventStartTime
   * @apiQuery {String} [sortOrder="asc"] 排序方式。可選值：asc, desc
   * @apiQuery {String} [keyword] 搜尋相關的活動名稱
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Array} data 活動列表
   *
   * @apiError (404) {String} message 未找到活動
   */
  async getAll(queryParams: any): Promise<Partial<EventDTO>[]> {
    const _queryParams = this.queryParams.parse(queryParams);
    const eventData = await this.eventRepository.findAll(_queryParams);
    if (_.isEmpty(eventData)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return _.map(eventData, (event) => new EventDTO(event).toDetailDTO());
  }
  /**
   * @api {post} /event/ 新增活動
   * @apiName CreateEvent
   * @apiGroup EVENT_桌遊活動
   * @apiVersion 1.2.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   *
   * @apiBody {String[]} image 活動圖片 [https://example.com/new_image.jpg]
   * @apiBody {String} title 活動標題 全新桌遊活動
   * @apiBody {String} description 活動介紹 全新桌遊活動
   * @apiBody {Date} eventStartTime 活動開始時間 new Date() | "2024-06-28T18:59:59Z" | 1679500000
   * @apiBody {Date} eventEndTime 活動結束時間 new Date() | "2024-06-28T18:59:59Z" | 1679500000
   * @apiBody {Date} registrationStartTime 報名開始時間 new Date() | "2024-06-28T18:59:59Z" | 1679500000
   * @apiBody {Date} registrationEndTime 報名結束時間 new Date() | "2024-06-28T18:59:59Z" | 1679500000
   * @apiBody {Number} maxParticipants 最大報名人數 5
   * @apiBody {Number} minParticipants 最少參加人數 10
   * @apiBody {Boolean} isFoodAllowed 是否可以飲食 true
   * @apiBody {Number} participationFee 費用 150
   * @apiBody {String} storeId 665185043aae4f4d91cc4c25
   * @apiBody {String} address 地址 高雄市鼓山區美術館路100號4樓
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Object} data 創建的活動資料
   *
   * @apiSuccessExample {json} 成功回應:
   *     {
   *         "message": "建立活動成功，你真棒！",
   *         "status": "已創建"
   *     }
   *
   * @apiError (404) {String} message 未找到活動
   * @apiError (409) {String} message 資料庫操作失敗
   * @apiErrorExample {json} 錯誤回應:
   *     {
   *         "message": "資料庫的相關錯誤:E11000 duplicate key error collection: attack_on_game.events index: title_1_updatedAt_1 dup key: { title: \"週末UNO派對桌遊大狂歡🎉\", updatedAt: \"2024-06-07 22:11\" }",
   *         "status": "資料庫操作失敗"
   *     }
   */
  async create(queryParams: Request): Promise<EventDTO> {
    const store = await this.lookupService.findStoreById(queryParams);
    const _content = new EventDTO({
      ...queryParams.body,
      storeId: store._id,
    }).toDetailDTO();
    const eventDocument = await this.eventRepository.create(_content);
    return new EventDTO(eventDocument);
  }
  /**
   * @api {put} /event/:eventId 更新活動
   * @apiName UpdateEvent
   * @apiGroup EVENT_桌遊活動
   * @apiVersion 1.2.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   * @apiParam {String} eventId 活動ID，對應到的是資料庫中idNumber的欄位，會是八碼亂碼，像是"s9d35g6j”
   * @apiBody {String[]} image 活動圖片
   * @apiBody {String} title 活動標題
   * @apiBody {String} description 活動介紹
   * @apiBody {Date} eventStartTime 活動開始時間
   * @apiBody {Date} eventEndTime 活動結束時間
   * @apiBody {Date} registrationStartTime 報名開始時間
   * @apiBody {Date} registrationEndTime 報名結束時間
   * @apiBody {Number} maxParticipants 最大報名人數
   * @apiBody {Number} minParticipants 最少參加人數
   * @apiBody {Boolean} isFoodAllowed 是否可以飲食
   * @apiBody {Number} participationFee 費用
   * @apiBody {String} storeId 店家ID
   * @apiBody {String} address 地址
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Object} data 更新後的活動資料
   * @apiSuccessExample {json} 成功回應:
   * {
   *     "status": "成功",
   *     "message": "成功更新桌遊活動！",
   *     "data": {
   *         "success": true,
   *         "data": {
   *             "_id": "665fefbffdbd0e9e36120200",
   *             "storeId": "665185043aae4f4d91cc4c25",
   *             "isFoodAllowed": true,
   *             "description": "大小姐rrr，到該睡覺的時間了😊",
   *             "title": "お嬢様, It's time to go to bed",
   *             "address": "高雄市鼓山區美術館路100號4樓",
   *             "eventStartTime": "2024-06-28 19:00",
   *             "eventEndTime": "2024-06-28 22:00",
   *             "registrationStartTime": "2024-06-20 00:00",
   *             "registrationEndTime": "2024-06-28 18:59",
   *             "maxParticipants": 6,
   *             "minParticipants": 3,
   *             "currentParticipantsCount": 0,
   *             "participationFee": 150,
   *             "eventImageUrl": [
   *                 "https://i.ibb.co/7Jj6mxt/DALL-E-2024-06-01-06-59-49-A-wide-screen-ratio-image-of-an-Asian-woman-holding-a-board-game-She-is-s.png"
   *             ]
   *         }
   *     }
   * }
   * @apiError (404) {String} message 未找到活動
   * @apiError (409) {String} message 資料庫操作失敗
   * @apiErrorExample {json} 錯誤回應:
   * {
   *     "status": "驗證錯誤",
   *     "message": [
   *         "地址不能為空哦！",
   *         "地址必須是字串哦！"
   *     ]
   * }
   */
  async update(queryParams: Request): Promise<Partial<EventDTO> | null> {
    const store = await this.lookupService.findStore(queryParams);
    const findEvent = await this.eventRepository.findById(
      queryParams.params.id,
    );
    if (store._id.toString() === findEvent.storeId.toString()) {
      const updateContent = {
        _id: findEvent._id,
        idNumber: findEvent.idNumber,
        storeId: store._id,
        ...queryParams.body,
      };
      const _content = new EventDTO(updateContent);
      const _event = await this.eventRepository.update(_content);
      if (!_.isEmpty(_event)) {
        const _eventDTO = new EventDTO(_event);
        return _eventDTO.toDetailDTO();
      }
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    throw new CustomError(
      CustomResponseType.NOT_FOUND,
      EventResponseType.FAILED_FOUND,
    );
  }
  delete(id: string): Promise<EventDTO | null> {
    throw new Error('Method not implemented.');
  }
  /**
   * @api {get} /event/store/:storeId 取得店家所有活動
   * @apiName GetEventsForStore
   * @apiGroup EVENT_桌遊活動
   * @apiVersion 1.2.0
   *
   * @apiParam {String} storeId 店家ID
   * @apiQuery {Number} [limit=12] 一次回傳幾筆資料
   * @apiQuery {Number} [skip=0] 是否要跳過幾筆資料
   * @apiQuery {Number} [formationStatus=0] 活動成團狀態 (0: 全部, 1: 未滿團, 2: 已成團, 3: 已滿團)
   * @apiQuery {Number} [registrationStatus=0] 報名狀態 (0: 全部狀態, 1: 報名時間未開始, 2: 報名時間內, 3: 報名時間已結束)
   * @apiQuery {String} [sortBy='eventStartTime'] 排序欄位 ('participationFee' 或 'eventStartTime')
   * @apiQuery {String} [sortOrder='asc'] 排序方式 ('asc' 或 'desc')
   * @apiQuery {String} [keyword] 搜尋相關的活動名稱
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Array} data 活動列表
   */
  public async getEventsForStore(
    storeId: Types.ObjectId,
    optionsReq: Request,
  ): Promise<Partial<EventDTO>[]> {
    const queryParams = this.queryParams.parse(optionsReq);
    const eventData = await this.eventRepository.getEventsByStoreId(
      storeId,
      queryParams,
    );
    if (!_.isEmpty(eventData)) {
      const eventDTOs = _.map(eventData, (event) =>
        new EventDTO(event).toDetailDTO(),
      );
      return eventDTOs;
    }
    throw new CustomError(
      CustomResponseType.NOT_FOUND,
      EventResponseType.FAILED_FOUND,
    );
  }
  /**
   * @api {get} /event/:eventId/summary 取得結帳頁的資料
   * @apiName GetSummaryEventById
   * @apiGroup EVENT_桌遊活動
   * @apiVersion 1.2.0
   *
   * @apiParam {String} eventId 活動ID，對應到的是資料庫中idNumber的欄位，會是八碼亂碼，像是"s9d35g6j"
   *
   * @apiError (400) {Object} Error-Response 驗證錯誤
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": "驗證錯誤",
   *       "message": [
   *           "請提供有效的 6位數Id 格式"
   *       ]
   *     }
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 成功訊息
   * @apiSuccess {Object} data 回傳資料
   * @apiSuccess {Boolean} data.success 是否成功
   * @apiSuccess {Object} data.data 活動資訊
   * @apiSuccess {String} data.data.title 活動標題
   * @apiSuccess {String} data.data.address 活動地址
   * @apiSuccess {String} data.data.eventStartTime 活動開始時間
   * @apiSuccess {String} data.data.eventEndTime 活動結束時間
   * @apiSuccess {Number} data.data.maxParticipants 最大參與人數
   * @apiSuccess {Number} data.data.minParticipants 最小參與人數
   * @apiSuccess {Number} data.data.currentParticipantsCount 目前參與人數
   * @apiSuccess {Number} data.data.participationFee 參與費用
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "成功",
   *       "message": "成功獲取桌遊活動信息！",
   *       "data": {
   *         "success": true,
   *         "data": {
   *           "title": "趴踢趴踢",
   *           "address": "高雄市鼓山區美術館路100號4樓",
   *           "eventStartTime": "2024-08-28 19:00",
   *           "eventEndTime": "2024-08-28 22:00",
   *           "maxParticipants": 6,
   *           "minParticipants": 3,
   *           "currentParticipantsCount": 0,
   *           "participationFee": 150
   *         }
   *       }
   *     }
   */
  public async getSummaryEvents(id: string): Promise<Partial<EventDTO>> {
    const event = await this.eventRepository.findById(id);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    const _eventDTO = new EventDTO(event);
    if (_eventDTO.isPublish && _eventDTO.isRegisterable) {
      return _eventDTO.toSummaryDTO();
    }
    throw new CustomError(
      CustomResponseType.UNAUTHORIZED,
      EventResponseType.FAILED_AUTHORIZATION,
    );
  }
}
