import app from '../app';
import { Request, Response } from 'express';
import connectDB from '../utils/connectDB';
import UserRouter from '../service/user';
const PORT = process.env.PORT || 3000;

connectDB();

app.use('/user', UserRouter);

app.listen(PORT, () => {
  console.log(`你現在收看的是http://localhost:${PORT}`);
});
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: '莎莎給油!' });
});
