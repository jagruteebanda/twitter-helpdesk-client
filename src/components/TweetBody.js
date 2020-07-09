import React from "react";
import { FaPhoneAlt, FaEnvelope, FaPaperclip } from "react-icons/fa";

import "../styles/TweetBody.css";

const TweetBody = (props) => {
  const { selectedTweet } = props;
  console.log(selectedTweet);
  if (selectedTweet)
    return (
      <div className="tweet-body">
        <div className="tweet-conversation">
          <div className="user-data">
            <img
              className="profile-img"
              src={
                selectedTweet &&
                selectedTweet.user &&
                selectedTweet.user.profile_image_url
              }
              width="30"
              height="30"
              alt="user-profile-img"
            />
            <span className="user-name">
              {selectedTweet.user && selectedTweet.user.name}
            </span>
            {/* <span className="user-name">Ea Tepene</span>
            <span className="user-name">Ea Tepene</span> */}
          </div>
          <div className="conversation-div"></div>
          <div className="reply-div">
            <img
              className="profile-img"
              src={
                "http://pbs.twimg.com/profile_images/1268287767966072834/HdqRqVJR_normal.jpg"
              }
              width="30"
              height="30"
              alt="user-profile-img"
            />
            <div className="reply-input-group">
              <input
                className="reply-input"
                // value={""}
                placeholder={"Reply..."}
              />
              <FaPaperclip />
            </div>
          </div>
        </div>

        {/** CUSTOMER PROFILE */}
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
    );
};

export default TweetBody;