"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultQuery = void 0;
var DefaultQuery;
(function (DefaultQuery) {
    DefaultQuery[DefaultQuery["LIMIT"] = 12] = "LIMIT";
    DefaultQuery[DefaultQuery["FOR_STATUS"] = 0] = "FOR_STATUS";
    DefaultQuery[DefaultQuery["SKIP"] = 0] = "SKIP";
    DefaultQuery[DefaultQuery["MAX_LIMIT"] = 100] = "MAX_LIMIT";
    DefaultQuery[DefaultQuery["REG_STATUS"] = 0] = "REG_STATUS";
    DefaultQuery["SORT_BY"] = "eventStartTime";
    DefaultQuery["SORT_ORDER"] = "asc";
})(DefaultQuery || (exports.DefaultQuery = DefaultQuery = {}));
//# sourceMappingURL=EventRequest.js.map