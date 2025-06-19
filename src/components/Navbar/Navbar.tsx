import React from "react";
import "./Navbar.css";
import { useAuth } from "../AuthProvider/AuthProvider";

export const Navbar = () => {

  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h1>Wishlist App</h1>
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
        <ul className="nav-list">
          {user ? (
            <>
              <li className="nav-list-item">
                <a className="nav-list-item-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-list-item">
                <button className="nav-list-item-link" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-list-item">
                <a className="nav-list-item-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-list-item">
                <a className="nav-list-item-link" href="/signup">
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
