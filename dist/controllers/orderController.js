"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { validationResult } from 'express-validator';
// import Ticket from '@/models/Ticket';
// import Order from '@/models/Order';
// import Player from '@/models/Player';
// import Event from '@/models/Event';
Object.defineProperty(exports, "__esModule", { value: true });
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
const OrderController = {};
exports.default = OrderController;
//# sourceMappingURL=orderController.js.map