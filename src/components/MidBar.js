import React from "react";
import { IconContext } from 'react-icons';
import { FaSearch, FaSlidersH, FaCircle, FaCaretDown } from "react-icons/fa";
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
        <IconContext.Provider
          value={{
            color: "#68c24f",
            size: "0.5em"
          }}
        >
          <FaCircle />
        </IconContext.Provider>
        <span className="online-text">Online</span>
        <IconContext.Provider
          value={{
            color: "#797979",
            size: "0.9em"
          }}
        >
          <FaCaretDown />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default MidBar;
