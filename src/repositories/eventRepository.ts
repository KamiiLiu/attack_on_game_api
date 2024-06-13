import EventModel from '@/models/EventModel';
import { EventDTO } from '@/dto/eventDTO';
import { EventDocument } from '@/interfaces/EventInterface';
import { EventQuery } from '@/queries/EventQuery';
import { QueryParams } from '@/services/eventQueryParams';
import { SortOrder, Types } from 'mongoose';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { IBaseRepository } from '@/repositories/IBaseRepository';
import { EventResponseType } from '@/types/EventResponseType';
import { MONGODB_ERROR_MSG } from '@/types/OtherResponseType';
import _ from 'lodash';
export class EventRepository implements IBaseRepository<EventDocument> {
  async findById(id: string): Promise<EventDocument> {
    try {
      const event = await EventModel.findOne({ idNumber: id });
      if (_.isEmpty(event)) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          EventResponseType.FAILED_FOUND,
        );
      }
      return event;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
  async findAll(queryParams: QueryParams): Promise<EventDocument[]> {
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

  async create(content: Partial<EventDTO>): Promise<boolean> {
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
  async updateParticipantsCount(
    content: Partial<EventDocument>,
    addedSeat: number,
  ): Promise<EventDocument | null> {
    try {
      console.log(addedSeat);
      console.log(content);
      return await EventModel.findOneAndUpdate(
        { _id: content._id },
        {
          currentParticipantsCount: addedSeat,
          updatedAt: content.updatedAt,
        },
      )
        .lean()
        .exec();
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  async update(content: Partial<EventDocument>): Promise<EventDocument | null> {
    try {
      return await EventModel.findOneAndUpdate(
        { idNumber: content.idNumber },
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
        .exec();
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  async delete(id: string): Promise<EventDocument | null> {
    try {
      return await EventModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }

  public async getEventsByStoreId(
    storeId: Types.ObjectId,
    queryParams: QueryParams,
  ): Promise<EventDocument[] | null> {
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
  ): Promise<EventDocument[]> {
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
