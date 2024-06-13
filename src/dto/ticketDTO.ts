import { TicketDocument } from '@/interfaces/TicketInterface';
import { BaseDTO } from '@/dto/baseDTO';
import { Types } from 'mongoose';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import dayjs from '@/utils/dayjs';
import { generateCustomNanoId } from '@/utils/generateCustomNanoId';
export class TicketDTO extends BaseDTO {
  readonly orderIdNumber: string;
  readonly isQrCodeUsed: boolean;
  readonly qrCodeUrl: string;
  readonly playerId: Types.ObjectId;
  constructor(dto: Partial<TicketDocument>) {
    const dtoWithId = {
      _id: dto._id || new Types.ObjectId(),
      idNumber: dto.idNumber || generateCustomNanoId(),
      createdAt:
        dayjs(dto.createdAt).format(TIME_FORMATTER) ||
        dayjs().format(TIME_FORMATTER),
      updatedAt:
        dayjs(dto.createdAt).format(TIME_FORMATTER) ||
        dayjs().format(TIME_FORMATTER),
    };
    super(dtoWithId);
    this.orderIdNumber = dto.orderIdNumber || '';
    this.playerId = dto.playerId || new Types.ObjectId();
    this.isQrCodeUsed = dto.isQrCodeUsed || false;
    this.qrCodeUrl = dto.qrCodeUrl || '';
  }
  public toDetailDTO(): Partial<TicketDTO> {
    return {
      orderIdNumber: this.orderIdNumber,
      isQrCodeUsed: this.isQrCodeUsed,
      qrCodeUrl: this.qrCodeUrl,
    };
  }
}
