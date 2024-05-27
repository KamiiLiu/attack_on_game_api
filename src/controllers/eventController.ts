import { Request, Response } from 'express';

const EventController = {
  async createEvent(req: Request, res: Response) {
    console.log('create event', req, res);
  },
};

export default EventController;
