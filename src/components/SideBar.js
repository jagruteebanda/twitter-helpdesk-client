import React from "react";
import { IconContext } from "react-icons";
import {
  FaClock,
  FaHome,
  FaUserFriends,
  FaComment,
  FaCreditCard,
  FaPhoneAlt,
} from "react-icons/fa";
import "../styles/SideBar.css";

const SideBar = (props) => {
  const iconsList = [
    { selected: false, icon: <FaClock /> },
    { selected: false, icon: <FaHome /> },
    { selected: false, icon: <FaUserFriends /> },
    { selected: true, icon: <FaComment /> },
    { selected: false, icon: <FaCreditCard /> },
    { selected: false, icon: <FaPhoneAlt /> },
  ];

  return (
    <div className="side-bar">
      {/* <div> */}
      <img
        className="side-bar-logo"
        src={require("../images/logo-image.png")}
        width="30"
        height="25"
        alt="logo"
      />
      {/* </div> */}
      <div className="icons-list">
        {iconsList.map((item) => (
          <div
            className="icon-div"
            style={{
              backgroundColor: item.selected ? "#e7e8e3" : null,
            }}
          >
            <IconContext.Provider
              value={{
                color: "#888888",
                backgroundColor: "#fff",
                size: "1.2em",
                className: "global-class-name",
              }}
            >
              {item.icon}
            </IconContext.Provider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
