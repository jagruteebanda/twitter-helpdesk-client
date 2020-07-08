import React from "react";
import { FaPhoneAlt, FaEnvelope, FaSearch } from "react-icons/fa";
import axios from 'axios';
import socketIOClient from "socket.io-client";

import SideBar from "../components/SideBar";
import conf from "../conf/config";

import "../styles/AgentScreen.css";

class AgentScreen extends React.Component {
  constructor(props) {
    super(props);
    const endpoint = conf.receiver_socket_url;
    const socket = socketIOClient(endpoint);
    this.state = {
      tweetList: [],
      userName: "",
      socket,
    };
  }

  componentDidMount = () => {
    let userName = localStorage.getItem("userName");
    this.setState({ userName });

    axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/apis/tweets/get'
    }).then(res => {
      console.log(res);
      if (res.data.code === 406) {
        console.log("login error", res.error);
      } else if (res.data.code === 200) {
        this.setState({ tweetList: res.data.data });
      } else {
        console.log("login error:: ", res.data);
      }
    }).catch(err => {
      console.log('Error in fetching tweets:: ', err);
    });

    let { socket, tweetList } = this.state;
    socket.on("tweet", (data) => {
      tweetList.push(data.tweet);
      this.setState({ tweetList });
    });
  };

  renderTweetsList = () => {
    const { tweetList } = this.state;
    return (
      <div className="tweet-list">
        {tweetList.map((tweet, i) => (
          <div className="tweet">
            <div className="tweet-profile-image">
              <img
                className="tweet-profile-img"
                src={tweet.user.profile_image_url}
                width="30"
                height="30"
                alt="profile-img"
              />
            </div>
            <div className="tweet-text-body">
              <div>
                <span className="tweet-user-name">{tweet.user.name}</span>
              </div>
              <div>
                <span className="tweet-text">{tweet.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="agent-screen">
        <SideBar />
        <div className="main-div">
          <div className="top-bar">
            <div>
              <span className="updates">Updates</span>
            </div>
            <div>
              <span className="session">Session: 34 minutes</span>
              <span>User: {this.state.userName}</span>
            </div>
          </div>
          <div className="mid-bar">
            <div className="left-content">
              <span className="conversations">
                <b>Conversations</b>
              </span>
              <div className="quick-search">
                <FaSearch/>
                <span>Quick Search</span>
              </div>
              <span>Filter</span>
            </div>
            <span>Online</span>
          </div>
          <div className="main-body">
            {this.renderTweetsList()}
            <div className="tweet-body">
              <div className="tweet-conversation">
                <div className="user-data">
                  <img
                    className="tweet-profile-img"
                    src={
                      "http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg"
                    }
                    width="30"
                    height="30"
                    alt="user-profile-img"
                  />
                  <span className="user-name">Ea Tepene</span>
                  <span className="user-name">Ea Tepene</span>
                  <span className="user-name">Ea Tepene</span>
                </div>
              </div>
              <div className="tweet-customer">
                <img
                  className="customer-img"
                  src={
                    "http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg"
                  }
                  alt="user-profile-img"
                />
                <span>{"Ea Tepene"}</span>
                <span>{"Online"}</span>
                <div className="contact-customer">
                  <div className="contact-cell">
                    <FaPhoneAlt />
                    <span className="contact-cell-content">{"Call"}</span>
                  </div>
                  <div className="contact-cell">
                    <FaEnvelope />
                    <span className="contact-cell-content">{"Email"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AgentScreen;
