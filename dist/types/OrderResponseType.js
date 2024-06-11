"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResponseType = void 0;
exports.OrderResponseType = {
    SUCCESS_CREATED: '建立訂單成功，你真棒！',
    FAILED_CREATED: '建立訂單失敗，可能原因包括：訂單並不在活動報名期間內。',
    ERROR_REGISTRATION_PERIOD: '不在活動報名期間內',
    ERROR_EXCEEDS_CAPACITY: '超過可報名名額',
    FAILED_FOUND: '沒有找到相關訂單。可能原因包括：ID不正確。',
    BAD_REQUEST: '查詢失敗，可能原因包括：訂單並不在活動報名期間內。',
    SUCCESS_REQUEST: '成功獲取桌遊訂單信息！',
    SERVER_ERROR: '伺服器錯誤，請問問卡咪吧。',
    SUCCESS_UPDATE: '成功更新桌遊訂單！',
    FAILED_UPDATE: '更新桌遊訂單失敗，請再試一次。',
};
//# sourceMappingURL=OrderResponseType.js.map