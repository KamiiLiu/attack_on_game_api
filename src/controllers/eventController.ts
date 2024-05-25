import { Request, Response } from 'express';
import EventService from '@/services/eventService';
import { handleResult, handleServerError } from '@/utils/responseHandlers';
const EventController = {
  async getEventList(req: Request, res: Response) {
    try {
      const result = await EventService.findEventList(req.query);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
  async getEventDetail(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const isPublish: boolean = req.query.isPublish === 'true';
      const result = await EventService.findEventByEventId(eventId, isPublish);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
  async getEventsByShop(req: Request, res: Response) {
    try {
      const isPublish: boolean = req.query.isPublish === 'true';
      const { storeId } = req.params;
      const result = await EventService.findShopEvent(storeId, isPublish);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
  async updatedEvent(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const result = await EventService.updateEvent(eventId, req.body);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
  async createEvent(req: Request, res: Response) {
    try {
      const storeId = '665185043aae4f4d91cc4c25';
      const eventData = { ...req.body, storeId };
      const result = await EventService.createEvent(eventData);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
  async publishEvent(req: Request, res: Response) {
    try {
      const { eventId } = req.body;
      const result = await EventService.updatePublishStatus(eventId, true);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
  async unpublishEvent(req: Request, res: Response) {
    try {
      const { eventId } = req.body;
      const result = await EventService.updatePublishStatus(eventId, false);
      handleResult(result, res);
    } catch (error) {
      handleServerError(error);
    }
  },
};

export default EventController;
