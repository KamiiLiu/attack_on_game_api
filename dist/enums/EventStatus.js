"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistrationStatus = exports.EventFormationStatus = void 0;
var EventFormationStatus;
(function (EventFormationStatus) {
    EventFormationStatus[EventFormationStatus["ALL"] = 0] = "ALL";
    EventFormationStatus[EventFormationStatus["NOT_FORMED"] = 1] = "NOT_FORMED";
    EventFormationStatus[EventFormationStatus["FORMED"] = 2] = "FORMED";
    EventFormationStatus[EventFormationStatus["FULL"] = 3] = "FULL";
    EventFormationStatus[EventFormationStatus["OTHER"] = 4] = "OTHER";
})(EventFormationStatus || (exports.EventFormationStatus = EventFormationStatus = {}));
var EventRegistrationStatus;
(function (EventRegistrationStatus) {
    EventRegistrationStatus[EventRegistrationStatus["NOT_STARTED"] = 1] = "NOT_STARTED";
    EventRegistrationStatus[EventRegistrationStatus["OPEN"] = 2] = "OPEN";
    EventRegistrationStatus[EventRegistrationStatus["CLOSED"] = 3] = "CLOSED";
    EventRegistrationStatus[EventRegistrationStatus["ALL"] = 0] = "ALL";
})(EventRegistrationStatus || (exports.EventRegistrationStatus = EventRegistrationStatus = {}));
/*
export enum EventFormationStatus {
  ALL = '全部',
  NOT_FORMED = '揪團中',
  FORMED = '已成團',
  FULL = '已滿團',
  OTHER = '其他狀態',
}

export enum EventRegistrationStatus {
  NOT_STARTED = '未到報名時間',
  OPEN = '報名時間',
  CLOSED = '不可報名時間',
  ALL = '全部',
}
*/
//# sourceMappingURL=EventStatus.js.map