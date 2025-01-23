import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <a href="#" className="logo">
        <i className="fas fa-heartbeat" /> medcare.
      </a>
      <nav className="navbar">
        <a href="#home">home</a>
        <a href="#services">services</a>
        <a href="#about">about</a>
        <a href="#doctors">doctors</a>
        <a href="#review">review</a>
      </nav>
      <Link to="/login" className="btn">
        Login
      </Link>

      <div id="menu-btn" className="fas fa-bars" />
    </header>
  );
}
