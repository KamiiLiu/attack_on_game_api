import { Schema, Document, model } from 'mongoose';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
export interface IComment extends Document {
  author: Schema.Types.ObjectId;
  authorName: string;
  avatar: string;
  eventId: string;
  storeId: Schema.Types.ObjectId;
  storeName: string;
  content: string;
  createAt: string;
  type: string;
  messageId: Schema.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  eventId: {
    type: String,
    ref: 'events',
    required: true,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'stores',
  },
  storeName: {
    type: String,
    ref: 'stores',
  },
  content: { type: String, require: true },
  createdAt: { type: String, default: dayjs().format(TIME_FORMATTER) },
  type: { type: String, require: true },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'comments',
  },
});

export const Comment = model<IComment>('comments', CommentSchema);
