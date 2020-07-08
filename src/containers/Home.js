import React from "react";
import socketIOClient from "socket.io-client";

import conf from "../conf/config";

class Home extends React.Component {
  constructor(props) {
    super(props);
    const endpoint = conf.receiver_socket_url;
    const socket = socketIOClient(endpoint);
    this.state = {
      socket,
      tweetArray: [],
    };
  }

  componentDidMount = () => {
    let { socket, tweetArray } = this.state;
    socket.on("tweet", (data) => {
      console.log(data.tweet);
      tweetArray.push(data.tweet);
      this.setState({ tweetArray });
    });
  };

  componentWillUnmount = () => {};

  render() {
    const { tweetArray } = this.state;
    return (
      <div className="Home">
        {tweetArray.map((item, i) => (
          <p key={item.id}>{item.text}</p>
        ))}
      </div>
    );
  }
}

export default Home;
