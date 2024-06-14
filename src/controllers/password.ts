import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getUser } from '@/utils/help';
import { sendEamilValidationCode } from '@/utils/help';

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { to, fronEndUrl } = req.body;

    const user = await User.findOne({ email: to });

    if (!user) {
      res.status(404).json({ status: false, message: 'User not found' });
      return;
    }

    const validateCode = Math.floor(100000 + Math.random() * 900000).toString();
    const validationToken = jwt.sign(
      { email: user.email, emailCode: validateCode },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    user.emailCode = validateCode;
    await user.save();

    await sendEamilValidationCode(to, validationToken, fronEndUrl);
    res.status(200).json({ status: true, message: 'Email sent' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { validationToken, newPassword } = req.body;

    type Decoded = {
      email: string;
      emailCode: string;
    };

    const decoded = jwt.verify(
      validationToken,
      process.env.JWT_SECRET!,
    ) as Decoded;
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      res.status(404).json({ status: false, message: 'User not found' });
      return;
    }

    if (user.emailCode !== decoded.emailCode) {
      res.status(400).json({ status: false, message: 'Invalid code' });
      return;
    }
    user.password = newPassword;
    user.emailCode = '';
    await user.save();

    res.status(200).json({ status: true, message: 'Password has be reseted' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(getUser(req)._id);

    if (!user) {
      res.status(404).json({ status: false, message: 'User not found' });
      return;
    }

    const isPasswordValid = compare(oldPassword, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ status: false, message: 'Invalid password' });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: true, message: 'Password changed' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ status: false, message: err.message });
  }
};
