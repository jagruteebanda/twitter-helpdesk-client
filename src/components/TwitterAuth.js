import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";

class TwitterAuth extends Component {
  onSuccess = (response) => {
    console.log('response:: ', response);
    // const token = response.headers.get("x-auth-token");
    // response.json().then((user) => {
    //   console.log(user, token);
    //   // if (token) {
    //   //   this.setState({ isAuthenticated: true, user: user, token: token });
    //   // }
    // });
  };

  onFailed = (error) => {
    console.log('Error:: ', error);
    // alert(error);
  };

  render() {
    return (
      <div>
        <TwitterLogin
          loginUrl="http://localhost:3000/apis/auth/twitter/login"
          onFailure={this.onFailed}
          onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:3000/apis/auth/twitter/callback"
        />
      </div>
    );
  }
}

export default TwitterAuth;
