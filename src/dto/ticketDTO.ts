import { TicketDocument } from '@/interfaces/TicketInterface';
import { BaseDTO } from '@/dto/baseDTO';
import { Types } from 'mongoose';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import dayjs from '@/utils/dayjs';
import { TicketStatus } from '@/enums/TicketStatus';
export class TicketDTO extends BaseDTO {
  readonly orderId: Types.ObjectId;
  readonly qrCodeStatus: TicketStatus;
  readonly playerId: Types.ObjectId;
  readonly qrCodeUsedTime: string;
  constructor(dto: Partial<TicketDocument>) {
    const dtoWithId = {
      _id: dto._id || new Types.ObjectId(),
      idNumber: dto.idNumber ?? generateTicketNumber(),
      createdAt:
        dayjs(dto.createdAt).format(TIME_FORMATTER) ||
        dayjs().format(TIME_FORMATTER),
      updatedAt:
        dayjs(dto.createdAt).format(TIME_FORMATTER) ||
        dayjs().format(TIME_FORMATTER),
    };
    super(dtoWithId);
    this.orderId = dto.orderId || new Types.ObjectId();
    this.playerId = dto.playerId || new Types.ObjectId();
    this.qrCodeStatus = dto.qrCodeStatus || TicketStatus.PENDING;
    this.qrCodeUsedTime = dto.qrCodeUsedTime || '';
  }
  public toDetailDTO(): Partial<TicketDocument> {
    return {
      orderId: this.orderId,
      idNumber: this.idNumber,
      qrCodeStatus: this.qrCodeStatus,
      qrCodeUsedTime: this.qrCodeUsedTime,
    };
  }
}
function generateTicketNumber() {
  const today = dayjs().format('YYMMDD');
  const randomStr = Math.random().toString(36).slice(2, 6).toLowerCase();
  const orderNumber = `ticket-${today}-${randomStr}`;
  return orderNumber;
}
