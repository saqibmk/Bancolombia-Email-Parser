import React, { Component } from "react";
import { message } from "antd";
import { connect } from "react-redux";

class SyncMessage extends Component {
  componentWillReceiveProps(props) {
    //console.log(props);
    if (props.fetching) message.loading("Loading Transactions from email", 0);
    if (!props.fetching) message.success("Done Syncing");
  }
  componentDidMount() {
    console.log("sync");
    console.log(this.props);
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

export default connect(state => ({ fetching: state.transactions.fetching }))(
  SyncMessage
);
