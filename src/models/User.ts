import { hash } from 'bcrypt';
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

// hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = await hash(user.password, 10);
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
