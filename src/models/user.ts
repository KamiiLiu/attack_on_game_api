import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  PLAYER = 'player',
  STORE = 'store',
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
  emailCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  emailCode: { type: String, default: '' },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

// Add updatedAt field before saving
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
