import { DefaultQuery } from '@/enums/EventRequest';
import { Request } from 'express';
import {
  EventFormationStatus as FORMATION_STATUS,
  EventRegistrationStatus as REGISTRATION_STATUS,
  SortBy,
  SortOrder,
} from '@/enums/EventStatus';
import { EventResponseType } from '@/types/EventResponseType';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
export interface QueryParams {
  limit: number;
  skip: number;
  formationStatus: FORMATION_STATUS;
  registrationStatus: REGISTRATION_STATUS;
  sortBy: SortBy;
  sortOrder: SortOrder;
  keyword: string;
}
export class QueryParamsParser {
  private readonly defaultLimit: number = DefaultQuery.LIMIT;
  private readonly defaultSkip: number = DefaultQuery.SKIP;
  private readonly defaultFormationStatus: number = DefaultQuery.FOR_STATUS;
  private readonly defaultRegistrationStatus: number = DefaultQuery.REG_STATUS;
  private readonly defaultSortBy = DefaultQuery.SORT_BY;
  private readonly defaultSortOrder = DefaultQuery.SORT_ORDER;
  private readonly maxLimit: number = DefaultQuery.MAX_LIMIT;

  public parse(req: Request) {
    const {
      keyword = '',
      limit = this.defaultLimit,
      skip = this.defaultSkip,
      formationStatus = this.defaultFormationStatus,
      registrationStatus = this.defaultRegistrationStatus,
      sortBy = this.defaultSortBy,
      sortOrder = this.defaultSortOrder,
    } = req.query || {};

    const parsedLimit = Math.min(Number(limit), this.maxLimit);
    const parsedSkip = Number(skip);
    const parsedFormationStatus = Number(formationStatus);
    const parsedRegistrationStatus = Number(registrationStatus);
    const parsedSortBy = sortBy;
    const parsedSortOrder = sortOrder;
    if (typeof keyword !== 'string') {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        EventResponseType.FAILED_VALIDATION,
      );
    }
    if (typeof sortBy !== 'string') {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        EventResponseType.FAILED_VALIDATION,
      );
    }
    if (typeof sortOrder !== 'string') {
      throw new CustomError(
        CustomResponseType.VALIDATION_ERROR,
        EventResponseType.FAILED_VALIDATION,
      );
    }
    return {
      keyword: keyword.trim(),
      limit: parsedLimit,
      skip: parsedSkip,
      formationStatus: parsedFormationStatus,
      registrationStatus: parsedRegistrationStatus,
      sortBy: parsedSortBy,
      sortOrder: parsedSortOrder,
    } as QueryParams;
  }
}
