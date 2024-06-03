"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseRouter_1 = require("@/routers/baseRouter");
const eventController_1 = require("@/controllers/eventController");
const handleValidationErrors_1 = require("@/middlewares/handleValidationErrors");
const eventValidator_1 = __importDefault(require("@/validators/eventValidator"));
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
        this.router.post('/', eventValidator_1.default, handleValidationErrors_1.handleValidationErrors, this.handleRequest(this.controller.createEvent));
        this.router.get('/', this.handleRequest(this.controller.getEvents));
        this.router.get('/store/:storeId/', this.handleRequest(this.controller.getEventsByStore));
        this.router.get('/:id', this.handleRequest(this.controller.getEventDetail));
        this.router.get('/:id/summary', this.handleRequest(this.controller.getEventSummary));
        /* */
        this.router.patch('/:id', this.handleRequest(this.controller.updatedEvent));
        // this.router.put(
        //   '/:id/deactivate',
        //   this.handleRequest(this.controller.deactivateEvent),
        // );
    }
}
exports.default = new EventRouter().router;
//# sourceMappingURL=eventRouter.js.map