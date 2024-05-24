import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hash } from 'bcrypt';

const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(409).json({ status: false, message: 'User already exists' });
        return;
      }
      const hashedPassword = await hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      res.status(200).json({ status: true, menubar: 'User created' });
    } catch (error) {
      next(error);
    }
  },
  async updated(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
        return;
      }
      await User.findByIdAndUpdate(req.params.id, { name });
      res.status(200).json({ status: true, message: 'User updated' });
    } catch (error) {
      next(error);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
        return;
      }
      res.status(200).json({ status: true, data: user });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
