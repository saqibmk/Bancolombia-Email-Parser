import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

class WithdrawSummary extends Component {
  render() {
    return (
      <Card title="Withdraws" extra={this.props.totalInText}>
        <Row>
          <Col span={8}>Withdraws: </Col>
          <Col span={8} offset={8}>
            <div style={{ textAlign: 'right' }}>{this.props.totalInNumber}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default WithdrawSummary;
