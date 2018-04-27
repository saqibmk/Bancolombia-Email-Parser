import {
  getSnippets,
  saveCompra,
  savePagoBills,
  savePagoCards,
  saveRetiro,
  saveTransfers,
} from '../db';
import { getTime, getDate, getAmount, getPlace } from './helpers';
import { clearSnippet } from '../db';

const emailParser = async () => {
  const snippets = getSnippets();
  snippets.map(snippet => {
    if (snippet.match(/Compra/g)) parseAndSaveCompra(snippet);
    if (snippet.match(/Retiro/g)) parseAndSaveRetiro(snippet);
    if (snippet.match(/Pago/g)) parseAndSavePago(snippet);
    if (snippet.match(/Transferencia/g)) parseTransfers(snippet);
  });
  await clearSnippet();
};

const parseAndSaveCompra = snippet => {
  saveCompra({
    amount: getAmount(snippet),
    timeOfPurchase: getTime(snippet),
    dateOfPurchase: getDate(snippet),
    placeOfPurchase: getPlace(snippet),
    cardType: snippet.match(/T\.(.*?)(?=\s)/g)[0],
    cardNumber: snippet.match(/\*[^.]*/g)[0],
  });
};

const parseAndSaveRetiro = snippet => {
  saveRetiro({
    amount: getAmount(snippet),
    timeOfPurchase: getTime(snippet),
    dateOfPurchase: getDate(snippet),
    placeOfPurchase: getPlace(snippet),
    cardType: snippet.match(/T\.(.*?)(?=\s)/g)[0],
    cardNumber: snippet.match(/\*[^.]*/g)[0],
  });
};

const parseAndSavePago = snippet => {
  const amount = getAmount(snippet);
  const timeOfPayment = getTime(snippet);
  const dateOfPayment = getDate(snippet);
  if (snippet.match(/Pago de/g)) {
    const fromAccountNumber = snippet.match(/\*\d{4}/g)[0];
    const toAccountNumber = snippet.match(/\*\d{4}/g)[1];
    savePagoCards({
      amount,
      fromAccountNumber,
      toAccountNumber,
      timeOfPayment,
      dateOfPayment,
    });
  } else {
    const paidTo = snippet.match(/(?<=\sa\s).*(?=\sdesde)/g)[0];
    const fromAccountNumber = snippet.match(/\*\d{4}/g)[0];
    savePagoBills({
      amount,
      fromAccountNumber,
      timeOfPayment,
      dateOfPayment,
      paidTo,
    });
  }
};

const parseTransfers = snippet => {
  const dateOfTransfer = getDate(snippet);
  const timeOfTransfer = getTime(snippet);
  const amount = getAmount(snippet);
  const fromAccountNumber = snippet.match(/\*\d{4}/g)[0];
  const toAccountNumber = snippet.match(/\s(\d{11})/g)[0];
  saveTransfers({
    dateOfTransfer,
    timeOfTransfer,
    amount,
    fromAccountNumber,
    toAccountNumber,
  });
};

export default emailParser;
