import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { CREDIT_CARD } from '../constants';

const adapter = new FileSync('./db.json');
const db = low(adapter);

const initDB = () => {
  db
    .defaults({
      config: {},
      snippets: [],
      compras: {
        tcred: [],
        tdeb: [],
      },
      retiros: [],
      pagos: {
        bills: [],
        cards: [],
      },
      transfers: [],
    })
    .write();
};

export const saveCreds = (creds) => {
  db.set('config.creds', creds).write();
};

export const getCreds = () => db.get('config.creds').value();
export const clearSnippet = async () => {
  await db.set('snippets', []).write();
};
export const saveSnippet = async (snippet) => {
  await db
    .get('snippets')
    .push(snippet)
    .write();
};

export const getSnippets = () => db.get('snippets').value();
export const getLastRun = () => db.get('config.lastRun').value();
export const setLastRun = unixTimestamp => db.set('config.lastRun', unixTimestamp).write();

export const saveCompra = (compra) => {
  switch (compra.cardType) {
    case CREDIT_CARD:
      db
        .get('compras.tcred')
        .push(compra)
        .write();
      break;

    default:
      db
        .get('compras.tdeb')
        .push(compra)
        .write();
      break;
  }
};

export const saveRetiro = retiro =>
  db
    .get('retiros')
    .push(retiro)
    .write();

export const savePagoBills = pago =>
  db
    .get('pagos.bills')
    .push(pago)
    .write();

export const savePagoCards = pago =>
  db
    .get('pagos.cards')
    .push(pago)
    .write();

export const saveTransfers = transfer =>
  db
    .get('transfers')
    .push(transfer)
    .write();

export const getTransactions = filter => db.get(filter).value();
export default initDB;
