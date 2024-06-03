'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.buildRegistrationTimeQuery =
  exports.buildAllTimeQuery =
  exports.handleEventPublish =
    void 0;
const EventStatus_1 = require('@/enums/EventStatus');
const dayjs_1 = __importDefault(require('@/utils/dayjs'));
const now = (0, dayjs_1.default)();
const findEventFormationStatus = (event) => {
  if (event.currentParticipantsCount < event.minParticipants) {
    return EventStatus_1.ActivityFormationStatus.NOT_FORMED;
  } else if (event.currentParticipantsCount < event.maxParticipants) {
    return EventStatus_1.ActivityFormationStatus.FORMED;
  } else if (event.currentParticipantsCount === event.maxParticipants) {
    return EventStatus_1.ActivityFormationStatus.FULL;
  } else {
    console.warn('怪怪的');
    return EventStatus_1.ActivityFormationStatus.OTHER;
  }
};
const findActivityRegistrationStatus = (event) => {
  if (now.isBefore(event.registrationStartTime)) {
    return EventStatus_1.ActivityRegistrationStatus.NOT_STARTED;
  } else if (now.isAfter(event.registrationEndTime)) {
    return EventStatus_1.ActivityRegistrationStatus.CLOSED;
  } else {
    return EventStatus_1.ActivityRegistrationStatus.OPEN;
  }
};
const handleEventPublish = (event) => {
  if (event.isPublish) {
    return true;
  }
  return false;
};
exports.handleEventPublish = handleEventPublish;
const buildAllTimeQuery = (status) => {
  const query = {};
  return buildBaseTimeQuery(query, status);
};
exports.buildAllTimeQuery = buildAllTimeQuery;
const buildRegistrationTimeQuery = (status) => {
  const query = {
    registrationStartTime: { $lte: new Date() },
    registrationEndTime: { $gte: new Date() },
  };
  return buildBaseTimeQuery(query, status);
};
exports.buildRegistrationTimeQuery = buildRegistrationTimeQuery;
function buildBaseTimeQuery(query, status) {
  if (status === EventStatus_1.ActivityFormationStatus.NOT_FORMED) {
    query.$expr = {
      $lte: ['$currentParticipantsCount', '$minParticipants'],
    };
  } else if (status === EventStatus_1.ActivityFormationStatus.FORMED) {
    query.$expr = {
      $and: [
        { $gte: ['$currentParticipantsCount', '$minParticipants'] },
        { $lte: ['$currentParticipantsCount', '$maxParticipants'] },
      ],
    };
  } else if (status === EventStatus_1.ActivityFormationStatus.FULL) {
    query.$expr = {
      $eq: ['$currentParticipantsCount', '$maxParticipants'],
    };
  }
  console.log('query2', query);
  console.log('status', status);
  return query;
}
//# sourceMappingURL=eventUtils.js.map
