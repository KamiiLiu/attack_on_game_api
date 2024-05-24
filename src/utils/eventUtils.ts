import { IEvent } from '@/interfaces/EventInterface';
import {
  ActivityFormationStatus,
  ActivityRegistrationStatus,
} from '@/enums/EventStatus';
import dayjs from '@/utils/dayjs';
const now = dayjs();
const findEventFormationStatus = (event: IEvent): string => {
  if (event.currentParticipantsCount < event.minParticipants) {
    return ActivityFormationStatus.NOT_FORMED;
  } else if (event.currentParticipantsCount < event.maxParticipants) {
    return ActivityFormationStatus.FORMED;
  } else if (event.currentParticipantsCount === event.maxParticipants) {
    return ActivityFormationStatus.FULL;
  } else {
    console.warn('怪怪的');
    return ActivityFormationStatus.OTHER;
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
