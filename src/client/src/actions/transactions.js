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

export default function fetchTransactions() {
  return (dispatch) => {
    dispatch('item is loading');
  };
}
