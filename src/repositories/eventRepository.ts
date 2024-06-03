import EventModel from '@/models/EventModel';
import { EventDTO } from '@/dto/event/eventDTO';
import { IEvent } from '@/interfaces/EventInterface';
import { Request } from 'express';
import { EventQuery } from '@/queries/EventQuery';
import { DefaultQuery } from '@/enums/eventRequest';
export class EventRepository {
  private readonly defaultLimit: number;
  private readonly defaultSkip: number;

  constructor() {
    this.defaultLimit = DefaultQuery.LIMIT;
    this.defaultSkip = DefaultQuery.SKIP;
  }
  public async createEvent(content: Partial<EventDTO>): Promise<boolean> {
    try {
      const event = new EventModel(content);
      await event.save();
      return true;
    } catch (error) {
      return false;
    }
  }
  public async updatedEvent(id: string, content: EventDTO): Promise<boolean> {
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
  public async getAllEvents(req: Request): Promise<IEvent[]> {
    const {
      truthLimit,
      truthSkip,
      truthFormationStatus,
      truthRegistrationStatus,
    } = this.parseQueryParams(req);
    const eventQuery = new EventQuery(req.query, {
      forStatus: truthFormationStatus,
      regStatus: truthRegistrationStatus,
    });
    const query = eventQuery.buildEventQuery();
    return this._getEventsData(query, truthSkip, truthLimit);
  }
  public async getEventsByStoreId(
    storeId: string,
    req: Request,
  ): Promise<IEvent[]> {
    const {
      truthLimit,
      truthSkip,
      truthFormationStatus,
      truthRegistrationStatus,
    } = this.parseQueryParams(req);
    const eventQuery = new EventQuery(
      { storeId, ...req.query },
      {
        forStatus: truthFormationStatus,
        regStatus: truthRegistrationStatus,
      },
    );
    const query = eventQuery.buildEventQuery();
    return this._getEventsData(query, truthSkip, truthLimit);
  }
  private async _getEventsData(
    eventQuery: any,
    skip: number,
    limit: number,
  ): Promise<IEvent[]> {
    const eventData = await EventModel.find(eventQuery)
      .skip(skip)
      .limit(limit)
      .sort({ eventStartTime: 1 })
      .exec();
    return eventData || [];
  }
  private parseQueryParams(req: Request) {
    const {
      limit = DefaultQuery.LIMIT,
      skip = DefaultQuery.SKIP,
      formationStatus = DefaultQuery.FOR_STATUS,
      registrationStatus = DefaultQuery.REG_STATUS,
    } = req.query || {};

    const truthLimit = Math.min(Number(limit), DefaultQuery.MAX_LIMIT);
    const truthSkip = Number(skip);
    const truthFormationStatus = Number(formationStatus);
    const truthRegistrationStatus = Number(registrationStatus);

    return {
      truthLimit,
      truthSkip,
      truthFormationStatus,
      truthRegistrationStatus,
    };
  }
}
