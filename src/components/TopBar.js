import React from "react";
import "../styles/TopBar.css";

const TopBar = () => {
  let userName = localStorage.getItem("userName");
  return (
    <div className="top-bar">
      <div>
        <span className="updates">Updates</span>
      </div>
      <div>
        <span className="session">Session: 34 minutes</span>
        <span>User: {userName}</span>
      </div>
    </div>
  );
};

export default TopBar;
