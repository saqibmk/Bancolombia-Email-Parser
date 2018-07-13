import React, { Component } from "react";
import { Button, Alert } from "antd";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { authenticate } from "../actions/auth";

class AuthCard extends Component {
  render() {
    return (
      <Alert
        message="Connect to gmail"
        description={
          <div>
            Looks like you have not setup your account yet! Lets get you
            connected: &ensp;
            <Button
              type="primary"
              icon="google"
              onClick={() => this.refs.gbtn.signIn()}
            >
              Connect
            </Button>
            <GoogleLogin
              ref="gbtn"
              clientId="624495713692-03lugd8r2be00p8pnm7vt21qja6b1d27.apps.googleusercontent.com"
              accessType="offline"
              responseType="code"
              fetchBasicProfile="false"
              scope="https://www.googleapis.com/auth/gmail.readonly"
              onSuccess={({ code }) => this.props.authenticate(code)}
              onFailure={data => console.log(data)}
              style={{ display: "none" }}
            />
          </div>
        }
        type="error"
        showIcon
      />
    );
  }
}

export default connect(
  null,
  { authenticate }
)(AuthCard);
