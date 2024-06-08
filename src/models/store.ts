import { Schema, Document, model } from 'mongoose';

export interface IStore extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  avatar: string;
  introduce: string;
  address: string;
  phone: string;
}

const storeSchema: Schema = new Schema({
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

export const Store = model<IStore>('Stores', storeSchema);
