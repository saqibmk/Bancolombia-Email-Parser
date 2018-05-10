import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

class TransferSummary extends Component {
  render() {
    return (
      <Card title="Transfers" extra={`~${this.props.totalInText}`}>
        <Row>
          <Col span={8}>Transfers: </Col>
          <Col span={8} offset={8}>
            <div style={{ textAlign: 'right' }}>{this.props.totalInNumber}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default TransferSummary;
