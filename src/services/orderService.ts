import _ from 'lodash';
import { Request } from 'express';
import { OrderRepository } from '@/repositories/OrderRepository';
import { EventRepository } from '@/repositories/EventRepository';
import { TicketRepository } from '@/repositories/TicketRepository';
import { LookupService } from './LookupService';
import { EventDTO } from '@/dto/eventDTO';
import { OrderDTO } from '@/dto/orderDTO';
import { OrderListDTO } from '@/dto/orderListDTO';
import { TicketDTO } from '@/dto/ticketDTO';
import { CustomError } from '@/errors/CustomError';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { OrderResponseType } from '@/types/OrderResponseType';
import { IStore as StoreDocument } from '@/models/Store';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { EventDocument } from '@/interfaces/EventInterface';
import { TicketDocument } from '@/interfaces/TicketInterface';
import { IPlayer as PlayerDocument } from '@/models/Player';
import { EventResponseType } from '@/types/EventResponseType';
import { TicketResponseType } from '@/types/TicketResponseType';
import Player from '@/models/Player';
import { Types } from 'mongoose';
import { Status } from '@/enums/OrderStatus';
import { IQuery } from '@/enums/OrderRequest';
interface IGetByIdResult {
  event: Partial<EventDocument>;
  order: Partial<OrderDocument>;
  tickets: Partial<TicketDocument>[];
  store: StoreDocument;
}
const SKIP = 0;
const LIMIT = 100;
export class OrderService {
  private orderRepository: OrderRepository;
  private lookupService: LookupService;
  private eventRepository: EventRepository;
  private ticketRepository: TicketRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
    this.eventRepository = new EventRepository();
    this.ticketRepository = new TicketRepository();
    this.lookupService = new LookupService(
      this.orderRepository,
      new EventRepository(),
      new TicketRepository(),
    );
  }
  /**
   * @api {post} /order 建立訂單（同時會產生票券）
   * @apiName CreateOrder
   * @apiGroup ORDER_買家訂單管理
   * @apiVersion 1.4.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   *
   * @apiBody {String} eventId 活動ID
   * @apiBody {Number} payment 支付金額
   * @apiBody {Number} discount 折扣金額
   * @apiBody {String} name 訂購人姓名
   * @apiBody {String} phone 訂購人電話
   * @apiBody {Number} registrationCount 報名人數
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Object} data 創建的訂單資料
   *
   * @apiSuccessExample {json} 成功回應:
   * {
   *     "status": "成功",
   *     "message": "建立訂單成功，你真棒！",
   *     "data": {
   *         // 訂單資料
   *     }
   * }
   *
   * @apiError (409) {String} status 狀態
   * @apiError (409) {String} message 錯誤訊息
   * @apiErrorExample {json} 錯誤回應:
   * {
   *     "status": "資料庫操作失敗",
   *     "message": "資料庫的相關錯誤:E11000 duplicate key error collection: attack_on_game.orders index: eventId_1_playerId_1 dup key: { eventId: ObjectId('666be8d5aee2a0e6f04994bc'), playerId: ObjectId('66691f74e15f9ddc24656021') }"
   * }
   */
  public async create(req: Request): Promise<OrderDocument> {
    const { eventId } = req.body;

    const [event, player] = await Promise.all([
      this.lookupService.findEventById(eventId),
      this.lookupService.findPlayer(req),
    ]);

    const orderDTO = this.createOrderDTO(req.body, event, player);
    this.validateOrder(event, orderDTO);

    const order = await this.createOrder(orderDTO);
    await this.updateEventParticipants(event, orderDTO);
    await this.createTickets(order._id, player._id, orderDTO.registrationCount);

    return order;
  }

  /**
   * @api {get} /order/:idNumber 獲取單一訂單詳細資訊
   * @apiName GetOrderById
   * @apiGroup ORDER_買家訂單管理
   * @apiVersion 1.4.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   *
   * @apiParam {String} idNumber 訂單ID，暫定格式o-240614-3me5(o-日期-隨機數)
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Object} data 訂單詳細資料
   * @apiSuccess {Object} data.event 活動摘要資訊
   * @apiSuccess {Object} data.order 訂單詳細資訊
   * @apiSuccess {Array} data.tickets 票券資訊列表
   * @apiSuccess {Object} data.store 店家資訊
   *
   * @apiSuccessExample {json} 成功回應:
   *     {
   *       "status": "成功",
   *       "message": "成功獲取桌遊訂單信息！",
   *       "data": {
   *         "event": {
   *           "idNumber": "mbao6cxw",
   *           "title": "😈激動人心的週六陣營對決桌遊大戰等你來挑戰！無經驗可！包含完整新手教學30min😈",
   *           "address": "台北市中山區南京東路三段65號",
   *           "location": {
   *             "city": "台北市",
   *             "district": "中山區",
   *             "lng": 121.512482017983,
   *             "lat": 25.039969009832
   *           },
   *           "eventStartTime": "2024-09-06 22:00",
   *           "eventEndTime": "2024-09-09 00:00",
   *           "maxParticipants": 23,
   *           "minParticipants": 4,
   *           "currentParticipantsCount": 23,
   *           "participationFee": 300
   *         },
   *         "order": {
   *           "idNumber": "o-240713-zfd5",
   *           "eventId": "667e6d137a3b00143beaec3e",
   *           "playerId": "666fcdb840b972eeb8db5f3d",
   *           "payment": 300,
   *           "discount": 0,
   *           "name": "泥土在下雨過後散發的好聞的氣味",
   *           "phone": "0962844674",
   *           "registrationCount": 1,
   *           "email": "Henry2020@gmail.com",
   *           "notes": "",
   *           "paymentStatus": "completed",
   *           "paymentMethod": "credit_card",
   *           "status": "即將開始"
   *         },
   *         "tickets": [
   *           {
   *             "orderId": "6692550dae81dd53596fc027",
   *             "idNumber": "ticket-240713-4rqq",
   *             "qrCodeStatus": "尚未使用",
   *             "qrCodeUsedTime": ""
   *           }
   *         ],
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
   *
   * @apiError (400) {String} status 狀態
   * @apiError (400) {String} message 錯誤訊息
   * @apiErrorExample {json} 錯誤回應:
   * {
   *     "status": "驗證錯誤",
   *     "message": "您沒有權限查看此訂單"
   * }
   */
  public async getById(queryParams: Request): Promise<IGetByIdResult> {
    const [player, order] = await Promise.all([
      this.lookupService.findPlayer(queryParams),
      this.lookupService.findOrder(queryParams.params.orderId),
    ]);

    if (order.playerId.toString() !== player._id.toString()) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.FAILED_AUTHORIZATION,
      );
    }

    const eventId = order.eventId;
    if (!eventId) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.FAILED_VALIDATION_EVENT_ID,
      );
    }

    const event = await this.lookupService.findEventByDbId(eventId);

    const targetOrderDTO = new OrderDTO(order);
    const targetEventDTO = new EventDTO(event);
    const store = await this.lookupService.findStoreByStoreId(
      targetEventDTO.storeId,
    );
    if (targetOrderDTO.status === Status.CANCEL) {
      return {
        event: targetEventDTO.toSummaryDTO(),
        order: targetOrderDTO.toDetailDTO(),
        tickets: [],
        store,
      };
    }

    const ticketList = await this.lookupService.findTickets(
      order.id,
      player._id,
    );
    const targetTicketsDTO = ticketList.map((ticket) =>
      new TicketDTO(ticket).toDetailDTO(),
    );

    return {
      event: targetEventDTO.toSummaryDTO(),
      order: targetOrderDTO.toDetailDTO(),
      tickets: targetTicketsDTO,
      store,
    };
  }

  /**
   * @api {get} /order/list 獲取所有訂單
   * @apiName GetAllOrders
   * @apiGroup ORDER_買家訂單管理
   * @apiVersion 1.4.0
   * @apiHeader {String} Authorization Bearer token {{jwtToken}}
   *
   * @apiQuery {Number} [limit=100] 每頁顯示的訂單數量
   * @apiQuery {Number} [skip=0] 跳過的訂單數量
   * @apiQuery {String} [status] 訂單狀態 (可選)
   *
   * @apiSuccess {String} status 狀態
   * @apiSuccess {String} message 訊息
   * @apiSuccess {Array} data 訂單列表
   * @apiSuccess {String} data.idNumber 訂單編號
   * @apiSuccess {String} data.title 活動標題
   * @apiSuccess {String} data.eventStartTime 活動開始時間
   * @apiSuccess {String} data.eventEndTime 活動結束時間
   * @apiSuccess {Array} data.eventImageUrl 活動圖片URL列表
   * @apiSuccess {Number} data.totalAmount 訂單總金額
   * @apiSuccess {Number} data.registrationCount 報名人數
   * @apiSuccess {String} data.notes 備註
   * @apiSuccess {String} data.paymentStatus 付款狀態
   * @apiSuccess {String} data.paymentMethod 付款方式
   * @apiSuccess {Boolean} data.isCommented 是否已評論
   * @apiSuccess {String} data.status 訂單狀態
   *
   * @apiSuccessExample {json} 成功回應:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "成功",
   *       "message": "成功獲取桌遊訂單信息！",
   *       "data": [
   *         {
   *           "idNumber": "o-240713-zfd5",
   *           "title": "😈激動人心的週六陣營對決桌遊大戰等你來挑戰！無經驗可！包含完整新手教學30min😈",
   *           "eventStartTime": "2024-09-06 22:00",
   *           "eventEndTime": "2024-09-09 00:00",
   *           "eventImageUrl": [
   *             "https://i.imgur.com/L3BGkky.jpeg"
   *           ],
   *           "totalAmount": 300,
   *           "registrationCount": 1,
   *           "notes": "",
   *           "paymentStatus": "completed",
   *           "paymentMethod": "credit_card",
   *           "isCommented": false,
   *           "status": "即將開始"
   *         }
   *       ]
   *     }
   */
  async getAll(queryParams: Request): Promise<OrderListDTO[]> {
    const player = await this.findPlayer(queryParams);
    const { limit = LIMIT, status, skip = SKIP } = queryParams.query as IQuery;
    const orderList = await this.lookupService.findOrderList(player._id, {
      limit,
      status,
      skip,
    });
    console.log(orderList.length);
    const eventIds = orderList.map((x) => x.eventId);
    const eventList = await this.eventRepository.getEventsData(
      {
        _id: { $in: eventIds },
      },
      0,
      100,
    );

    const result = orderList
      .map((order) => {
        const findEvent = eventList.find(
          (event) => event._id.toString() === order.eventId.toString(),
        );
        if (findEvent) return new OrderListDTO(order, findEvent);
        return undefined;
      })
      .filter((x): x is OrderListDTO => x !== undefined);
    console.log(result.length);
    return result;
  }

  private async findPlayer(queryParams: Request): Promise<PlayerDocument> {
    const player = await Player.findOne({ user: queryParams.user });
    if (_.isEmpty(player)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.ERROR_PLAYER_FOUND,
      );
    }
    return player;
  }

  private async findOrder(orderId: string): Promise<OrderDocument> {
    const order = await this.orderRepository.findById(orderId);
    if (_.isEmpty(order)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }
    return order;
  }
  private async findOrderList(
    playerId: Types.ObjectId,
    query: IQuery,
  ): Promise<OrderDTO[]> {
    const queryObject: any = {
      playerId,
    };
    if (query.status) {
      queryObject.status = query.status;
    }
    const LIMIT_Q = query.limit ?? LIMIT;
    const order = await this.orderRepository.findAll(queryObject, {
      limit: LIMIT_Q,
      skip: query.skip || SKIP,
    });
    console.log(order.length);
    if (_.isEmpty(order)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        OrderResponseType.FAILED_FOUND,
      );
    }
    return order.map((order) => new OrderDTO(order));
  }

  private async findEventByDbId(
    eventId: Types.ObjectId,
  ): Promise<Partial<EventDocument>> {
    const event = await this.eventRepository.findByDBId(eventId);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return event;
  }
  private async findEventById(
    eventId: string,
  ): Promise<Partial<EventDocument>> {
    const event = await this.eventRepository.findById(eventId);
    if (_.isEmpty(event)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        EventResponseType.FAILED_FOUND,
      );
    }
    return event;
  }
  private async findTickets(
    orderId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<TicketDocument[]> {
    const ticketList = await this.ticketRepository.findAll(orderId, userId);
    if (_.isEmpty(ticketList)) {
      throw new CustomError(
        CustomResponseType.NOT_FOUND,
        TicketResponseType.FAILED_FOUND,
      );
    }
    return ticketList;
  }
  private createOrderDTO(
    body: any,
    event: Partial<EventDocument>,
    player: PlayerDocument,
  ): OrderDTO {
    return new OrderDTO({
      ...body,
      eventId: event._id,
      playerId: player._id,
    });
  }

  private validateOrder(
    event: Partial<EventDocument>,
    orderDTO: OrderDTO,
  ): void {
    const targetEventDTO = new EventDTO(event);
    if (!targetEventDTO.isRegisterable) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_REGISTRATION_PERIOD,
      );
    }
    if (
      targetEventDTO.participationFee * orderDTO.registrationCount !==
      orderDTO.getTotalAmount
    ) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_MONEY,
      );
    }
    if (targetEventDTO.availableSeat < orderDTO.registrationCount) {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        OrderResponseType.CREATED_ERROR_EXCEEDS_CAPACITY,
      );
    }
  }

  private async createOrder(orderDTO: OrderDTO): Promise<OrderDocument> {
    return await this.orderRepository.create(orderDTO.toDetailDTO());
  }

  private async updateEventParticipants(
    event: Partial<EventDocument>,
    orderDTO: OrderDTO,
  ): Promise<void> {
    const targetEventDTO = new EventDTO(event);
    const addedSeat =
      targetEventDTO.currentParticipantsCount + orderDTO.registrationCount;
    await this.eventRepository.updateParticipantsCount(
      targetEventDTO,
      addedSeat,
    );
  }

  private async createTickets(
    orderId: Types.ObjectId,
    userId: Types.ObjectId,
    registrationCount: number,
  ): Promise<void> {
    const ticketPromises = [];
    for (let index = 0; index < registrationCount; index++) {
      ticketPromises.push(this.ticketRepository.create(orderId, userId));
    }
    await Promise.all(ticketPromises);
  }
}

export default OrderService;
