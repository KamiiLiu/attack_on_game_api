import { ReviewDocument } from "@/interfaces/Review";
import { IBaseRepository } from "./IBaseRepository";
import { ReviewModel } from "@/models/Review";
import _ from 'lodash';
import { CustomError } from "@/errors/CustomError";
import { CustomResponseType } from "@/enums/CustomResponseType";
import { MONGODB_ERROR_MSG } from "@/types/OtherResponseType";

export class ReviewRepository implements IBaseRepository<ReviewDocument> {

    async findById(id: string): Promise<ReviewDocument> {
        throw new Error("Method not implemented.");
    }
    async findAll(queryParams: any): Promise<ReviewDocument[]> {
        try {
            const reviews = await ReviewModel.find(queryParams);
            if (_.isEmpty(reviews)) {
                throw new Error("No reviews found");
            }
            return reviews;

        } catch (error: any) {
            throw new CustomError(
                CustomResponseType.DATABASE_OPERATION_FAILED,
                `${MONGODB_ERROR_MSG}:${error.message || error}`,
            );
        }
    }
    async create(content: ReviewDocument): Promise<boolean> {
        try {
            ReviewModel.create(content);
            return true;
        } catch (error: any) {
            throw new CustomError(
                CustomResponseType.DATABASE_OPERATION_FAILED,
                `${MONGODB_ERROR_MSG}:${error.message || error}`,
            );
        }
    }
    async update(content: ReviewDocument): Promise<ReviewDocument | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<ReviewDocument> {
        throw new Error("Method not implemented.");
    }
}