import EventModel from '@/models/EventModel';
import { EventDTO } from '@/dto/event/eventDTO';
import { IEvent } from '@/interfaces/EventInterface';
import { EventQuery } from '@/queries/EventQuery';
import { QueryParams } from '@/services/eventQueryParams';
import { SortOrder } from 'mongoose';
export class EventRepository {
  public async createEvent(
    content: Partial<EventDTO>,
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const event = new EventModel(content);
      await event.save();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  public async updateEvent(
    id: string,
    content: EventDTO,
  ): Promise<{ success: boolean; error?: any }> {
    try {
      await EventModel.findOneAndUpdate(
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
      );
      return { success: true };
    } catch (error) {
      console.log('xxxx');
      console.log(error);
      return { success: false, error };
    }
  }

  public async getEventById(
    id: string,
  ): Promise<{ event: IEvent | null; error?: any }> {
    try {
      const event = await EventModel.findById(id);
      return { event };
    } catch (error) {
      return { event: null, error };
    }
  }

  public async getAllEvents(
    queryParams: QueryParams,
  ): Promise<{ events: IEvent[]; error?: any }> {
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
      return { events };
    } catch (error) {
      return { events: [], error };
    }
  }

  public async getEventsByStoreId(
    storeId: string,
    queryParams: QueryParams,
  ): Promise<{ events: IEvent[]; error?: any }> {
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
      return { events };
    } catch (error) {
      return { events: [], error };
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
    } catch (error) {
      return [];
    }
  }
}
