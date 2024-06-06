import { CustomResponseType } from '@/enums/CustomResponseType';
import { ResponseDTO } from '@/dto/responseDTO';
import _ from 'lodash';
export class BaseController {
  private server_error_msg: string;

  constructor(server_error_msg: string) {
    this.server_error_msg = server_error_msg;
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
    failureMessage: string,
  ): Promise<ResponseDTO> {
    try {
      const result = await serviceMethod();
      console.log('xxxxx');
      console.log(result);
      if (!_.isEmpty(result.data)) {
        return this.formatResponse(
          CustomResponseType.SUCCESS,
          successMessage,
          result,
        );
      } else {
        return this.formatResponse(
          CustomResponseType.DATABASE_OPERATION_FAILED,
          result.error.message || failureMessage,
        );
      }
    } catch (error) {
      const errorMessage = _.get(error, 'message', this.server_error_msg);
      return this.formatResponse(CustomResponseType.SYSTEM_ERROR, errorMessage);
    }
  }
}
