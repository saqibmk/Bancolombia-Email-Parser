import initialState from './initialState';
import parseCurrency from '../helpers';

export function returnTotalAmount(arr) {
  return arr.reduce((total, current) => total + parseCurrency(current.amount), 0);
}

function updateSummary(state) {
  const {
    compras = {}, retiros = [], pagos = {}, transfers = [],
  } = state.transactions;

  const totalDebitPurchase = returnTotalAmount(compras.tdeb || []);
  const totalCreditPurchase = returnTotalAmount(compras.tcred || []);
  const totalBillPayment = returnTotalAmount(pagos.bills || []);
  const totalCardPayment = returnTotalAmount(pagos.cards || []);
  const totalWithdraws = returnTotalAmount(retiros || []);
  const totalTransfers = returnTotalAmount(transfers || []);

  return {
    ...state,
    summary: {
      totalDebitPurchase,
      totalCreditPurchase,
      totalPurchases: totalDebitPurchase + totalCreditPurchase,
      totalBillPayment,
      totalCardPayment,
      totalPayments: totalBillPayment + totalCardPayment,
      totalWithdraws,
      totalTransfers,
      grandTotal:
        totalDebitPurchase +
        totalCreditPurchase +
        totalBillPayment +
        totalCardPayment +
        totalWithdraws +
        totalTransfers,
    },
  };
}

export default function summary(state = initialState.summary, action = {}) {
  switch (action.type) {
    case 'UPDATE_SUMMARY':
      return updateSummary(state);
    default:
      return state;
  }
}
