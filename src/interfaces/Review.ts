
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
    object: string;
    rate: number;
    content: ContentObject[];
}