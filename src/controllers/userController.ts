import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { validationResult } from 'express-validator';

const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // check if the request body is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: false, errors: errors.array()[0].msg });
        return;
      }
      const { role, email, password } = req.body;
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(409).json({ status: false, message: 'User already exists' });
        return;
      }
      const hashedPassword = password;
      await User.create({ role, email, password: hashedPassword });
      res.status(200).json({ status: true, menubar: 'User created' });
    } catch (error) {
      next(error);
    }
  },
  async updated(req: Request, res: Response, next: NextFunction) {
    try {
      // check if the request body is valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: false, errors: errors.array()[0].msg });
        return;
      }
      const { password } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ status: false, message: 'User not found' });
        return;
      }
      await User.findByIdAndUpdate(req.params.id, { password });
      res.status(200).json({ status: true, message: 'User updated' });
    } catch (error) {
      next(error);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id, { password: 0 });
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
