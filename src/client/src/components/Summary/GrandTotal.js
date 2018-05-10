import React, { Component } from 'react';
import { Card, Row } from 'antd';

class GrandTotal extends Component {
  render() {
    return (
      <Card title={<div style={{ textAlign: 'center' }}>RUNNING TOTAL</div>}>
        <Row>
          <h1 style={{ textAlign: 'center' }}>{this.props.total} </h1>
          <div style={{ textAlign: 'center' }}>{this.props.readable}</div>
        </Row>
      </Card>
    );
  }
}

export default GrandTotal;
