import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, TextField } from "@mui/material";

import "./SignupPage.css"; // Assuming you have a CSS file for styling

export const SignupPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string>("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <Link to="/login">Already have an account? Login</Link>
      <form className="signup-form" onSubmit={handleSignup}>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          color="secondary"
          style={{}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          color="secondary"
          style={{}}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          color="secondary"
          style={{}}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="secondary" type="submit">
          Sign Up
        </Button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
