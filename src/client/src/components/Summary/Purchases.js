import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

class PurchaseSummary extends Component {
  render() {
    return (
      <Card title="Purchases" extra={`~${this.props.totalAmount}`}>
        <Row>
          <Col span={8}>Debit Card: </Col>
          <Col span={8} offset={8}>
            <div style={{ textAlign: 'right' }}>{this.props.creditAmount}</div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Credit Card: </Col>
          <Col span={8} offset={8}>
            <div style={{ textAlign: 'right' }}>{this.props.debitAmount}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default PurchaseSummary;
