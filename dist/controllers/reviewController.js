"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const baseController_1 = require("./baseController");
const reviewService_1 = require("../services/reviewService");
const ReviewResponseType_1 = require("@/types/ReviewResponseType");
const help_1 = require("@/utils/help");
class ReviewController extends baseController_1.BaseController {
    constructor() {
        super(ReviewResponseType_1.ReviewResponseType);
        this.reviewService = new reviewService_1.ReviewService();
    }
    getAllReviews(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleServiceResponse(() => this.reviewService.getAll(req.params.storeId), ReviewResponseType_1.ReviewResponseType.SUCCESS_REQUEST);
        });
    }
    createReview(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (0, help_1.getUser)(req);
            req.body.userId = user.id;
            const content = req.body;
            return this.handleServiceResponse(() => this.reviewService.create(content), ReviewResponseType_1.ReviewResponseType.SUCCESS_REQUEST);
        });
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=reviewController.js.map