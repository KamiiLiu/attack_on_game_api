import { Router } from 'express';
import EventController from '@/controllers/eventController';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import eventValidator from '@/validators/eventValidator';
const router = Router();
router.post(
  '/',
  eventValidator,
  handleValidationErrors,
  EventController.createEvent,
);
export default router;
