import React from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import MidBar from "../components/MidBar";
import TweetList from "../components/TweetList";
import TweetBody from "../components/TweetBody";
import conf from "../conf/config";

import "../styles/AgentScreen.css";

const endpoint = conf.receiver_socket_url;
const socket = socketIOClient(endpoint);

class AgentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetList: [],
      userId: "",
      userHandle: "",
      selectedTweet: {},
      conversationList: [],
      message: "",
    };
    // this.handleTweetSelect = this.handleTweetSelect.bind(this);
  }

  clubTweets = (tweetList) => {
    tweetList.reduce();
  };

  componentDidMount = () => {
    socket.on("tweet", (data) => {
      // console.log(data.tweet);
      let { tweetList } = this.state;
      tweetList.unshift(...data.tweet);
      this.setState({ tweetList });
    });

    socket.on("message", (data) => {
      // console.log(data.message);

      let { conversationList } = this.state;
      // console.log(conversationList);
      // conversationList = [...data.message, ...conversationList];
      conversationList.unshift(...data.message);
      // console.log(conversationList);
      this.setState({ conversationList });
    });

    let params = new URL(window.location.href).searchParams;
    let oauth_token = params.get("oauth_token");
    let oauth_verifier = params.get("oauth_verifier");
    let userHandle = sessionStorage.getItem("userHandle");
    axios({
      method: "post",
      url: `${conf.base_url}/apis/tweets/list`,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        oauth_token,
        oauth_verifier,
        userHandle,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 406) {
          console.log("login error", res.error);
        } else if (res.data.code === 200) {
          if (res.data.data.twitterUserData) {
            sessionStorage.setItem(
              "userId",
              res.data.data.twitterUserData.userId
            );
            sessionStorage.setItem(
              "userHandle",
              res.data.data.twitterUserData.userHandle
            );
          }
          res.data.data.tweets[0]["isSelected"] = true;
          this.setState({
            userId: (res.data.data.twitterUserData && res.data.data.twitterUserData.userId) || '',
            userHandle: (res.data.data.twitterUserData && res.data.data.twitterUserData.userHandle) || '',
            tweetList: res.data.data.tweets,
            selectedTweet: res.data.data.tweets[0],
          });

          axios({
            method: "POST",
            url: `${conf.base_url}/apis/message/list`,
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            data: {
              userHandle,
            },
          })
            .then((res) => {
              // console.log(res);
              this.setState({ conversationList: res.data.data.events });
            })
            .catch((err) => {
              console.log("Error in fetching conversation:: ", err);
            });
        } else {
          console.log("login error:: ", res.data);
        }
      })
      .catch((err) => {
        console.log("Error in fetching tweets:: ", err);
      });
  };

  componentWillUnmount = () => {
    socket.disconnect();
  };

  handleTweetSelect(tweet) {
    let { tweetList } = this.state;
    tweetList = tweetList.map((t) => {
      t.id === tweet.id ? (t["isSelected"] = true) : (t["isSelected"] = false);
      return t;
    });
    this.setState({ tweetList, selectedTweet: tweet });
  }

  handleMessageChange(message) {
    this.setState({
      message,
    });
  }

  sendMessage(user, message) {
    // console.log(user, message);
    axios({
      method: "POST",
      url: `${conf.base_url}/apis/message/send`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: user.id_str,
          },
          message_data: {
            text: message,
          },
        },
      },
    })
      .then((res) => {
        // let { conversationList } = this.state;
        // conversationList.unshift(res.data.data.event);
        // this.setState({ conversationList });
      })
      .catch((err) => {
        console.log("Error in fetching conversation:: ", err);
      });
  }

  render() {
    const { tweetList, selectedTweet, conversationList, message } = this.state;
    console.log(selectedTweet);
    let userConversation;
    if (
      selectedTweet &&
      selectedTweet.user &&
      conversationList &&
      conversationList.length > 0
    )
      userConversation = conversationList
        .filter(
          (c) =>
            c.message_create.sender_id === selectedTweet.user.id_str ||
            c.message_create.target.recipient_id === selectedTweet.user.id_str
        )
        .reverse();
    console.log(userConversation);
    return (
      <div className="agent-screen">
        <SideBar />
        <div className="main-div">
          <TopBar />
          <MidBar />
          <div className="main-body">
            <TweetList
              tweetList={tweetList}
              handleTweetSelect={(tweet) => this.handleTweetSelect(tweet)}
            />
            <TweetBody
              message={message}
              selectedTweet={selectedTweet}
              conversationList={userConversation}
              handleMessageChange={(message) =>
                this.handleMessageChange(message)
              }
              sendMessage={(user, message) => this.sendMessage(user, message)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AgentScreen;
