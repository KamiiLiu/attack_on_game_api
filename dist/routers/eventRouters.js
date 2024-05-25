'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const eventController_1 = __importDefault(
  require('@/controllers/eventController'),
);
const auth_1 = require('../middlewares/auth');
const router = (0, express_1.Router)();
router.get(
  '/events/:eventId',
  auth_1.jwtAuthenticator,
  eventController_1.default.getEventDetail,
);
router.patch(
  '/event/:eventId',
  auth_1.jwtAuthenticator,
  eventController_1.default.updatedEvent,
);
// router.get('/events', EventController.getEventList);
router.post('/event', eventController_1.default.createEvent);
// router.get('/:shopId/event', EventController.updateOrder);
// router.patch(
//   '/events/:eventId/publish',
//   jwtAuthenticator,
//   EventController.publishEvent,
// );
// router.patch(
//   '/events/:eventId/unpublish',
//   jwtAuthenticator,
//   EventController.unpublishEvent,
// );
exports.default = router;
//TODO: query
//TODO: 如何確認currentParticipantsCount人數?應該寫在eventUtils
