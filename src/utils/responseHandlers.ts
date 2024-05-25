import { Response } from 'express';

export const handleResult = (result: any, res: Response) => {
  if (!result.success || !result.data) {
    return res.status(result.status).json({ message: result.message });
  }
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
export const handleSuccess = (
  statusCode: number = 200,
  message: string = 'OK',
  data: any = null,
) => {
  return {
    success: true,
    status: statusCode,
    message: `回傳訊息: ${message}`,
    data,
  };
};

export const handleServerError = (error: any, message = '系統錯誤') => {
  return handleError(error, 500, message);
};

export const handleClientError = (message: string, code = 404) => {
  return handleError(message, code, '客戶端錯誤');
};

const handleError = (error: any, statusCode: number, message: string) => {
  console.error(message, error);
  return {
    success: false,
    status: statusCode,
    message: `${message}: ${error.message || error}`,
  };
};
