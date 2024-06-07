import EventModel from '@/models/EventModel';
import { EventDTO } from '@/dto/event/eventDTO';
import { IEvent } from '@/interfaces/EventInterface';
import { EventQuery } from '@/queries/EventQuery';
import { QueryParams } from '@/services/eventQueryParams';
import { SortOrder } from 'mongoose';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError, MONGODB_ERROR_MSG } from '@/errors/CustomError';
export class EventRepository {
  public async createEvent(content: Partial<EventDTO>): Promise<boolean> {
    try {
      const event = new EventModel(content);
      await event.save();
      return true;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  public async updateEvent(
    id: string,
    content: EventDTO,
  ): Promise<IEvent | null> {
    try {
      return await EventModel.findOneAndUpdate(
        { _id: id },
        {
          title: content.title,
          description: content.description,
          isFoodAllowed: content.isFoodAllowed,
          address: content.address,
          eventStartTime: content.eventStartTime,
          eventEndTime: content.eventEndTime,
          registrationStartTime: content.registrationStartTime,
          registrationEndTime: content.registrationEndTime,
          maxParticipants: content.maxParticipants,
          minParticipants: content.minParticipants,
          currentParticipantsCount: content.currentParticipantsCount,
          participationFee: content.participationFee,
          eventImageUrl: content.eventImageUrl,
          updatedAt: content.updatedAt,
        },
        { new: true },
      )
        .lean()
        .exec(); // 使用 lean() 來提高查詢效能，並將結果轉為純 JavaScript 對象
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  public async getEventById(id: string): Promise<IEvent | null> {
    try {
      return await EventModel.findById(id);
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  public async getAllEvents(
    queryParams: QueryParams,
  ): Promise<IEvent[] | null> {
    try {
      const {
        limit,
        skip,
        formationStatus,
        registrationStatus,
        sortBy,
        sortOrder,
      } = queryParams;
      const eventQuery = new EventQuery(
        {},
        {
          forStatus: formationStatus,
          regStatus: registrationStatus,
        },
      );
      const query = eventQuery.buildEventQuery();
      const events = await this._getEventsData(
        query,
        skip,
        limit,
        sortBy,
        sortOrder,
      );
      return events;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  public async getEventsByStoreId(
    storeId: string,
    queryParams: QueryParams,
  ): Promise<IEvent[] | null> {
    try {
      const {
        limit,
        skip,
        formationStatus,
        registrationStatus,
        sortBy,
        sortOrder,
      } = queryParams;
      const eventQuery = new EventQuery(
        { storeId },
        {
          forStatus: formationStatus,
          regStatus: registrationStatus,
        },
      );
      const query = eventQuery.buildEventQuery();
      const events = await this._getEventsData(
        query,
        skip,
        limit,
        sortBy,
        sortOrder,
      );
      return events;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  private async _getEventsData(
    eventQuery: any,
    skip: number,
    limit: number,
    sortBy: string,
    sortOrder: SortOrder,
  ): Promise<IEvent[]> {
    try {
      const sortOptions: { [key: string]: SortOrder } = { [sortBy]: sortOrder };
      const eventData = await EventModel.find(eventQuery)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        .exec();
      return eventData || [];
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
}
