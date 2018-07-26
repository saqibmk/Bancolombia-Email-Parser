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
export const UPDATING_TRANSACTIONS = "UPDATING_TRANSACTIONS";
export const NO_NEW_TRANSACTIONS = "NO_NEW_TRANSACTIONS";
export const DONE_UPDATING_TRANSACTIONS = "DONE_UPDATING_TRANSACTIONS";

export const syncTransactions = () => ({
  type: SYNCING_TRANSACTIONS
});

export const doneSyncingTransaction = () => ({
  type: DONE_UPDATING_TRANSACTIONS
});

export default function fetchTransactions() {
  return dispatch => {
    dispatch(syncTransactions());
    fetch("/api/transactions/sync")
      .then(results => results.json())
      .then(data => console.log(data));

    dispatch(doneSyncingTransaction());
  };
}
