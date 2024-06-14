import { DefaultStatus, Status } from '@/enums/OrderStatus';
export interface IQuery {
  limit?: number;
  status?: Status;
  skip?: number;
}

export enum DefaultQuery {
  LIMIT = 12,
  STATUS = DefaultStatus.STATUS,
  SKIP = 0,
  MAX_LIMIT = 100,
}
