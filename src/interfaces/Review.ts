
import { Document, Types } from 'mongoose';

interface ContentObject {
    rate: number;
    author: string;
    orderNo: string;
    // eventId: string;
    content: string;
    createTime: Date;
}

export interface ReviewDocument extends Document {
    _id: Types.ObjectId;
    idNumber: string;
    storeId: Types.ObjectId;
    rate: number;
    content: ContentObject[];
    createdAt: string;
    updatedAt: string;
}