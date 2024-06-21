import { Schema, Document, model } from 'mongoose';

export interface IComment extends Document {
  event: Schema.Types.ObjectId;
  createAt: Date;
}

const commentSchema: Schema = new Schema({
  name: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  avatar: String,
  introduce: String,
  address: String,
  phone: String,
});

export const Store = model<IComment>('Comments', commentSchema);
