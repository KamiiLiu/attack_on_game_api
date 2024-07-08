import { TicketDocument } from '@/interfaces/TicketInterface';
import { OrderDocument } from '@/interfaces/OrderInterface';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import dayjs from '@/utils/dayjs';
import { IPlayer as PlayerDocument } from '@/models/Player';
import { TicketStatus } from '@/enums/TicketStatus';
export class TicketCodeDTO {
  readonly name: string;
  readonly avatar: string;
  readonly idNumber: string;
  readonly qrCodeStatus: string;
  readonly qrCodeUsedTime: string;
  constructor(
    ticketDto: TicketDocument,
    orderDto: OrderDocument,
    playDto: PlayerDocument,
  ) {
    this.name = orderDto.name || '';
    this.avatar = playDto.avatar || '';
    this.qrCodeStatus = ticketDto.qrCodeStatus || TicketStatus.PENDING;
    this.qrCodeUsedTime =
      ticketDto.qrCodeUsedTime || dayjs().format(TIME_FORMATTER);
    this.idNumber = ticketDto.idNumber || '';
  }
  public toDetailDTO(): TicketCodeDTO {
    return this;
  }
}
