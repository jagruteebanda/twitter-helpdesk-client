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

class AgentScreen extends React.Component {
  constructor(props) {
    super(props);
    const endpoint = conf.receiver_socket_url;
    const socket = socketIOClient(endpoint);
    this.state = {
      tweetList: [],
      userId: "",
      socket,
      selectedTweet: {},
      conversationList: [],
    };
    // this.handleTweetSelect = this.handleTweetSelect.bind(this);
  }

  clubTweets = (tweetList) => {
    tweetList.reduce();
  };

  componentDidMount = () => {
    // let userId = localStorage.getItem('userId');
    // this.setState({ userId });

    let { socket, tweetList } = this.state;

    socket.on("tweet", (data) => {
      console.log(data.tweet);
      tweetList.unshift(data.tweet);
      this.setState({ tweetList });
    });

    axios({
      method: "get",
      url: "http://127.0.0.1:3000/apis/tweets/get",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 406) {
          console.log("login error", res.error);
        } else if (res.data.code === 200) {
          res.data.data[0]["isSelected"] = true;
          this.setState({
            tweetList: res.data.data,
            selectedTweet: res.data.data[0],
          });
        } else {
          console.log("login error:: ", res.data);
        }
      })
      .catch((err) => {
        console.log("Error in fetching tweets:: ", err);
      });

    const options = {
      method: "GET",
      url: "http://localhost:3000/apis/message/list",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };
    axios(options)
      .then((res) => {
        // console.log(res);
        this.setState({ conversationList: res.data.data.events });
      })
      .catch((err) => {
        console.log("Error in fetching conversation:: ", err);
      });
  };

  handleTweetSelect(tweet) {
    let { tweetList } = this.state;
    tweetList = tweetList.map((t) => {
      t.id === tweet.id ? (t["isSelected"] = true) : (t["isSelected"] = false);
      return t;
    });
    this.setState({ tweetList, selectedTweet: tweet });
  }

  render() {
    const { tweetList, selectedTweet, conversationList } = this.state;
    let userConversation = conversationList
      .filter(
        (c) =>
          c.message_create.sender_id === selectedTweet.user.id_str ||
          c.message_create.target.recipient_id === selectedTweet.user.id_str
      )
      .reverse();
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
              selectedTweet={selectedTweet}
              conversationList={userConversation}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AgentScreen;
