"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRouter_1 = require("./baseRouter");
const reviewController_1 = require("@/controllers/reviewController");
const auth_1 = require("@/middlewares/auth");
class ReviewRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.controller = new reviewController_1.ReviewController();
        this.setRouters();
    }
    setRouters() {
        this.router.post('/', auth_1.jwtAuthenticator, this.handleRequest(this.controller.createReview.bind(this.controller)));
        this.router.get('/', auth_1.jwtAuthenticator, this.handleRequest(this.controller.getAllReviews.bind(this.controller)));
    }
}
exports.default = new ReviewRouter().router;
//# sourceMappingURL=review.js.map