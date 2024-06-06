"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortOrder = exports.SortBy = exports.EventRegistrationStatus = exports.EventFormationStatus = void 0;
var EventFormationStatus;
(function (EventFormationStatus) {
    EventFormationStatus[EventFormationStatus["ALL"] = 0] = "ALL";
    EventFormationStatus[EventFormationStatus["FORMING"] = 1] = "FORMING";
    EventFormationStatus[EventFormationStatus["FORMED"] = 2] = "FORMED";
})(EventFormationStatus || (exports.EventFormationStatus = EventFormationStatus = {}));
var EventRegistrationStatus;
(function (EventRegistrationStatus) {
    EventRegistrationStatus[EventRegistrationStatus["ALL"] = 0] = "ALL";
    EventRegistrationStatus[EventRegistrationStatus["OPEN"] = 1] = "OPEN";
    EventRegistrationStatus[EventRegistrationStatus["CLOSED"] = 2] = "CLOSED";
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