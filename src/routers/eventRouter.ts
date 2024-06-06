import { BaseRouter } from '@/routers/baseRouter';
import { EventController } from '@/controllers/eventController';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import { EventValidator } from '@/validators/eventValidator';
class EventRouter extends BaseRouter {
  protected controller!: EventController;
  constructor() {
    super();
    this.initializeRoutes();
  }
  protected initializeRoutes(): void {
    this.controller = new EventController();
    this.setRouters();
  }
  protected setRouters(): void {
    this.router.post(
      '/',
      EventValidator.validateEvent(),
      handleValidationErrors,
      this.handleRequest(this.controller.createEvent),
    );
    this.router.get(
      '/',
      EventValidator.validateEventQuery(),
      handleValidationErrors,
      this.handleRequest(this.controller.getEvents),
    );
    this.router.get(
      '/store/:storeId/',
      EventValidator.validateEventQuery(),
      EventValidator.validateObjectIds('storeId'),
      handleValidationErrors,
      this.handleRequest(this.controller.getEventsByStore),
    );
    this.router.get(
      '/:id',
      EventValidator.validateObjectIds('id'),
      handleValidationErrors,
      this.handleRequest(this.controller.getEventDetail),
    );
    this.router.get(
      '/:id/summary',
      EventValidator.validateObjectIds('id'),
      handleValidationErrors,
      this.handleRequest(this.controller.getEventSummary),
    );
    /* */
    this.router.patch(
      '/:id',
      EventValidator.validateObjectIds('id'),
      EventValidator.validateEvent(),
      handleValidationErrors,
      this.handleRequest(this.controller.updateEvent),
    );
    // this.router.put(
    //   '/:id/deactivate',
    //   this.handleRequest(this.controller.deactivateEvent),
    // );
    this.router.get(
      '/myevents',
      this.handleRequest(this.controller.getOwnEvent),
    );
  }
}
export default new EventRouter().router;
