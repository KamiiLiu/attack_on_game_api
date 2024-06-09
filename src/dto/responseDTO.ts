import { CustomResponseType } from '@/enums/CustomResponseType';
import { SPECIAL_ERROR_MSG } from '@/errors/CustomError';
export class ResponseDTO {
  public readonly status: CustomResponseType = CustomResponseType.SYSTEM_ERROR;
  public readonly message: string = SPECIAL_ERROR_MSG;
  public readonly data: unknown = null;

  constructor(options: {
    status: CustomResponseType;
    message: string;
    data?: unknown;
  }) {
    this.status = options.status || this.status;
    this.message = options.message || this.message;
    this.data = options.data || this.data;
  }
}
