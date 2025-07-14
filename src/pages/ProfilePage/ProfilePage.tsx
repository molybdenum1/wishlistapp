import "./ProfilePage.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Placeholder for update logic (implement with Firebase if needed)
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call Firebase updateEmail or similar
    setMessage("Profile updated (demo only)");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <form onSubmit={handleUpdate} className="profile-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="profile-input"
            disabled
          />
        </label>
        {/* Add more fields for name, etc. if needed */}
        <button type="submit" className="profile-btn" disabled>
          Update Profile
        </button>
      </form>
      <button onClick={handleLogout} className="profile-btn logout">
        Logout
      </button>
      {message && <div className="profile-message">{message}</div>}
    </div>
  );
};
