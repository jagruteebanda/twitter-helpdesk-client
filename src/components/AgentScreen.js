import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import SideBar from '../components/SideBar';
import '../styles/AgentScreen.css';

class AgentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweetList: [{
        image_url: 'http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg',
        name: 'Mbah Enow',
        text: 'Hello there! May I ask a favor?'
      }, {
        image_url: 'http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg',
        name: 'Mbah Enow',
        text: 'Hello there! May I ask a favor?'
      }]
    }
  }

  renderTweetsList = () => {
    const { tweetList } = this.state;
    return (
      <div className="tweet-list">
        {
          tweetList.map((tweet, i) =>
            <div className="tweet">
              <div className="tweet-profile-image">
                <img className="tweet-profile-img" src={tweet.image_url} width="30" height="30" alt="profile-img" />
              </div>
              <div className="tweet-text-body">
                <div>
                  <span className="tweet-user-name">{tweet.name}</span>
                </div>
                <div>
                  <span className="tweet-text">{tweet.text}</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }

  render() {

    return (
      <div className="agent-screen">
        <SideBar />
        <div className='main-div'>
          <div className="top-bar">
            <span>Updates</span>
            <span>Session</span>
            <span>User: {}</span>
          </div>
          <div className="mid-bar">
            <span>Conversations</span>
            <span>Quick Search</span>
            <span>Filter</span>
            <span>Online</span>
          </div>
          <div className="main-body">
            {
              this.renderTweetsList()
            }
            <div className="tweet-body">
              <div className="tweet-conversation">
                <div className="user-data">
                  <img className="tweet-profile-img" src={'http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg'} width="30" height="30" alt="user-profile-img" />
                  <span className="user-name">Ea Tepene</span>
                  <span className="user-name">Ea Tepene</span>
                  <span className="user-name">Ea Tepene</span>
                </div>
              </div>
              <div className="tweet-customer">
                <img className="customer-img" src={'http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg'} alt="user-profile-img" />
                <span>{'Ea Tepene'}</span>
                <span>{'Online'}</span>
                <div className="contact-customer">
                  <div className="contact-cell">
                    <FaPhoneAlt />
                    <span className="contact-cell-content">{'Call'}</span>
                  </div>
                  <div className="contact-cell">
                    <FaEnvelope />
                    <span className="contact-cell-content">{'Email'}</span>
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