import EventModel from '@/models/EventModel';
import { EventDTO } from '@/dto/event/eventDTO';
import { IEvent } from '@/interfaces/EventInterface';
import { EventQuery } from '@/queries/EventQuery';
import { QueryParams } from '@/services/eventQueryParams';
import { SortOrder } from 'mongoose';
export class EventRepository {
  public async createEvent(content: Partial<EventDTO>): Promise<boolean> {
    try {
      const event = new EventModel(content);
      await event.save();
      return true;
    } catch (error) {
      return false;
    }
  }
  public async updateEvent(id: string, content: EventDTO): Promise<boolean> {
    try {
      await EventModel.findOneAndUpdate(
        { _id: id },
        {
          title: content.title,
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
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  public async getEventById(id: string): Promise<IEvent | null> {
    const event = await EventModel.findById(id);
    return event;
  }
  public async getAllEvents(queryParams: QueryParams): Promise<IEvent[]> {
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
    return this._getEventsData(query, skip, limit, sortBy, sortOrder);
  }
  public async getEventsByStoreId(
    storeId: string,
    queryParams: QueryParams,
  ): Promise<IEvent[]> {
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
    return this._getEventsData(query, skip, limit, sortBy, sortOrder);
  }
  private async _getEventsData(
    eventQuery: any,
    skip: number,
    limit: number,
    sortBy: string,
    sortOrder: SortOrder,
  ): Promise<IEvent[]> {
    const sortOptions: { [key: string]: SortOrder } = { [sortBy]: sortOrder };
    const eventData = await EventModel.find(eventQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .exec();
    return eventData || [];
  }
}
