import React, { Component } from 'react';
import parseCurrency from '../helpers';
import numeral from 'numeral';
import PurchaseSummary from './Purchases';
import PaymentsSummary from './Payments';
import WithdrawSummary from './Withdraws';
import TransferSummary from './Transfers';
import GrandTotal from './GrandTotal';

import { Layout, Row, Col, Divider } from 'antd';
const { Content } = Layout;

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      credit: [],
      totalCredit: 0,
      totalDebit: 0,
      totalPurchaseAmount: 0,
      totalWithdraws: 0,
      totalBills: 0,
      totalCards: 0,
      totalPayments: 0,
      totalTransfers: 0,
      grandTotal: 0,
    };
  }
  getTotalCompras(compras) {
    const credit = compras.tcred.reduce((total, purchase) => {
      return total + parseCurrency(purchase.amount);
    }, 0);
    const debit = compras.tdeb.reduce((total, purchase) => {
      return total + parseCurrency(purchase.amount);
    }, 0);
    this.setState({ totalCredit: credit, totalDebit: debit });
    this.setState({ totalPurchaseAmount: credit + debit });
  }
  getTotalPayments(pagos) {
    const bills = pagos.bills.reduce((total, purchase) => {
      return total + parseCurrency(purchase.amount);
    }, 0);
    const cards = pagos.cards.reduce((total, purchase) => {
      return total + parseCurrency(purchase.amount);
    }, 0);
    this.setState({ totalCards: cards, totalBills: bills });
    this.setState({ totalPayments: bills + cards });
  }
  getTotalWithdraws(withdraws) {
    const total = withdraws.reduce((total, purchase) => {
      return total + parseCurrency(purchase.amount);
    }, 0);
    this.setState({ totalWithdraws: total });
  }
  getTotalTranfers(transfers) {
    const total = transfers.reduce((total, purchase) => {
      return total + parseCurrency(purchase.amount);
    }, 0);
    this.setState({ totalTransfers: total });
  }
  componentDidMount() {
    fetch('/api/transactions/compras')
      .then(results => results.json())
      .then(data => {
        this.setState({ credit: data.transactions.tcred });
        this.getTotalCompras(data.transactions);
      });
    fetch('/api/transactions/retiros')
      .then(results => results.json())
      .then(data => {
        this.getTotalWithdraws(data.transactions);
      });
    fetch('/api/transactions/pagos')
      .then(results => results.json())
      .then(data => {
        this.getTotalPayments(data.transactions);
      });
    fetch('/api/transactions/transfers')
      .then(results => results.json())
      .then(data => {
        this.getTotalTranfers(data.transactions);
      });
  }
  render() {
    const grandTotal =
      this.state.totalPurchaseAmount +
      this.state.totalPayments +
      this.state.totalWithdraws +
      this.state.totalWithdraws;

    return (
      <Layout>
        <Content>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row type="flex" justify="center">
              <Col span={6}>
                <GrandTotal
                  total={numeral(grandTotal).format('$0,0.00')}
                  readable={numeral(grandTotal).format('($ 0.00 a)')}
                />
              </Col>
            </Row>
            <Divider />
            <Row gutter={16} type="flex" justify="space-around" align="top">
              <Col span={6}>
                <PurchaseSummary
                  creditAmount={numeral(this.state.totalCredit).format('$0,0.00')}
                  debitAmount={numeral(this.state.totalDebit).format('$0,0.00')}
                  totalAmount={numeral(this.state.totalPurchaseAmount).format('($ 0.00 a)')}
                />
              </Col>
              <Col span={6}>
                <PaymentsSummary
                  totalCards={numeral(this.state.totalCards).format('$0,0.00')}
                  totalBills={numeral(this.state.totalBills).format('$0,0.00')}
                  totalAmount={numeral(this.state.totalPayments).format('($ 0.00 a)')}
                />
              </Col>
              <Col span={6}>
                <WithdrawSummary
                  totalInNumber={numeral(this.state.totalWithdraws).format('$0,0.00')}
                  totalInText={numeral(this.state.totalWithdraws).format('($ 0.00 a)')}
                />
              </Col>
              <Col span={6}>
                <TransferSummary
                  totalInNumber={this.state.totalTransfers}
                  totalInText={this.state.totalTransfers}
                />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Summary;
