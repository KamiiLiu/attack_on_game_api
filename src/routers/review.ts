
import { BaseRouter } from './baseRouter';
import { ReviewController } from '@/controllers/reviewController';
import { ReviewValidator } from '@/validators/reviewValidator';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import { jwtAuthenticator } from '@/middlewares/auth';

class ReviewRouter extends BaseRouter {
    protected controller!: ReviewController;
    constructor() {
        super();
        this.initializeRoutes();
    }
    protected initializeRoutes(): void {
        this.controller = new ReviewController();
        this.setRouters();
    }
    protected setRouters(): void {
        this.router.post(
            '/',
            jwtAuthenticator,
            this.handleRequest(this.controller.createReview.bind(this.controller)),
        );
        this.router.get(
            '/',
            jwtAuthenticator,
            this.handleRequest(this.controller.getAllReviews.bind(this.controller)),
        );
    }
}

export default new ReviewRouter().router;