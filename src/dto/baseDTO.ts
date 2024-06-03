import { Types } from 'mongoose';
import dayjs from '@/utils/dayjs';
import TIME_FOMMATER from '@/const/TIME_FOMMATER';
interface DTO {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}
export class BaseDTO {
  public readonly _id!: Types.ObjectId;
  public readonly createdAt?: string;
  public readonly updatedAt?: string;
  constructor(dto: DTO) {
    this._id = dto._id || new Types.ObjectId();
    this.createdAt =
      dayjs(dto.createdAt).format(TIME_FOMMATER) ||
      dayjs().format(TIME_FOMMATER);
    this.updatedAt =
      dayjs(dto.createdAt).format(TIME_FOMMATER) ||
      dayjs().format(TIME_FOMMATER);
  }
}
