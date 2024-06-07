'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handleClientError =
  exports.handleServerError =
  exports.handleSuccess =
  exports.handleResult =
    void 0;
const handleResult = (result, res) => {
  if (!result.success || !result.data) {
    return res.status(result.status).json({ message: result.message });
  }
  return res
    .status(result.status)
    .json({ message: result.message, data: result.data });
};
exports.handleResult = handleResult;
const handleSuccess = (statusCode = 200, message = 'OK', data = null) => {
  return {
    success: true,
    status: statusCode,
    message: `回傳訊息: ${message}`,
    data,
  };
};
exports.handleSuccess = handleSuccess;
const handleServerError = (error, message = '系統錯誤') => {
  return handleError(error, 500, message);
};
exports.handleServerError = handleServerError;
const handleClientError = (message, code = 404) => {
  return handleError(message, code, '客戶端錯誤');
};
exports.handleClientError = handleClientError;
const handleError = (error, statusCode, message) => {
  e.error(message, error);
  return {
    success: false,
    status: statusCode,
    message: `${message}: ${error.message || error}`,
  };
};
//# sourceMappingURL=responseHandlers.js.map
