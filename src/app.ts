import express from 'express';
const app = express();
app.use(express.json());
console.log('你安装成功哩QQ');
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
export default app;
