import React, { Component } from "react";
import parseCurrency from "../../helpers";
import numeral from "numeral";
import PurchaseSummary from "./Purchases";
import PaymentsSummary from "./Payments";
import WithdrawSummary from "./Withdraws";
import TransferSummary from "./Transfers";
import GrandTotal from "./GrandTotal";
import SyncCard from "./SyncCard";

// import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { Layout, Row, Col, Divider } from "antd";
const { Content } = Layout;

class Summary extends Component {
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
  render() {
    return (
      <Layout>
        <Content>
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <Row type="flex" justify="center">
              <Col span={6}>
                <GrandTotal
                  total={numeral(this.props.summary.grandTotal).format(
                    "$0,0.00"
                  )}
                  readable={numeral(this.props.summary.grandTotal).format(
                    "($ 0.00 a)"
                  )}
                />
              </Col>
              <Col span={4}>
                <SyncCard />
              </Col>
            </Row>
            <Divider />
            <Row gutter={16} type="flex" justify="space-around" align="top">
              <Col span={6}>
                <PurchaseSummary
                  creditAmount={numeral(
                    this.props.summary.totalCreditPurchase
                  ).format("$0,0.00")}
                  debitAmount={numeral(
                    this.props.summary.totalDebitPurchase
                  ).format("$0,0.00")}
                  totalAmount={numeral(
                    this.props.summary.totalPurchases
                  ).format("($ 0.00 a)")}
                />
              </Col>
              <Col span={6}>
                <PaymentsSummary
                  totalCards={numeral(
                    this.props.summary.totalCardPayment
                  ).format("$0,0.00")}
                  totalBills={numeral(
                    this.props.summary.totalBillPayment
                  ).format("$0,0.00")}
                  totalAmount={numeral(this.props.summary.totalPayments).format(
                    "($ 0.00 a)"
                  )}
                />
              </Col>
              <Col span={6}>
                <WithdrawSummary
                  totalInNumber={numeral(
                    this.props.summary.totalWithdraws
                  ).format("$0,0.00")}
                  totalInText={numeral(
                    this.props.summary.totalWithdraws
                  ).format("($ 0.00 a)")}
                />
              </Col>
              <Col span={6}>
                <TransferSummary
                  totalInNumber={this.props.summary.totalTransfers}
                  totalInText={this.props.summary.totalTransfers}
                />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default connect(state => ({ summary: state.summary }))(Summary);
