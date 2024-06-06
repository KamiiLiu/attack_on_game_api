"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortOrder = exports.SortBy = exports.EventRegistrationStatus = exports.EventFormationStatus = void 0;
var EventFormationStatus;
(function (EventFormationStatus) {
    EventFormationStatus[EventFormationStatus["ALL"] = 0] = "ALL";
    EventFormationStatus[EventFormationStatus["NOT_FORMED"] = 1] = "NOT_FORMED";
    EventFormationStatus[EventFormationStatus["FORMED"] = 2] = "FORMED";
    EventFormationStatus[EventFormationStatus["FULL"] = 3] = "FULL";
})(EventFormationStatus || (exports.EventFormationStatus = EventFormationStatus = {}));
var EventRegistrationStatus;
(function (EventRegistrationStatus) {
    EventRegistrationStatus[EventRegistrationStatus["ALL"] = 0] = "ALL";
    EventRegistrationStatus[EventRegistrationStatus["OPEN"] = 2] = "OPEN";
    EventRegistrationStatus[EventRegistrationStatus["CLOSED"] = 3] = "CLOSED";
    EventRegistrationStatus[EventRegistrationStatus["NOT_STARTED"] = 1] = "NOT_STARTED";
})(EventRegistrationStatus || (exports.EventRegistrationStatus = EventRegistrationStatus = {}));
var SortBy;
(function (SortBy) {
    SortBy["EVENT_TIME"] = "eventStartTime";
    SortBy["FEE"] = "participationFee";
})(SortBy || (exports.SortBy = SortBy = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
//# sourceMappingURL=EventStatus.js.map