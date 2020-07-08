import React from 'react';
import { IconContext } from "react-icons";
import { FaClock, FaHome, FaUserFriends, FaComment, FaCreditCard, FaPhone } from 'react-icons/fa';
import '../styles/SideBar.css';

const SideBar = (props) => {
  return (
    <div className='side-bar'>
          <div>
            <img src={require('../images/logo-image.png')} width="20" height="20" alt="logo" />
          </div>
          <div>
            <IconContext.Provider value={{ color: "#ffffff", className: "global-class-name" }}>
              <div>
                <FaClock />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#ffffff", className: "global-class-name" }}>
              <div>
                <FaHome />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#ffffff", className: "global-class-name" }}>
              <div>
                <FaUserFriends />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#ffffff", className: "global-class-name" }}>
              <div>
                <FaComment />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#ffffff", className: "global-class-name" }}>
              <div>
                <FaCreditCard />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "#ffffff", className: "global-class-name" }}>
              <div>
                <FaPhone />
              </div>
            </IconContext.Provider>
          </div>
        </div>
  )
}

export default SideBar;