import React from "react";
import "../styles/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div>
        <span className="updates">Updates</span>
      </div>
      <div>
        <span className="session">Session: 34 minutes</span>
        <span>User: {this.state.userName}</span>
      </div>
    </div>
  );
};

export default TopBar;
