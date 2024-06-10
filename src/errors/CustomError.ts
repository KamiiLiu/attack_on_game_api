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
