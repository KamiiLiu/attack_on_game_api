import { Types } from 'mongoose';
import { PaymentStatus, PaymentMethod } from '@/enums/OrderStatus';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { BaseDTO } from '@/dto/baseDTO';
import { DefaultQuery } from '@/enums/OrderStatus';
import dayjs from '@/utils/dayjs';

export class OrderDTO extends BaseDTO {
  readonly eventId: Types.ObjectId;
  readonly playerId: Types.ObjectId;
  readonly payment: number;
  readonly discount: number;
  readonly name: string;
  readonly phone: string;
  readonly registrationCount: number;
  readonly notes: string;
  readonly paymentStatus: PaymentStatus;
  readonly paymentMethod: PaymentMethod;
  readonly isCommented: boolean;
  readonly isDone: boolean;
  constructor(order: OrderDocument) {
    super(order);
    this.idNumber = generateOrderNumber();
    this.eventId = order.eventId;
    this.playerId = order.playerId;
    this.payment = order.payment;
    this.discount = order.discount;
    this.name = order.name;
    this.phone = order.phone;
    this.registrationCount = order.registrationCount;
    this.notes = order.notes;
    this.isCommented = order.isCommented || false;
    this.isDone = order.isDone || false;
    this.paymentStatus = order.paymentStatus || DefaultQuery.Payment_Status;
    this.paymentMethod = order.paymentMethod || DefaultQuery.Payment_Method;
  }
  get getIdNumber() {
    return this.idNumber;
  }
  get getTotalAmount() {
    return this.payment + this.discount;
  }
  public toDetailDTO(): Partial<OrderDocument> {
    return {
      idNumber: this.getIdNumber,
      eventId: this.eventId,
      playerId: this.playerId,
      payment: this.payment,
      discount: this.discount,
      name: this.name,
      phone: this.phone,
      registrationCount: this.registrationCount,
      notes: this.notes,
      paymentStatus: this.paymentStatus,
      paymentMethod: this.paymentMethod,
    };
  }
}
function generateOrderNumber() {
  const today = dayjs().format('YYMMDD');
  const randomStr = Math.random().toString(36).slice(2, 6).toUpperCase();
  const orderNumber = `O-${today}-${randomStr}`;
  return orderNumber;
}
