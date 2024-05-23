import { Router } from 'express';
import EventController from '@/controllers/eventController';
import { jwtAuthenticator } from '../middlewares/auth';

const router = Router();

router.get('/events', EventController.getEventList);
router.get(
  '/events/:eventId',
  jwtAuthenticator,

  EventController.getEventDetail,
);
router.patch(
  '/event/:eventId',
  jwtAuthenticator,

  EventController.updatedEvent,
);
router.post(
  '/event',
  jwtAuthenticator,

  EventController.createEvent,
);
router.get('/:shopId/event', EventController.updateOrder);
router.patch(
  '/events/:eventId/publish',
  jwtAuthenticator,

  EventController.publishEvent,
);
router.patch(
  '/events/:eventId/unpublish',
  jwtAuthenticator,

  EventController.unpublishEvent,
);

export default router;
//TODO: query
//TODO: 確認currentParticipantsCount人數
