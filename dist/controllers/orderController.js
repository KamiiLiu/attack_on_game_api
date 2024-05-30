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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("@/services/orderService"));
const responseHandlers_1 = require("@/utils/responseHandlers");
const OrderController = {
    getOrderList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield orderService_1.default.findEventList(req.query);
                console.log('xxx');
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = '665185043aae4f4d91cc4c25';
                const eventData = Object.assign(Object.assign({}, req.body), { storeId });
                const result = yield orderService_1.default.createEvent(eventData);
                (0, responseHandlers_1.handleResult)(result, res);
            }
            catch (error) {
                (0, responseHandlers_1.handleServerError)(error);
            }
        });
    },
};
exports.default = OrderController;
// import orderValidator from '@/validators/orderValidator';
// const OrderController = {
//   validate: orderValidator,
//   async getCartItems(req: Request, res: Response, next: NextFunction) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const { eventId } = req.params;
//       const event = await Event.findById(eventId);
//       if (!event) {
//         return res.status(404).json({ message: '找不到这个活动哦！' });
//       }
//       if (event.status === '') {
//         return res.status(404).json({ message: '找不到这个活动哦！' });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },
//   async createOrder(req: Request, res: Response, next: NextFunction) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const { playerId, eventId, quantity, discount, payment } = req.body;
//       const player = await Player.findById(playerId);
//       if (!player) {
//         return res.status(404).json({ message: '找不到这个小伙伴哦！' });
//       }
//       const event = await Event.findById(eventId);
//       if (!event) {
//         return res.status(404).json({ message: '找不到这个活动哦！' });
//       }
//       const eventPayment: number = event.participationFee * quantity;
//       const totalPayment = payment + discount;
//       if (eventPayment !== totalPayment) {
//         return res.status(400).json({ message: '金額狀況不正確' });
//       }
//       if (eventPayment !== totalPayment) {
//         //TODO: 超過最大人數
//       }
//       const order = new Order({
//         playerId,
//         payment,
//         discount,
//         createdAt: new Date(),
//       });
//       await order.save();
//       const ticket = new Ticket({
//         orderId: order._id,
//         eventId,
//         quantity,
//         createdAt: new Date(),
//       });
//       await ticket.save();
//       return res.status(201).json({ message: '建立票券成功' });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async getById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         res.status(404).json({ status: false, message: 'User not found' });
//         return;
//       }
//       res.status(200).json({ status: true, data: user });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
//# sourceMappingURL=orderController.js.map