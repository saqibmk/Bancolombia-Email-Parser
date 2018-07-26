// componentDidMount() {
//   fetch('/api/transactions/compras')
//     .then(results => results.json())
//     .then(data => {
//       this.setState({ credit: data.transactions.tcred });
//       this.getTotalCompras(data.transactions);
//     });
//   fetch('/api/transactions/retiros')
//     .then(results => results.json())
//     .then(data => {
//       this.getTotalWithdraws(data.transactions);
//     });
//   fetch('/api/transactions/pagos')
//     .then(results => results.json())
//     .then(data => {
//       this.getTotalPayments(data.transactions);
//     });
//   fetch('/api/transactions/transfers')
//     .then(results => results.json())
//     .then(data => {
//       this.getTotalTranfers(data.transactions);
//     });
// }

export const SYNCING_TRANSACTIONS = "SYNCING_TRANSACTIONS";
export const DONE_SYNCING_TRANSACTIONS = "DONE_SYNCING_TRANSACTIONS";
export const ERROR_SYNCING_TRANSACTIONS = "ERROR_SYNCING_TRANSACTIONS";
export const NO_NEW_TRANSACTIONS = "NO_NEW_TRANSACTIONS";
export const UPDATE_LAST_SYNC_RUN = "UPDATE_LAST_SYNC_RUN";

// export const UPDATING_TRANSACTIONS = "UPDATING_TRANSACTIONS";

export const syncTransactions = () => ({
  type: SYNCING_TRANSACTIONS
});

export const doneSyncingTransaction = data => ({
  type: DONE_SYNCING_TRANSACTIONS,
  data
});

export const noNewTransactions = () => ({
  type: NO_NEW_TRANSACTIONS
});

export const errorSyncingTransactions = () => ({
  type: ERROR_SYNCING_TRANSACTIONS
});

export const updateLastRun = data => ({
  type: UPDATE_LAST_SYNC_RUN,
  data
});

export default function fetchTransactions() {
  return dispatch => {
    dispatch(syncTransactions());
    fetch("/api/transactions/sync")
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        if (data.newTransactions === 0) dispatch(noNewTransactions());
        dispatch(doneSyncingTransaction(data));
      })
      .catch(error => dispatch(errorSyncingTransactions()));
  };
}
