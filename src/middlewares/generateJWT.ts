import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/commonRequest';

const generateJWT = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as RequestWithUser).user;
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  // Now you can use `user` as `IUser`.
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  res.status(200).json({
    status: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
  next();
};

export default generateJWT;
