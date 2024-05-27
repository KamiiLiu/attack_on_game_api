import passport from '../config/passport';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
import { RequestWithUser } from '../types/commonRequest';


interface AuthInfo {
  message: string;
}

const localAuthenticator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: IUser, info: AuthInfo) => {
      if (err || !user) {
        res.status(401).json({ status: false, message: info.message });
        return;
      }
      (req as RequestWithUser).user = user;
      next();
    },
  )(req, res, next);
};

const jwtAuthenticator = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUser) => {
      if (err || !user) {
        res.status(401).json({ status: false, message: 'It is wrong token ' });
        return;
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};

export { jwtAuthenticator, localAuthenticator };
