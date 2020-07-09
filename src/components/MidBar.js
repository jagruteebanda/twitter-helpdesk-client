import React from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import "../styles/MidBar.css";

const MidBar = () => {
  return (
    <div className="mid-bar">
      <div className="left-content">
        <span className="conversations">
          <b>Conversations</b>
        </span>
        <div className="quick-search">
          <FaSearch />
          <input className="quick-search-input" placeholder={"Quick Search"} />
        </div>
        <div className="filter">
          <FaSlidersH className="filter-icon" />
          <span className="filter-text">Filter</span>
        </div>
      </div>
      <div className="online">
        <span className="online-text">Online</span>
      </div>
    </div>
  );
};

export default MidBar;
