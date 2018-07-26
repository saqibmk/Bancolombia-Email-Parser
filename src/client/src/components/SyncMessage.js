import React, { Component } from "react";
import { message } from "antd";
import { connect } from "react-redux";

class SyncMessage extends Component {
  componentWillReceiveProps(props) {
    if (props.fetching) message.loading("Loading Transactions from Email", 0);
    if (!props.fetching) message.success("Done Syncing");
    if (props.error) message.error("Error Syncing Transactions");
  }
  componentDidMount() {
    if (this.props.fetching)
      message.loading("Loading Transactions from email", 0);
  }
  render() {
    message.config({
      maxCount: 1
    });
    return <div />;
  }
}

export default connect(state => ({
  fetching: state.transactions.fetching,
  error: state.transactions.error
}))(SyncMessage);
