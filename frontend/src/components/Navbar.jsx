
import React from "react";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">BITE BUDDY</div>
      <div className="title">BITE BUDDY</div>

      <Link to="/profile">
        <FaUserCircle className="profile-icon" />
      </Link>
    </nav>
  );
};

export default Navbar;