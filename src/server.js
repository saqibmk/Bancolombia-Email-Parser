import express from 'express';
import { getCreds, getTransactions } from './db';
import { getAuthTokenWithCode } from './auth';
import bodyParser from 'body-parser';
import parseEmail from './parser';
import emailSync from './emails';
import initDB, { saveCreds, setLastRun, getLastRun } from './db';
import { getZeroMonth } from './helpers';

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'The backend is alive' });
});

app.get('/api/auth/status', async (req, res) => {
  const creds = await getCreds();
  res.send({
    authReq: creds === undefined,
    lastRun: getLastRun()
  });
});

app.get('/api/transactions/sync', async (req, res) => {
  try {
    const emailsSyncedCount = await emailSync();
    if (emailsSyncedCount > 0) await parseEmail();
    const lastRun = getLastRun();
    return status(200).send({
      newTransactionsCount: emailsSyncedCount,
      lastRun
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const authToken = await getAuthTokenWithCode(req.body.code);
    initDB();
    setLastRun(getZeroMonth());
    saveCreds(authToken);
    res
      .send({
        success: true
      })
      .status(200);
  } catch (error) {
    res.status(401).send({ error });
  }
});

app.get('/api/transactions/:type/:subtype?', (req, res) => {
  const { type, subtype } = req.params;
  if (type === 'all') {
    const compras = getTransactions('compras');
    const retiros = getTransactions('retiros');
    const pagos = getTransactions('pagos');
    const transfers = getTransactions('transfers');
    const transactions = {
      compras,
      retiros,
      pagos,
      transfers
    };
    return res.status(200).send({ transactions });
  }
  const filter = subtype ? `${type}.${subtype}` : type;
  res.send({ transactions: getTransactions(filter) });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
