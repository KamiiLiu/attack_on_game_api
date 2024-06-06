"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamsParser = void 0;
const eventRequest_1 = require("@/enums/eventRequest");
class QueryParamsParser {
    constructor() {
        this.defaultLimit = eventRequest_1.DefaultQuery.LIMIT;
        this.defaultSkip = eventRequest_1.DefaultQuery.SKIP;
        this.defaultFormationStatus = eventRequest_1.DefaultQuery.FOR_STATUS;
        this.defaultRegistrationStatus = eventRequest_1.DefaultQuery.REG_STATUS;
        this.defaultSortBy = eventRequest_1.DefaultQuery.SORT_BY;
        this.defaultSortOrder = eventRequest_1.DefaultQuery.SORT_ORDER;
        this.maxLimit = eventRequest_1.DefaultQuery.MAX_LIMIT;
    }
    parse(req) {
        const { limit = this.defaultLimit, skip = this.defaultSkip, formationStatus = this.defaultFormationStatus, registrationStatus = this.defaultRegistrationStatus, sortBy = this.defaultSortBy, sortOrder = this.defaultSortOrder, } = req.query || {};
        const parsedLimit = Math.min(Number(limit), this.maxLimit);
        const parsedSkip = Number(skip);
        const parsedFormationStatus = Number(formationStatus);
        const parsedRegistrationStatus = Number(registrationStatus);
        const parsedSortBy = sortBy;
        const parsedSortOrder = sortOrder;
        return {
            limit: parsedLimit,
            skip: parsedSkip,
            formationStatus: parsedFormationStatus,
            registrationStatus: parsedRegistrationStatus,
            sortBy: parsedSortBy,
            sortOrder: parsedSortOrder,
        };
    }
}
exports.QueryParamsParser = QueryParamsParser;
//# sourceMappingURL=eventQueryParams.js.map