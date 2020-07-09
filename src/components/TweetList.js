import React from "react";
import "../styles/TweetList.css";

const TweetList = ({ tweetList, handleTweetSelect = (f) => f }) => {
  return (
    <div className="tweet-list">
      {tweetList.map((tweet, i) => (
        <div
          key={`tweet_${tweet.id_str}`}
          className="tweet"
          onClick={(e) => handleTweetSelect(tweet)}
          style={{ backgroundColor: tweet.isSelected ? "#f7f6f2" : "#fff" }}
        >
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

export default TweetList;
