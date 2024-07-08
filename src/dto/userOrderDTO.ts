import { OrderDocument } from '@/interfaces/OrderInterface';
import { IPlayer as PlayerDocument } from '@/models/Player';
export class UserOrderDTO {
  idNumber: string;
  registrationCount: number;
  payment: number;
  name: string;
  phone: string;
  notes: string;
  isCommented: boolean;
  paymentStatus: string;
  paymentMethod: string;
  avatar: string;

  constructor(player: PlayerDocument, order: OrderDocument) {
    this.idNumber = order.idNumber;
    this.registrationCount = order.registrationCount;
    this.payment = order.payment + order.discount;
    this.name = order.name || player.name;
    this.avatar = player.avatar;
    this.phone = order.phone || player.phone;
    this.notes = order.notes;
    this.isCommented = order.isCommented;
    this.paymentStatus = order.paymentStatus;
    this.paymentMethod = order.paymentMethod;
  }
  public toDetailDTO(): UserOrderDTO {
    return this;
  }
}
