import mongoose, { Schema } from 'mongoose';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import { QrCodeInterface } from '@/interfaces/QrCodeInterface';
const QrCodeSchema: Schema = new Schema({
  qrCodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
    required: true,
  },
  verificationCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
    required: true,
  },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  updatedAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
});
QrCodeSchema.pre('save', function (next) {
  this.updatedAt = dayjs().format(TIME_FORMATTER);
  next();
});
const QrCode = mongoose.model<QrCodeInterface>('QrCode', QrCodeSchema);
export default QrCode;
