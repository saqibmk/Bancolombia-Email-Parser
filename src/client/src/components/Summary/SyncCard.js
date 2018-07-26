import React, { Component } from "react";
import { Card, Row, Button, Icon } from "antd";
import SyncMessage from "../SyncMessage";
import { connect } from "react-redux";
import fetchTransactions from "../../actions/transactions";
import relativeDate from "tiny-relative-date";

class SyncCard extends Component {
  render() {
    return (
      <Card>
        <SyncMessage />
        <Row type="flex" justify="center">
          <Button
            onClick={() => {
              this.props.fetchTransactions();
            }}
          >
            <Icon type="reload" /> Sync
          </Button>

          <div>
            Last sync:{" "}
            {relativeDate(new Date(parseInt(this.props.lastRun) * 1000))}
          </div>
        </Row>
      </Card>
    );
  }
}

export default connect(
  state => ({ lastRun: state.transactions.lastRun }),
  { fetchTransactions }
)(SyncCard);
