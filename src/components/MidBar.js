import React from "react";
import { FaSearch } from "react-icons/fa";

const MidBar = () => {
  return (
    <div className="mid-bar">
      <div className="left-content">
        <span className="conversations">
          <b>Conversations</b>
        </span>
        <div className="quick-search">
          <FaSearch />
          <span>Quick Search</span>
        </div>
        <span>Filter</span>
      </div>
      <span>Online</span>
    </div>
  );
};

export default MidBar;
