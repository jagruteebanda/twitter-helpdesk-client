import React from "react";
import { IconContext } from "react-icons";
import {
  FaClock,
  FaHome,
  FaUserFriends,
  FaComment,
  FaCreditCard,
  FaPhoneAlt,
  FaCog,
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
    // { selected: false, icon: <FaCog /> },
  ];

  return (
    <div className="side-bar">
      <div className="top-icons">
        <img
          className="side-bar-logo"
          src={require("../images/logo-image.png")}
          width="30"
          height="25"
          alt="logo"
        />
        <div className="icons-list">
          {iconsList.map((item, i) => (
            <div
              key={`icon_${i}`}
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
      <div className="user-icons">
        <IconContext.Provider
          value={{
            color: "#888888",
            backgroundColor: "#fff",
            size: "1.2em",
            className: "global-class-name",
          }}
        >
          <FaCog />
        </IconContext.Provider>
        <img
          className="side-bar-user-img"
          src={
            "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
          }
          alt="user-img"
        />
      </div>
    </div>
  );
};

export default SideBar;
