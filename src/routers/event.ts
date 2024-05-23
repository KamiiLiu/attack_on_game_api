import { Router } from 'express';
import EventController from '@/controllers/eventController';
import { jwtAuthenticator } from '../middlewares/auth';
import eventValidator from '@/validators/eventValidator';
const router = Router();

router.get('/events', eventValidator, EventController.getEventList);
router.post(
  '/events/:eventId',
  jwtAuthenticator,
  eventValidator,
  EventController.createOrder,
);
router.patch(
  '/event/:eventId',
  jwtAuthenticator,
  eventValidator,
  EventController.updatedEvent,
);
router.post(
  '/event',
  jwtAuthenticator,
  eventValidator,
  EventController.createEvent,
);
router.get('/:shopId/event', eventValidator, EventController.updateOrder);
router.patch(
  '/events/:eventId/publish',
  jwtAuthenticator,
  eventValidator,
  EventController.publishEvent,
);
router.patch(
  '/events/:eventId/unpublish',
  jwtAuthenticator,
  eventValidator,
  EventController.unpublishEvent,
);

export default router;
//TODO: query
//TODO: 確認currentParticipantsCount人數
