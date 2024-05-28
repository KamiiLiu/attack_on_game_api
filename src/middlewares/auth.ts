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
  try {
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
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Internal Server Error:${error}`,
    });
  }
};

const jwtAuthenticator = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      'jwt',
      { session: false },
      (err: Error, user: IUser) => {
        if (err || !user) {
          res.status(401).json({ status: false, message: 'Invalid token' });
          return;
        }
        req.user = user;
        next();
      },
    )(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Internal Server Error:${error}`,
    });
  }
};

export { jwtAuthenticator, localAuthenticator };
