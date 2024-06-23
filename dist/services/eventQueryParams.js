"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamsParser = void 0;
const EventRequest_1 = require("@/enums/EventRequest");
const EventResponseType_1 = require("@/types/EventResponseType");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const CustomError_1 = require("@/errors/CustomError");
class QueryParamsParser {
    constructor() {
        this.defaultLimit = EventRequest_1.DefaultQuery.LIMIT;
        this.defaultSkip = EventRequest_1.DefaultQuery.SKIP;
        this.defaultFormationStatus = EventRequest_1.DefaultQuery.FOR_STATUS;
        this.defaultRegistrationStatus = EventRequest_1.DefaultQuery.REG_STATUS;
        this.defaultSortBy = EventRequest_1.DefaultQuery.SORT_BY;
        this.defaultSortOrder = EventRequest_1.DefaultQuery.SORT_ORDER;
        this.maxLimit = EventRequest_1.DefaultQuery.MAX_LIMIT;
    }
    parse(req) {
        const { keyword = '', limit = this.defaultLimit, skip = this.defaultSkip, formationStatus = this.defaultFormationStatus, registrationStatus = this.defaultRegistrationStatus, sortBy = this.defaultSortBy, sortOrder = this.defaultSortOrder, } = req.query || {};
        const parsedLimit = Math.min(Number(limit), this.maxLimit);
        const parsedSkip = Number(skip);
        const parsedFormationStatus = Number(formationStatus);
        const parsedRegistrationStatus = Number(registrationStatus);
        const parsedSortBy = sortBy;
        const parsedSortOrder = sortOrder;
        if (typeof keyword !== 'string') {
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, EventResponseType_1.EventResponseType.FAILED_VALIDATION);
        }
        if (typeof sortBy !== 'string') {
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, EventResponseType_1.EventResponseType.FAILED_VALIDATION);
        }
        if (typeof sortOrder !== 'string') {
            throw new CustomError_1.CustomError(CustomResponseType_1.CustomResponseType.VALIDATION_ERROR, EventResponseType_1.EventResponseType.FAILED_VALIDATION);
        }
        return {
            keyword: keyword.trim(),
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