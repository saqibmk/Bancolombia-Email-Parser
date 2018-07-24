import React, { Component } from "react";
import { Table, Layout, Row, Col } from "antd";

const { Content } = Layout;
const columns = [
  {
    title: "Date",
    dataIndex: "dateOfPurchase",
    key: "dateOfPurchase"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Merchant",
    dataIndex: "placeOfPurchase",
    key: "placeOfPurchase"
  },
  {
    title: "Card",
    dataIndex: "cardNumber",
    key: "cardNumber"
  }
];

class TransactionList extends Component {
  constructor() {
    super();
    this.state = {
      credit: [],
      debit: []
    };
  }
  componentDidMount() {
    fetch("/api/transactions/compras")
      .then(results => results.json())
      .then(({ transactions = {} }) => {
        this.setState({
          credit: transactions.tcred || [],
          debit: transactions.tdeb || []
        });
      });
  }
  render() {
    const totalArray = [...this.state.credit, ...this.state.debit];
    const paginationSettings = {
      position: "top",
      pageSize: 30,
      hideOnSinglePage: true
    };
    return (
      <Layout>
        <Content>
          <Row type="flex" justify="center">
            <Col span={20}>
              <Table
                dataSource={totalArray}
                columns={columns}
                pagination={paginationSettings}
                footer={() => {}}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

// footer={() => `Total: ${numeral(this.state.totalCredit).format('$0.0,00')}`}

export default TransactionList;
