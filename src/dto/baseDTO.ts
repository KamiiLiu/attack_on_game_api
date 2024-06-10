import { Types } from 'mongoose';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import { nanoid } from 'nanoid';
interface DTO {
  _id: Types.ObjectId;
  idNumber: string;
  createdAt: string;
  updatedAt: string;
}
export class BaseDTO {
  private readonly _id!: Types.ObjectId;
  public readonly idNumber!: string;
  public readonly createdAt?: string;
  public readonly updatedAt?: string;
  constructor(dto: DTO) {
    this._id = dto._id || new Types.ObjectId();
    this.idNumber = dto.idNumber || nanoid();
    this.createdAt =
      dayjs(dto.createdAt).format(TIME_FORMATTER) ||
      dayjs().format(TIME_FORMATTER);
    this.updatedAt =
      dayjs(dto.createdAt).format(TIME_FORMATTER) ||
      dayjs().format(TIME_FORMATTER);
  }
}
