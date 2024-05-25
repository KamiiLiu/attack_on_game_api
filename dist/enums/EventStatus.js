"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRegistrationStatus = exports.ActivityFormationStatus = void 0;
var ActivityFormationStatus;
(function (ActivityFormationStatus) {
    ActivityFormationStatus["DEFAULT"] = "\u5168\u90E8";
    ActivityFormationStatus["NOT_FORMED"] = "\u63EA\u5718\u4E2D";
    ActivityFormationStatus["FORMED"] = "\u5DF2\u6210\u5718";
    ActivityFormationStatus["FULL"] = "\u5DF2\u6EFF\u5718";
    ActivityFormationStatus["OTHER"] = "\u5176\u4ED6\u72C0\u614B";
})(ActivityFormationStatus || (exports.ActivityFormationStatus = ActivityFormationStatus = {}));
var ActivityRegistrationStatus;
(function (ActivityRegistrationStatus) {
    ActivityRegistrationStatus["NOT_STARTED"] = "\u672A\u5230\u5831\u540D\u6642\u9593";
    ActivityRegistrationStatus["OPEN"] = "\u5831\u540D\u6642\u9593";
    ActivityRegistrationStatus["CLOSED"] = "\u4E0D\u53EF\u5831\u540D\u6642\u9593";
})(ActivityRegistrationStatus || (exports.ActivityRegistrationStatus = ActivityRegistrationStatus = {}));
//# sourceMappingURL=EventStatus.js.map