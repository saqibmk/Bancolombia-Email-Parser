import express from 'express';
import { getTransactions } from './db';

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'The backend is alive' });
});

app.get('/api/transactions/:type/:subtype?', (req, res) => {
  const { type, subtype } = req.params;
  const filter = subtype ? `${type}.${subtype}` : type;
  res.send({ transactions: getTransactions(filter) });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
