import app from '../app';
import { Request, Response } from 'express';
import connectDB from '../utils/connectDB';
import Router from '../routers';
import passport from 'passport';
import 'module-alias/register';
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.use(passport.initialize());
  app.use('/api/v1', Router);

  app.listen(PORT, () => {
    console.log(`你現在收看的是http://localhost:${PORT}`);
  });
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: '莎莎給油!' });
  });
});
