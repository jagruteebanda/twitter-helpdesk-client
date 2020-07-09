import React from "react";
import { FaPhoneAlt, FaEnvelope, FaPaperclip } from "react-icons/fa";

import "../styles/TweetBody.css";

const TweetBody = (props) => {
  const { selectedTweet, conversationList } = props;
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

          <div className="conversation-div">
            {conversationList.map((msg, i) => (
              <div className="message-div">
                <div className="image-div">
                  <img
                    className="msg-img"
                    src={
                      msg.message_create.sender_id === selectedTweet.user.id_str
                        ? selectedTweet.user.profile_image_url
                        : "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                    }
                    alt="user-profile-img"
                  />
                  <span
                  className="message"
                    style={{
                      color:
                        msg.message_create.sender_id ===
                        selectedTweet.user.id_str
                          ? "#585858"
                          : "blue",
                    }}
                  >
                    {msg.message_create.message_data.text}
                  </span>
                </div>
                {/* <div className="message">
                </div> */}
                <div className="time">
                  <span> {new Date(msg.created_timestamp * 1000).toLocaleTimeString().substring(0, 5)}</span>
                </div>
              </div>
            ))}
          </div>

          {/**  */}
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
              selectedTweet &&
                selectedTweet.user &&
                selectedTweet.user.profile_image_url
            }
            alt="user-profile-img"
          />
          <span className="customer-name">{"Ea Tepene"}</span>
          <span className="online-txt">{"Online"}</span>
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
