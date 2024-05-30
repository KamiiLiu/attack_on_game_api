import { Request } from 'express';
import { IUser } from '../models/User';
import { RequestWithUser } from '../types/commonRequest';

function isRequestWithUser(req: any): req is RequestWithUser {
  return req.user !== undefined;
}

export const getUser = (req: Request) => {
  if (!isRequestWithUser(req)) {
    throw new Error('User not found');
  }
  const user = req.user as IUser;
  return user;
};
