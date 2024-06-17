import { BaseController } from "./baseController";
import { ReviewService } from "../services/reviewService";
import { ReviewResponseType } from "@/types/ReviewResponseType";


export class ReviewController extends BaseController {
    private reviewService: ReviewService;

    constructor() {
        super(ReviewResponseType);
        this.reviewService = new ReviewService();
    }

    async getAllReviews(queryParams: any) {
        this.handleServiceResponse(() => this.reviewService.getAll(queryParams),
            ReviewResponseType.SUCCESS_REQUEST);
    }

    async createReview(content: any) {
        this.handleServiceResponse(() => this.reviewService.create(content),
            ReviewResponseType.SUCCESS_CREATED);
    }
}