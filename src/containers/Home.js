import React from 'react';

const io = require('socket.io')();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => {
    io.on('connection', client => {
      console.log('connected');
    });
  }

  componentWillUnmount = () => {

  }

  render() {
    return (
      <div className="Home">Home</div>
    )
  }
}


export default Home;