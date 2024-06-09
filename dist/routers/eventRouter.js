"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRouter_1 = require("@/routers/baseRouter");
const eventController_1 = require("@/controllers/eventController");
const handleValidationErrors_1 = require("@/middlewares/handleValidationErrors");
const eventValidator_1 = require("@/validators/eventValidator");
class EventRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.controller = new eventController_1.EventController();
        this.setRouters();
    }
    setRouters() {
        this.router.post('/', eventValidator_1.EventValidator.validateEvent(), handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.createEvent));
        this.router.get('/', eventValidator_1.EventValidator.validateEventQuery(), handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.getEvents));
        this.router.get('/store/:storeId/', eventValidator_1.EventValidator.validateEventQuery(), eventValidator_1.EventValidator.validateObjectIds('storeId'), handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.getEventsByStore));
        this.router.get('/:id', eventValidator_1.EventValidator.validateObjectIds('id'), handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.getEventDetail));
        this.router.get('/:id/summary', eventValidator_1.EventValidator.validateObjectIds('id'), handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.getEventSummary));
        /* */
        this.router.patch('/:id', eventValidator_1.EventValidator.validateObjectIds('id'), eventValidator_1.EventValidator.validateEvent(), handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.updateEvent));
        // this.router.put(
        //   '/:id/deactivate',
        //   this.handleRequest(this.controller.deactivateEvent),
        // );
        this.router.get('/myevents', this.handleRequest(this.controller.getOwnEvent));
    }
}
exports.default = new EventRouter().router;
//# sourceMappingURL=eventRouter.js.map