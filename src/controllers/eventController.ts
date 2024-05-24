import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import eventValidator from '@/validators/eventValidator';
import EventService from '@/services/eventService';

const handleValidationErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return false;
  }
  return true;
};

const EventController = {
  validate: eventValidator,
  async getEventDetail(req: Request, res: Response, next: NextFunction) {
    try {
      if (!handleValidationErrors(req, res)) return;

      const { eventId } = req.params;
      const result = await EventService.findEvent(eventId, true);
      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  },
  async updatedEvent(req: Request, res: Response, next: NextFunction) {
    try {
      if (!handleValidationErrors(req, res)) return;
      const { eventId } = req.params;
      const updatedEvent = await EventService.updateEvent(eventId, req.body);
      res.status(200).json(updatedEvent);
    } catch (error) {
      next(error);
    }
  },
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      if (!handleValidationErrors(req, res)) return;
      const storeId = req.user.storeId;
      const eventData = { ...req.body, storeId };
      const result = await EventService.createEvent(eventData);
      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(201).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  async async publishEvent(req: Request, res: Response, next: NextFunction) {
    try {
      if (!handleValidationErrors(req, res)) return;
      const storeId = req.user.storeId;
      const eventData = { ...req.body, storeId };
      const result = await EventService.createEvent(eventData);
      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }
      res.status(201).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};

export default EventController;
