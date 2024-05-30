import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  user: Types.ObjectId;
  phone: string;
  avatar: string;
  preferGame: Array<string>;
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  preferGame: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);
