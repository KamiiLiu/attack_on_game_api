# API 說明

## EVENT\_桌遊活動 (v1.2.0)

| 方法 | 路徑                   | 描述             |
| ---- | ---------------------- | ---------------- |
| GET  | /event/:eventId        | 取得單一活動     |
| GET  | /event/                | 獲取所有活動     |
| POST | /event/                | 新增活動         |
| PUT  | /event/:eventId        | 更新活動         |
| GET  | /event/store/:storeId  | 取得店家所有活動 |
| GET  | event/:eventId/summary | 取得結帳頁資料   |

## ORDER\_買家訂單管理 (v1.4.0)

| 方法 | 路徑             | 描述             |
| ---- | ---------------- | ---------------- |
| POST | /order           | 建立訂單及票券   |
| GET  | /order/:idNumber | 獲取單一訂單詳情 |
| GET  | /order/list      | 獲取所有訂單     |

## MyEvent\_賣家活動管理 (v1.5.0)

| 方法 | 路徑                                 | 描述                 |
| ---- | ------------------------------------ | -------------------- |
| GET  | /myEvent/:myEventId/player           | 取得活動訂單資訊     |
| GET  | /myEvent/:myEventId/qr-code          | 取得活動QR碼資訊     |
| GET  | /myevent/list                        | 取得商家所有販售活動 |
| POST | /myEvent/:myEventId/validate-qr-code | 驗證QR碼             |
