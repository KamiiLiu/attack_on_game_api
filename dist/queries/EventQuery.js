"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQuery = void 0;
const EventStatus_1 = require("@/enums/EventStatus");
class EventQuery {
    constructor(configuredQuery, optionalQuery) {
        this.configuredQuery = configuredQuery;
        this.optionalQuery = optionalQuery;
    }
    buildEventQuery() {
        const query = this.buildBaseQuery();
        if (this.configuredQuery.storeId) {
            query.storeId = this.configuredQuery.storeId;
        }
        this.withOptionsQuery(query, this.optionalQuery);
        return query;
    }
    buildBaseQuery() {
        return { isPublish: true };
    }
    withOptionsQuery(query, { forStatus, regStatus, keyword }) {
        const formationQuery = this.buildFormationQuery(forStatus);
        const registrationQuery = this.buildRegistrationQuery(regStatus);
        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        if (formationQuery.$expr) {
            query.$and = query.$and || [];
            query.$and.push({ $expr: formationQuery.$expr });
        }
        if (registrationQuery.$expr) {
            query.$and = query.$and || [];
            query.$and.push({ $expr: registrationQuery.$expr });
        }
        if (query.$and && query.$and.length === 0) {
            delete query.$and;
        }
    }
    buildRegistrationQuery(status) {
        const today = new Date().toISOString();
        const query = {};
        if (status === EventStatus_1.EventRegistrationStatus.CLOSED) {
            query.$expr = {
                $lt: [today, '$registrationEndTime'],
            };
        }
        else if (status === EventStatus_1.EventRegistrationStatus.OPEN) {
            query.$expr = {
                $and: [
                    { $gt: [today, '$registrationStartTime'] },
                    { $lt: [today, '$registrationEndTime'] },
                ],
            };
        }
        else if (status === EventStatus_1.EventRegistrationStatus.NOT_STARTED) {
            query.$expr = {
                $gt: ['$registrationStartTime', today],
            };
        }
        return query;
    }
    buildFormationQuery(status) {
        const query = {};
        if (status === EventStatus_1.EventFormationStatus.NOT_FORMED) {
            query.$expr = {
                $lte: ['$currentParticipantsCount', '$minParticipants'],
            };
        }
        else if (status === EventStatus_1.EventFormationStatus.FORMED) {
            query.$expr = {
                $and: [
                    { $gte: ['$currentParticipantsCount', '$minParticipants'] },
                    { $lt: ['$currentParticipantsCount', '$maxParticipants'] },
                ],
            };
        }
        else if (status === EventStatus_1.EventFormationStatus.FULL) {
            query.$expr = {
                $eq: ['$currentParticipantsCount', '$maxParticipants'],
            };
        }
        return query;
    }
}
exports.EventQuery = EventQuery;
//# sourceMappingURL=EventQuery.js.map