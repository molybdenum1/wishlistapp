import React from "react";

import "./ProfilePage.css"; // Assuming you have a CSS file for styling
import { useAuth } from "../../hooks/useAuth";

export const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  return <div>
    <h2>Profile Page</h2>
    <p>Email: {user.email}</p>
  </div>;
};
