import app from '../app';
import { Request, Response } from 'express';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`你現在收看的是http://localhost:${PORT}`);
});
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: '莎莎給油!' });
});
