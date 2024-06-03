import { CustomResponseType } from '@/enums/CustomResponseType';
import { ResponseDTO } from '@/dto/responseDTO';

export abstract class BaseController {
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
}
