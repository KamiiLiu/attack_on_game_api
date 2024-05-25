import { IEvent } from '@/interfaces/EventInterface';
import {
  ActivityFormationStatus as STATUS,
  ActivityRegistrationStatus,
} from '@/enums/EventStatus';
import dayjs from '@/utils/dayjs';

const now = dayjs();
const findEventFormationStatus = (event: IEvent): string => {
  if (event.currentParticipantsCount < event.minParticipants) {
    return STATUS.NOT_FORMED;
  } else if (event.currentParticipantsCount < event.maxParticipants) {
    return STATUS.FORMED;
  } else if (event.currentParticipantsCount === event.maxParticipants) {
    return STATUS.FULL;
  } else {
    console.warn('怪怪的');
    return STATUS.OTHER;
  }
};
const findActivityRegistrationStatus = (event: IEvent): string => {
  if (now.isBefore(event.registrationStartTime)) {
    return ActivityRegistrationStatus.NOT_STARTED;
  } else if (now.isAfter(event.registrationEndTime)) {
    return ActivityRegistrationStatus.CLOSED;
  } else {
    return ActivityRegistrationStatus.OPEN;
  }
};
export const handleEventPublish = (event: IEvent): boolean => {
  if (event.isPublish) {
    return true;
  }
  return false;
};
interface Query {
  registrationStartTime: { $lte: Date };
  registrationEndTime: { $gte: Date };
  $expr?: object;
}
export const buildAllTimeQuery = (status: STATUS): Query => {
  const query = {} as Query;
  return buildBaseTimeQuery(query, status);
};
export const buildRegistrationTimeQuery = (status: STATUS): Query => {
  const query: Query = {
    registrationStartTime: { $lte: new Date() },
    registrationEndTime: { $gte: new Date() },
  };
  return buildBaseTimeQuery(query, status);
};
function buildBaseTimeQuery(query: Query, status: STATUS): Query {
  if (status === STATUS.NOT_FORMED) {
    query.$expr = {
      $lte: ['$currentParticipantsCount', '$minParticipants'],
    };
  } else if (status === STATUS.FORMED) {
    query.$expr = {
      $and: [
        { $gte: ['$currentParticipantsCount', '$minParticipants'] },
        { $lte: ['$currentParticipantsCount', '$maxParticipants'] },
      ],
    };
  } else if (status === STATUS.FULL) {
    query.$expr = {
      $eq: ['$currentParticipantsCount', '$maxParticipants'],
    };
  }
  return query;
}
