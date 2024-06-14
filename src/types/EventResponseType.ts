import { IHTTPSMessage } from '@/interfaces/HTTPSMessageInterface';
export const EventResponseType: IHTTPSMessage = {
  SUCCESS_CREATED: '建立活動成功，你真棒！',
  SUCCESS_REQUEST: '成功獲取桌遊活動信息！',
  SUCCESS_UPDATE: '成功獲取桌遊活動信息！',
  FAILED_VALIDATION: '驗證失敗，輸入數據不符合要求',
  FAILED_FOUND: '查無資料，請檢查請求的參數或條件',
  FAILED_AUTHORIZATION: '未授權操作，該活動已下架或用戶無權訪問',
  FAILED_CREATION: '創建失敗，無法保存活動資料',
  FAILED_UPDATE: '更新失敗，無法更新活動資料',
  FAILED_DELETION: '刪除失敗，無法刪除活動資料',
  FAILED_OPERATION: '操作失敗，請稍後再試或聯繫卡咪',
  SYSTEM_ERROR: '系統錯誤，請稍後再試或聯繫卡咪',
  UNKNOWN_ERROR: '未知錯誤，請稍後再試或聯繫卡咪',
};
