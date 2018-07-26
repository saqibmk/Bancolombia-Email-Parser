import React, { Component } from "react";
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";
import AuthMessage from "./components/AuthMessage";
import { connect } from "react-redux";
import { showAuthAlert, hideAuthAlert } from "../src/actions/auth";
import { updateLastRun } from "../src/actions/transactions";

import "./App.css";
class App extends Component {
  componentDidMount() {
    fetch("/api/auth/status")
      .then(results => results.json())
      .then(data => {
        this.props.updateLastRun(data.lastRun);
        data.authReq ? this.props.showAuthAlert() : this.props.hideAuthAlert();
      });
  }
  render() {
    return (
      <div className="App">
        {!this.props.authenticating && this.props.authReq && <AuthMessage />}
        <Summary />
        <TransactionList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authReq: state.auth.authReq,
    authenticating: state.auth.authenticating
  };
};

export default connect(
  mapStateToProps,
  { showAuthAlert, hideAuthAlert, updateLastRun }
)(App);
