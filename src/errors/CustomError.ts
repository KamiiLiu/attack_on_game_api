import { CustomResponseType } from '@/enums/CustomResponseType';
export class CustomError extends Error {
  code: CustomResponseType;
  msg: string;

  constructor(code: CustomResponseType, msg: string) {
    super(msg);
    this.code = code || CustomResponseType.OTHER;
    this.msg = msg;
  }
}
export const MONGODB_ERROR_MSG = '資料庫的相關錯誤';
export const SPECIAL_ERROR_MSG = '神秘的錯誤，可能是世界奇蹟';
