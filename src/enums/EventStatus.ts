export enum EventFormationStatus {
  ALL = 0,
  NOT_FORMED = 1,
  FORMED = 2,
  FULL = 3,
}

export enum EventRegistrationStatus {
  ALL = 0,
  OPEN = 2,
  CLOSED = 3,
  NOT_STARTED = 1,
}

export enum SortBy {
  EVENT_TIME = 'eventStartTime',
  FEE = 'participationFee',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
