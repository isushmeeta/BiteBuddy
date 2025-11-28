
import React from "react";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">BITE BUDDY</div>
      <div className="title">BITE BUDDY</div>

      <FaUserCircle className="profile-icon" />
    </nav>
  );
};

export default Navbar;
