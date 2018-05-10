import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

class PaymentsSummary extends Component {
  render() {
    return (
      <Card title="Payments" extra={`~${this.props.totalAmount}`}>
        <Row>
          <Col span={8}>Bills: </Col>
          <Col span={8} offset={8}>
            <div style={{ textAlign: 'right' }}>{this.props.totalBills}</div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Cards: </Col>
          <Col span={8} offset={8}>
            <div style={{ textAlign: 'right' }}>{this.props.totalCards}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default PaymentsSummary;
