import React from "react";
import { IconContext } from "react-icons";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaPaperclip,
  FaRegPaperPlane,
} from "react-icons/fa";

import "../styles/TweetBody.css";

const TweetBody = ({
  selectedTweet,
  conversationList,
  message,
  handleMessageChange = (f) => f,
  sendMessage = (f) => f,
}) => {
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
          </div>

          <div className="conversation-div">
            {conversationList &&
              conversationList.length > 0 &&
              conversationList.map((msg, i) => (
                <div key={`message_${msg.id}`} className={"message-div"}>
                  <div
                  key={`message_${msg.id}`}
                    className={
                      msg.message_create.sender_id === selectedTweet.user.id_str
                        ? "image-div-left"
                        : "image-div-right"
                    }
                  >
                    <span
                      className={"message"}
                    >
                      {msg.message_create.message_data.text}
                    </span>
                      <span className="time">
                        {new Date(msg.created_timestamp * 1000)
                          .toLocaleTimeString()
                          .substring(0, 5)}
                      </span>
                  </div>
                </div>
              ))}
          </div>

          {/**  */}
          <div className="reply-div">
            <img
              className="profile-img"
              src={
                "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
              }
              width="30"
              height="30"
              alt="user-profile-img"
            />
            <div className="reply-input-group">
              <input
                className="reply-input"
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                placeholder={"Reply..."}
              />
              {message.length > 0 ? (
                <div onClick={(e) => sendMessage(selectedTweet.user, message)}>
                  <IconContext.Provider
                    value={{
                      color: "#979797",
                      size: "0.9em",
                    }}
                  >
                    <FaRegPaperPlane />
                  </IconContext.Provider>
                </div>
              ) : (
                <IconContext.Provider
                  value={{
                    color: "#979797",
                    size: "0.9em",
                  }}
                >
                  <FaPaperclip />
                </IconContext.Provider>
              )}
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
          <span className="customer-name">
            {selectedTweet.user && selectedTweet.user.name}
          </span>
          <span className="online-txt">{"Online"}</span>
          <div className="contact-customer">
            <div className="contact-cell">
              <IconContext.Provider
                value={{
                  color: "#121212",
                  size: "0.7rem",
                }}
              >
                <FaPhoneAlt className="contact-icon" />
              </IconContext.Provider>
              <span className="contact-cell-content">{"Call"}</span>
            </div>
            <div className="contact-cell">
              <IconContext.Provider
                value={{
                  color: "#121212",
                  size: "0.7rem",
                }}
              >
                <FaEnvelope className="contact-icon" />
              </IconContext.Provider>
              <span className="contact-cell-content">{"Email"}</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default TweetBody;
