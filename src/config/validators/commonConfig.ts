import { Types } from 'mongoose';
import { CustomValidator } from 'express-validator';
export const validateObjectIds: CustomValidator = (value: string) => {
  return Types.ObjectId.isValid(value);
};
export const validateNanoidIds: CustomValidator = (value: string) => {
  const nanoidRegex = /^[A-Za-z0-9_-]{21}$/;
  if (!nanoidRegex.test(value)) {
    throw new Error('Invalid ID format');
  }
  return true;
};
