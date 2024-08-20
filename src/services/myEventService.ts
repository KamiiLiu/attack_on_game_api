import { Request } from 'express';
import { EventRepository } from '@/repositories/EventRepository';
import { LookupService } from './LookupService';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { EventResponseType } from '@/types/EventResponseType';
import { EventDTO } from '@/dto/eventDTO';
import { EventDocument } from '@/interfaces/EventInterface';
import { OrderRepository } from '@/repositories/OrderRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { UserOrderDTO } from '@/dto/userOrderDTO';
import { TicketCodeDTO } from '@/dto/TicketCodeDTO';
import { TicketStatus } from '@/enums/TicketStatus';
import _ from 'lodash';
interface IUserOrderDTO {
  event: Partial<EventDocument>;
  user: UserOrderDTO[];
}
export class MyEventService {
  private eventRepository: EventRepository;
  private lookupService: LookupService;
  private orderRepository: OrderRepository;
  private ticketRepository: TicketRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
    this.lookupService = new LookupService(
      this.orderRepository,
      this.eventRepository,
      new TicketRepository(),
    );
  }

  /**
   * @api {get} /myEvent/:myEventId/player 取得單一活動訂單資訊
   * @apiName GetOrderByEventId
   * @apiGroup MyEvent_賣家活動管理
   * @apiVersion 1.3.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   * @apiParam {String} myEventId 活動ID
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Object} data 活動訂單資料
   * @apiSuccess {Object} data.event 活動資訊
   * @apiSuccess {String} data.event.idNumber 活動ID
   * @apiSuccess {String} data.event.storeId 商店ID
   * @apiSuccess {Boolean} data.event.isFoodAllowed 是否允許攜帶食物
   * @apiSuccess {String} data.event.description 活動描述
   * @apiSuccess {String} data.event.title 活動標題
   * @apiSuccess {String} data.event.address 活動地址
   * @apiSuccess {String} data.event.eventStartTime 活動開始時間
   * @apiSuccess {String} data.event.eventEndTime 活動結束時間
   * @apiSuccess {String} data.event.registrationStartTime 報名開始時間
   * @apiSuccess {String} data.event.registrationEndTime 報名結束時間
   * @apiSuccess {Number} data.event.maxParticipants 最大參與人數
   * @apiSuccess {Number} data.event.minParticipants 最小參與人數
   * @apiSuccess {Number} data.event.currentParticipantsCount 當前參與人數
   * @apiSuccess {Number} data.event.participationFee 參與費用
   * @apiSuccess {String[]} data.event.eventImageUrl 活動圖片URL列表
   * @apiSuccess {Object[]} data.user 用戶訂單資訊
   * @apiSuccess {String} data.user.idNumber 訂單ID
   * @apiSuccess {Number} data.user.registrationCount 報名人數
   * @apiSuccess {Number} data.user.payment 支付金額
   * @apiSuccess {String} data.user.name 用戶名稱
   * @apiSuccess {String} data.user.phone 用戶電話
   * @apiSuccess {String} data.user.notes 備註
   * @apiSuccess {Boolean} data.user.isCommented 是否已評論
   * @apiSuccess {String} data.user.paymentStatus 支付狀態
   * @apiSuccess {String} data.user.paymentMethod 支付方式
   * @apiSuccessExample {json} 成功回應:
   *     HTTP/1.1 200 OK
   * {
   *     "status": "成功",
   *     "message": "請求成功",
   *     "data": {
   *         "event": {
   *             "idNumber": "7u5xdkmi",
   *             "storeId": "666fb04ed0bb0dbef3fb6c28",
   *             "isFoodAllowed": true,
   *             "description": "準備好迎接撲克牌的瘋狂挑戰了嗎？快來參加我們的週六撲克牌瘋狂大戰吧！不管你是撲克牌小白還是老手，都能在這裡找到無限的樂趣和挑戰。我們準備了豐富的獎品，還有免費的零食和飲料等你來享用。帶上你的好運和牌技，來這裡和小夥伴們一起玩得開心、贏得精彩！",
   *             "title": "週六撲克牌瘋狂大戰",
   *             "address": "台中市西屯區中港路二段185號",
   *             "eventStartTime": "2024-07-01 18:00",
   *             "eventEndTime": "2024-07-02 02:00",
   *             "registrationStartTime": "2024-05-30 08:00",
   *             "registrationEndTime": "2024-07-01 07:59",
   *             "maxParticipants": 8,
   *             "minParticipants": 3,
   *             "currentParticipantsCount": 4,
   *             "participationFee": 250,
   *             "eventImageUrl": [
   *                 "https://i.ibb.co/gtmkKhQ/yudai-9s50005-TP-V.jpg"
   *             ]
   *         },
   *         "user": [
   *             {
   *                 "idNumber": "o-240617-znl5",
   *                 "registrationCount": 3,
   *                 "payment": 750,
   *                 "name": "林捷克",
   *                 "phone": "0923456782",
   *                 "notes": "",
   *                 "isCommented": false,
   *                 "paymentStatus": "pending",
   *                 "paymentMethod": "credit_card"
   *             },
   *             {
   *                 "idNumber": "o-240617-lmu9",
   *                 "registrationCount": 1,
   *                 "payment": 250,
   *                 "name": "Frank2930",
   *                 "phone": "0923456786",
   *                 "notes": "",
   *                 "isCommented": false,
   *                 "paymentStatus": "pending",
   *                 "paymentMethod": "credit_card"
   *             }
   *         ]
   *     }
   * }
   */
  public async getOrderByEventId(req: Request): Promise<IUserOrderDTO> {
    const store = await this.lookupService.findStore(req);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store._id,
      { idNumber: req.params.eventId },
    );

    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }

    const eventDTO = new EventDTO(eventData[0]);
    const buyers = await this.orderRepository.findAllBuyers(eventDTO._id);

    const buyersWithTickets: UserOrderDTO[] = await Promise.all(
      buyers.map(async (buyer) => {
        const player = await this.lookupService.findPlayerById(buyer.playerId);
        return new UserOrderDTO(player, buyer);
      }),
    );

    return {
      event: eventDTO.toDetailDTO(),
      user: buyersWithTickets,
    };
  }
  /**
   * @api {get} /myEvent/:myEventId/qr-code 取得活動qr-code資訊
   * @apiName GetTicketByEventId
   * @apiGroup MyEvent_賣家活動管理
   * @apiVersion 1.3.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   * @apiParam {String} myEventId 活動ID
   *
   * @apiSuccess {Object} data 回應資料
   * @apiSuccess {Object} data.event 活動資訊
   * @apiSuccess {Array} data.user 使用者資訊列表
   * @apiSuccessExample {json} 成功回應:
   *     HTTP/1.1 200 OK
   *     {
   *         "status": "成功",
   *         "message": "請求成功",
   *         "data": {
   *             "event": {
   *                 "idNumber": "sktxsb8a",
   *                 "storeId": "6688f60f9e4dbc254973fa12",
   *                 "isFoodAllowed": true,
   *                 "description": "16 週企業專題培訓課，帶你做產品，協助 1~3 年工作經驗的前端工程師職涯加速。",
   *                 "title": "【百人團建】如果是勇者辛梅爾的話，一定還會2刷直播班的吧",
   *                 "address": "台北市松山區南京東路三段287號9樓",
   *                 "location": {
   *                     "city": "台北市",
   *                     "district": "中正區",
   *                     "lng": 121.512482017983,
   *                     "lat": 25.039969009832
   *                 },
   *                 "eventStartTime": "2024-08-31 16:00",
   *                 "eventEndTime": "2024-09-09 00:00",
   *                 "registrationStartTime": "2024-08-12 03:00",
   *                 "registrationEndTime": "2024-08-19 04:00",
   *                 "maxParticipants": 40,
   *                 "minParticipants": 1,
   *                 "currentParticipantsCount": 40,
   *                 "participationFee": 11999,
   *                 "eventImageUrl": [
   *                     "https://i.imgur.com/f8EOHe8.jpeg"
   *                 ]
   *             },
   *             "user": [
   *                 {
   *                     "name": "不要問 你會怕",
   *                     "avatar": "https://i.imgur.com/KNYoIIQ.png",
   *                     "qrCodeStatus": "尚未使用",
   *                     "qrCodeUsedTime": "",
   *                     "idNumber": "ticket-240713-87de"
   *                 }
   *             ]
   *         }
   *     }
   */
  public async getTicketByEventId(req: Request): Promise<TicketCodeDTO[]> {
    const store = await this.lookupService.findStore(req);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store._id,
      { idNumber: req.params.eventId },
    );

    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }

    const eventDTO = new EventDTO(eventData[0]);
    const buyers = await this.orderRepository.findAllBuyers(eventDTO._id);

    const buyerIds = buyers.map((buyer) => buyer.playerId);
    const playerIds = buyers.map((buyer) => buyer.playerId);

    const [players, allTickets] = await Promise.all([
      this.lookupService.findPlayersByIds(playerIds),
      this.ticketRepository.findTicketsByBuyerIds(buyerIds),
    ]);
    const playersMap = new Map(
      players.map((player) => [player._id.toString(), player]),
    );
    const ticketsMap = new Map(
      buyers.map((buyer) => [
        buyer._id.toString(),
        allTickets.filter(
          (ticket) => ticket.orderId.toString() === buyer._id.toString(),
        ),
      ]),
    );
    const buyersWithTickets: TicketCodeDTO[] = buyers
      .filter((buyer) => playersMap.has(buyer.playerId.toString()))
      .flatMap((buyer) => {
        const player = playersMap.get(buyer.playerId.toString());
        const buyerTickets = ticketsMap.get(buyer._id.toString()) || [];
        return buyerTickets.map(
          (ticket) => new TicketCodeDTO(ticket, buyer, player!),
        );
      });
    return buyersWithTickets;
  }
  /**
   * @api {get} /myevent/list 取得商家所有販售活動資料
   * @apiName GetAllEventOrder
   * @apiGroup MyEvent_賣家活動管理
   * @apiVersion 1.3.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Object[]} data 活動資料列表
   * @apiSuccess {String} data.idNumber 活動ID
   * @apiSuccess {String} data.storeId 商店ID
   * @apiSuccess {Boolean} data.isFoodAllowed 是否允許攜帶食物
   * @apiSuccess {String} data.description 活動描述
   * @apiSuccess {String} data.title 活動標題
   * @apiSuccess {String} data.address 活動地址
   * @apiSuccess {String} data.eventStartTime 活動開始時間
   * @apiSuccess {String} data.eventEndTime 活動結束時間
   * @apiSuccess {String} data.registrationStartTime 報名開始時間
   * @apiSuccess {String} data.registrationEndTime 報名結束時間
   * @apiSuccess {Number} data.maxParticipants 最大參與人數
   * @apiSuccess {Number} data.minParticipants 最小參與人數
   * @apiSuccess {Number} data.currentParticipantsCount 當前參與人數
   * @apiSuccess {Number} data.participationFee 參與費用
   * @apiSuccess {String[]} data.eventImageUrl 活動圖片URL列表
   *
   * @apiSuccessExample {json} 成功回應:
   *     HTTP/1.1 200 OK
   *     {
   *         "status": "成功",
   *         "message": "請求成功",
   *         "data": [
   *             {
   *                 "idNumber": "7u5xdkmi",
   *                 "storeId": "666fb04ed0bb0dbef3fb6c28",
   *                 "isFoodAllowed": true,
   *                 "description": "準備好迎接撲克牌的瘋狂挑戰了嗎？快來參加我們的週六撲克牌瘋狂大戰吧！不管你是撲克牌小白還是老手，都能在這裡找到無限的樂趣和挑戰。我們準備了豐富的獎品，還有免費的零食和飲料等你來享用。帶上你的好運和牌技，來這裡和小夥伴們一起玩得開心、贏得精彩！",
   *                 "title": "週六撲克牌瘋狂大戰",
   *                 "address": "台中市西屯區中港路二段185號",
   *                 "eventStartTime": "2024-07-01 18:00",
   *                 "eventEndTime": "2024-07-02 02:00",
   *                 "registrationStartTime": "2024-05-30 08:00",
   *                 "registrationEndTime": "2024-07-01 07:59",
   *                 "maxParticipants": 8,
   *                 "minParticipants": 3,
   *                 "currentParticipantsCount": 4,
   *                 "participationFee": 250,
   *                 "eventImageUrl": [
   *                     "https://i.ibb.co/gtmkKhQ/yudai-9s50005-TP-V.jpg"
   *                 ]
   *             }
   *         ]
   *     }
   *
   * @apiError (401) {String} message 未授權
   * @apiError (404) {String} message 未找到活動
   * @apiErrorExample {json} 錯誤回應:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *         "status": "未授權",
   *         "message": "您沒有權限執行此操作"
   *     }
   */
  public async getAllEventOrder(
    queryParams: Request,
  ): Promise<Partial<EventDTO>[]> {
    const store = await this.lookupService.findStore(queryParams);
    const eventData = await this.eventRepository.getEventsByAprilStoreId(
      store._id,
    );

    if (!eventData.length) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }

    return eventData.map((event) => new EventDTO(event).toDetailDTO());
  }
  /**
   * @api {post} /myEvent/:myEventId/validate-qr-code 驗證QR碼
   * @apiName ValidateQrCode
   * @apiGroup MyEvent_賣家活動管理
   * @apiVersion 1.5.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   * @apiParam {String} myEventId 活動ID
   * @apiBody {String[]} tickets QR碼票券ID列表
   *
   * @apiSuccess {Boolean} data 驗證結果
   * @apiSuccessExample {json} 成功回應:
   *     HTTP/1.1 200 OK
   *     {
   *         "status": "成功",
   *         "message": "QR碼驗證成功",
   *     }
   * @apiError (401) {String} message 未授權
   * @apiError (404) {String} message 未找到活動或票券
   * @apiErrorExample {json} 錯誤回應:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *         "status": "未授權",
   *         "message": "您沒有權限執行此操作"
   *     }
   */
  public async validateQrCode(queryParams: Request): Promise<Partial<boolean>> {
    const store = await this.lookupService.findStore(queryParams);
    const ticketsByStore = await this.getTicketByEventId(queryParams);
    const event = await this.eventRepository.findById(
      queryParams.params.eventId,
    );

    if (event.storeId.toString() !== store._id.toString()) {
      throw new CustomError(
        CustomResponseType.UNAUTHORIZED,
        EventResponseType.FAILED_AUTHORIZATION,
      );
    }

    const tickets: string[] = queryParams.body.tickets;
    const qrCodeList: string[] = [];

    tickets.forEach((x) => {
      const targetTicket = ticketsByStore.find((t) => t.idNumber === x);
      if (
        !_.isEmpty(targetTicket) &&
        targetTicket.qrCodeStatus === TicketStatus.PENDING
      ) {
        qrCodeList.push(targetTicket.idNumber);
      }
    });

    if (!_.isEmpty(qrCodeList)) {
      await this.ticketRepository.updateStatus(qrCodeList);
    }

    return true;
  }
}

export default MyEventService;
