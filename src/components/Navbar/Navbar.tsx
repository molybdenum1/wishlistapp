import React from "react";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Navbar</h1>
      <nav className="nav-links">
        <ul className="nav-list">
          <li className="nav-list-item">
            <a className="nav-list-item-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-list-item">
            <a className="nav-list-item-link" href="/about">
              About
            </a>
          </li>
          <li className="nav-list-item">
            <a className="nav-list-item-link" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
