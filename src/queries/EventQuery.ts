import { BaseQuery } from '@/interfaces/BaseQuery';
import {
  EventFormationStatus as FORMATION_STATUS,
  EventRegistrationStatus as REGISTRATION_STATUS,
} from '@/enums/EventStatus';
type QueryParams = {
  storeId?: string;
  keyword?: string;
  [key: string]: any;
};

type StatusParams = {
  forStatus: FORMATION_STATUS;
  regStatus: REGISTRATION_STATUS;
};
interface QueryWithStore extends BaseQuery {
  storeId?: string;
  isPublish?: boolean;
  title?: { $regex: string; $options: string };
}
export class EventQuery {
  private configuredQuery: QueryParams;
  private optionalQuery: StatusParams;

  constructor(configuredQuery: QueryParams, optionalQuery: StatusParams) {
    this.configuredQuery = configuredQuery;
    this.optionalQuery = optionalQuery;
  }

  public buildEventQuery(): QueryWithStore {
    const query: QueryWithStore = this.buildBaseQuery();

    if (this.configuredQuery.storeId) {
      query.storeId = this.configuredQuery.storeId;
    }
    if (this.configuredQuery.keyword) {
      query.title = { $regex: this.configuredQuery.keyword, $options: 'i' };
    }
    this.withOptionsQuery(query, this.optionalQuery);
    return query;
  }

  private buildBaseQuery(): QueryWithStore {
    return { isPublish: true };
  }

  private withOptionsQuery(
    query: QueryWithStore,
    { forStatus, regStatus }: StatusParams,
  ): void {
    const formationQuery = this.buildFormationQuery(forStatus);
    const registrationQuery = this.buildRegistrationQuery(regStatus);
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

  private buildRegistrationQuery(status: REGISTRATION_STATUS): QueryWithStore {
    const today = new Date();
    const query: QueryWithStore = {};
    if (status === REGISTRATION_STATUS.CLOSED) {
      query.$expr = {
        $lt: [today, '$registrationEndTime'],
      };
    } else if (status === REGISTRATION_STATUS.OPEN) {
      query.$expr = {
        $and: [
          { $gt: [today, '$registrationStartTime'] },
          { $lt: [today, '$registrationEndTime'] },
        ],
      };
    } else if (status === REGISTRATION_STATUS.NOT_STARTED) {
      query.$expr = {
        $gt: ['$registrationStartTime', today],
      };
    }
    return query;
  }

  private buildFormationQuery(status: FORMATION_STATUS): QueryWithStore {
    const query: QueryWithStore = {};
    if (status === FORMATION_STATUS.NOT_FORMED) {
      query.$expr = {
        $lte: ['$currentParticipantsCount', '$minParticipants'],
      };
    } else if (status === FORMATION_STATUS.FORMED) {
      query.$expr = {
        $and: [
          { $gte: ['$currentParticipantsCount', '$minParticipants'] },
          { $lte: ['$currentParticipantsCount', '$maxParticipants'] },
        ],
      };
    } else if (status === FORMATION_STATUS.FULL) {
      query.$expr = {
        $eq: ['$currentParticipantsCount', '$maxParticipants'],
      };
    }
    return query;
  }
}
