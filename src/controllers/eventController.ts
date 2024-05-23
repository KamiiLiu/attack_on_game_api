import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import eventValidator from '@/validators/eventValidator';
import eventService from '@/services/eventService';

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
      const event = await eventService.findEvent(eventId, res, true);
      if (event) res.json(event);
    } catch (error) {
      next(error);
    }
  },

  async updatedEvent(req: Request, res: Response, next: NextFunction) {
    try {
      if (!handleValidationErrors(req, res)) return;
      const { eventId } = req.params;
      const updatedEvent = await eventService.updateEvent(eventId, req.body);
      res.json(updatedEvent);
    } catch (error) {
      next(error);
    }
  },
};

export default EventController;
