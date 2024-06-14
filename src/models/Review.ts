import mongoose from 'mongoose';
const { Schema } = mongoose;

interface ContentObject {
    rate: number;
    author: string;
    // orderNo: string;
    // eventId: string;
    content: string;
    createTime: Date;
}

interface ReviewObject {
    object: string;
    rate: number;
    content: ContentObject[];
}


// 定義 ContentObject 的 Schema
const ContentObjectSchema = new Schema({
    rate: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // orderNo: { type: Schema.Types.ObjectId, required: true },
    // eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    content: { type: String, required: true },
    createTime: { type: Date, default: Date.now }
});

// 定義 ReviewObject 的 Schema，並將 ContentObjectSchema 嵌入其中
const ReviewObjectSchema = new Schema({
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    rate: { type: Number, required: true },
    content: [ContentObjectSchema] // 嵌入 ContentObjectSchema
});

// 創建模型
const ReviewObject = mongoose.model('ReviewObject', ReviewObjectSchema);

export { ReviewObject };