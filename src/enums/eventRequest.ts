import {
  EventFormationStatus as FORMATION_STATUS,
  EventRegistrationStatus as REGISTRATION_STATUS,
  SortBy,
  SortOrder,
} from '@/enums/EventStatus';

export enum DefaultQuery {
  LIMIT = 12,
  FOR_STATUS = FORMATION_STATUS.ALL,
  SKIP = 0,
  MAX_LIMIT = 100,
  REG_STATUS = REGISTRATION_STATUS.ALL,
  SORT_BY = SortBy.EVENT_TIME,
  SORT_ORDER = SortOrder.ASC,
}
