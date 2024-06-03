import { BaseRouter } from '@/routers/baseRouter';
import { EventController } from '@/controllers/eventController';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import eventValidator from '@/validators/eventValidator';
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
      eventValidator,
      handleValidationErrors,
      this.handleRequest(this.controller.createEvent),
    );
    this.router.get('/', this.handleRequest(this.controller.getEvents));
    this.router.get(
      '/store/:storeId/',
      this.handleRequest(this.controller.getEventsByStore),
    );
    this.router.get('/:id', this.handleRequest(this.controller.getEventDetail));
    this.router.get(
      '/:id/summary',
      this.handleRequest(this.controller.getEventSummary),
    );
    /* */
    this.router.patch('/:id', this.handleRequest(this.controller.updatedEvent));
    // this.router.put(
    //   '/:id/deactivate',
    //   this.handleRequest(this.controller.deactivateEvent),
    // );
  }
}
export default new EventRouter().router;
