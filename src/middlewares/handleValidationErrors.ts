import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomResponseType } from '@/enums/CustomResponseType';
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: CustomResponseType.VALIDATION_ERROR,
      message: errors.array().map((x) => x.msg),
    });
    return;
  }
  next();
};
