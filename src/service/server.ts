import app from '../app';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`你現在收看的是http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.send('莎莎給油~');
  });