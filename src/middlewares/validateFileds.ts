import { Request, Response, NextFunction } from 'express';

export const validateFileds = (allowedFileds: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = [];
    const bodyKeys = Object.keys(req.body);

    // check each key of body
    bodyKeys.forEach((key) => {
      if (!allowedFileds.includes(key)) {
        errors.push({
          msg: `Unexpected field ${key}`,
          param: key,
        });
      }
    });

    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    next();
  };
};
