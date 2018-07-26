import React, { Component } from "react";
import { Card, Row, Button, Icon } from "antd";
import SyncMessage from "../SyncMessage";
import { connect } from "react-redux";
import fetchTransactions from "../../actions/transactions";

class SyncCard extends Component {
  render() {
    return (
      <Card>
        <SyncMessage />
        <Row type="flex" justify="center">
          <Button
            onClick={() => {
              console.log("here");
              this.props.fetchTransactions();
              // message.loading("Loading Transactions from email", 0);
            }}
          >
            <Icon type="reload" /> Reload
          </Button>

          <div>Last Sync: Never</div>
        </Row>
      </Card>
    );
  }
}

export default connect(
  null,
  { fetchTransactions }
)(SyncCard);
