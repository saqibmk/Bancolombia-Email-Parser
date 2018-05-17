import summary, { returnTotalAmount } from './summary';
import initialState from './initialState';
import { updateSummary } from '../actions/summary';

describe('Summary Reducer', () => {
  it('returnTotalAmount: Should be able to add amounts', () => {
    const transactions = [
      {
        amount: '$1000',
      },
      {
        amount: '$1000',
      },
      {
        amount: '$2000',
      },
    ];
    expect(returnTotalAmount(transactions)).toEqual(4000);
  });

  it('should return default state (ZERO-state)', () => {
    expect(summary()).toEqual(initialState);
  });

  it('should update summary from transactions', () => {
    const expectedSummary = {
      totalDebitPurchase: 1000,
      totalCreditPurchase: 2000,
      totalPurchases: 3000,
      totalBillPayment: 2000,
      totalCardPayment: 2000,
      totalPayments: 4000,
      totalWithdraws: 1500,
      totalTransfers: 2500,
      grandTotal: 11000,
    };
    const transactions = {
      compras: {
        tdeb: [{ amount: '$1000' }],
        tcred: [{ amount: '$2000' }],
      },
      pagos: {
        bills: [{ amount: '$2000' }],
        cards: [{ amount: '$2000' }],
      },
      retiros: [{ amount: '$1500' }],
      transfers: [{ amount: '$2500' }],
    };

    const state = {
      ...initialState,
      transactions,
    };

    const updatedSummary = summary(state, updateSummary());
    expect(updatedSummary.summary).toEqual(expectedSummary);
  });
});
