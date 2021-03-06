import React from "react";
import axios from "axios";

import "../styles/LoginAndRegister.css";

import conf from "../conf/config";

class LoginAndRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetails: {
        username: "",
        password: "",
      },
      registerDetails: {
        username: "",
        password: "",
      },
    };
  }

  handleLogin = () => {
    const { loginDetails } = this.state;
    axios({
      method: "post",
      url: `${conf.base_url}/apis/user/login`,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: loginDetails,
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 406) {
          console.log("login error", res.error);
          alert('Please enter correct login details!');
        } else if (res.data.code === 200) {
          
          window.location = `${conf.base_url}/twitter/login`;
          // window.location = `${conf.base_url}/apis/auth/twitter/callback`;
          // this.props.history.push('/twitter-auth');

        } else {
          console.log("login error:: ", res.data);
        }
      })
      .catch((err) => {
        console.log("Error:: ", err);
      });
  };

  handleRegister = () => {
    const { registerDetails } = this.state;
    axios({
      method: "post",
      url: `${conf.base_url}/apis/user/register`,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: registerDetails,
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 406) {
          console.log("login error", res.error);
        } else if (res.data.code === 200) {
          // localStorage.setItem("userName", registerDetails.username);
          // this.props.history.push("/home");
          alert("Please login to use to application!");
        } else {
          // console.log("login error:: ", res.data);
        }
      })
      .catch((err) => {
        console.log("Error:: ", err);
      });
  };

  onSuccess = (response) => {
    console.log(response);
    const token = response.headers.get("x-auth-token");
    response.json().then((user) => {
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  render() {
    const { loginDetails, registerDetails } = this.state;
    return (
      <div className="login-register">
        <div className="app-bar">
          <img
            className="app-logo"
            src={require("../images/logo-image.png")}
            width="30"
            height="30"
            alt="logo"
          />
          <span className="app-title">Twitter Helpdesk</span>
        </div>
        <div className="app-body">
          <div className="container">
            <h4 className="container-title">Login</h4>
            <div className="input-group">
              <input
                className="input-field"
                value={loginDetails.username}
                placeholder={"Username"}
                onChange={(e) =>
                  this.setState({
                    loginDetails: { ...loginDetails, username: e.target.value },
                  })
                }
              />
            </div>
            <div className="input-group">
              <input
                className="input-field"
                type="password"
                value={loginDetails.password}
                placeholder={"Password"}
                password="true"
                onChange={(e) =>
                  this.setState({
                    loginDetails: { ...loginDetails, password: e.target.value },
                  })
                }
              />
            </div>
            <div className="submit-button" onClick={() => this.handleLogin()}>
              <span>Login</span>
            </div>
          </div>

          <div className="container">
            <h4 className="container-title">Register</h4>
            <div className="input-group">
              <input
                className="input-field"
                value={registerDetails.username}
                placeholder={"Username"}
                onChange={(e) =>
                  this.setState({
                    registerDetails: {
                      ...registerDetails,
                      username: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="input-group">
              <input
                className="input-field"
                type="password"
                value={registerDetails.password}
                placeholder={"Password"}
                password="true"
                onChange={(e) =>
                  this.setState({
                    registerDetails: {
                      ...registerDetails,
                      password: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div
              className="submit-button"
              onClick={() => this.handleRegister()}
            >
              <span>Register</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAndRegister;
