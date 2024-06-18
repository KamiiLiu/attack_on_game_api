'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const eventController_1 = require('@/controllers/eventController');
const handleValidationErrors_1 = require('@/middlewares/handleValidationErrors');
const eventValidator_1 = require('@/validators/eventValidator');
const router = (0, express_1.Router)();
router.post(
  '/',
  eventValidator_1.EventValidator,
  handleValidationErrors_1.handleValidationErrors,
  eventController_1.EventController.createEvent,
);
exports.default = router;
//# sourceMappingURL=event.js.map
