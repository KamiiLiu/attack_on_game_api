import { CustomResponseType } from '@/enums/CustomResponseType';
import { ResponseDTO } from '@/dto/responseDTO';
import { IHTTPSMessage } from '@/interfaces/HTTPSMessageInterface';
import { SPECIAL_ERROR_MSG } from '@/errors/CustomError';
import _ from 'lodash';
interface ErrorCode {
  code: CustomResponseType;
  msg: keyof IHTTPSMessage;
}
export class BaseController {
  private msg: IHTTPSMessage;

  constructor(msg: IHTTPSMessage) {
    this.msg = msg;
  }
  public formatResponse<T>(
    status = CustomResponseType.SYSTEM_ERROR,
    message: string,
    data?: T,
  ): ResponseDTO {
    const options = {
      status,
      message,
      data,
    };
    return new ResponseDTO(options);
  }
  public async handleServiceResponse(
    serviceMethod: () => Promise<any>,
    successMessage: string,
  ): Promise<ResponseDTO> {
    try {
      const result = await serviceMethod();
      if (_.isBoolean(result)) {
        return this.formatResponse(CustomResponseType.SUCCESS, successMessage);
      } else if (!_.isEmpty(result)) {
        return this.formatResponse(
          CustomResponseType.SUCCESS,
          successMessage,
          result,
        );
      } else {
        return this.formatResponse(CustomResponseType.OTHER, SPECIAL_ERROR_MSG);
      }
    } catch (error: unknown) {
      console.log(error);
      if (this.isErrorCode(error)) {
        return this.formatResponse(error.code, error.msg);
      }
      return this.formatResponse(
        CustomResponseType.SYSTEM_ERROR,
        this.msg.SERVER_ERROR,
      );
    }
  }

  private isErrorCode(error: unknown): error is ErrorCode {
    return (
      (error as ErrorCode).code !== undefined &&
      (error as ErrorCode).msg !== undefined
    );
  }
}
