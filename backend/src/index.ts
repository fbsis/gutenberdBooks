import express from 'express';

const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 