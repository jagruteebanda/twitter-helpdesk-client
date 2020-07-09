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
      userName: "",
      socket,
      selectedTweet: {}
    };
    // this.handleTweetSelect = this.handleTweetSelect.bind(this);
  }

  componentDidMount = () => {

    axios({
      method: "get",
      url: "http://127.0.0.1:3000/apis/tweets/get",
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 406) {
          console.log("login error", res.error);
        } else if (res.data.code === 200) {
          res.data.data[0]['isSelected'] = true;
          this.setState({ tweetList: res.data.data, selectedTweet: res.data.data[0] });
        } else {
          console.log("login error:: ", res.data);
        }
      })
      .catch((err) => {
        console.log("Error in fetching tweets:: ", err);
      });

    let { socket, tweetList } = this.state;
    socket.on("tweet", (data) => {
      tweetList.push(data.tweet);
      this.setState({ tweetList });
    });
  };

  handleTweetSelect(tweet) {
    let { tweetList } = this.state;
    tweetList = tweetList.map((t) => {
      t.id === tweet.id ? (t["isSelected"] = true) : (t["isSelected"] = false);
      return t;
    });
    this.setState({ tweetList, selectedTweet: tweet });
  };

  render() {
    const { tweetList, selectedTweet } = this.state;
    console.log(selectedTweet);
    return (
      <div className="agent-screen">
        <SideBar />
        <div className="main-div">
          <TopBar />
          <MidBar />
          <div className="main-body">
            <TweetList tweetList={tweetList} handleTweetSelect={(tweet) => this.handleTweetSelect(tweet)} />
            <TweetBody selectedTweet={selectedTweet} />
          </div>
        </div>
      </div>
    );
  }
}

export default AgentScreen;
