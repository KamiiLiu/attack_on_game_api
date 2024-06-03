import {
  EventFormationStatus as FORMATION_STATUS,
  EventRegistrationStatus as REGISTRATION_STATUS,
} from '@/enums/EventStatus';

export enum DefaultQuery {
  LIMIT = 10,
  FOR_STATUS = FORMATION_STATUS.ALL,
  SKIP = 0,
  MAX_LIMIT = 100,
  REG_STATUS = REGISTRATION_STATUS.ALL,
}
