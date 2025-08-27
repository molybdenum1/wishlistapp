/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }
    return valid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await register(email, password);
      navigate("/login");
    } catch (error: any) {
      let serverMessage = "Signup failed. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
      ) {
        switch (error.code) {
          case "auth/email-already-in-use":
            serverMessage = "This email is already in use.";
            break;
          case "auth/invalid-email":
            serverMessage = "Invalid email address.";
            break;
          case "auth/weak-password":
            serverMessage = "Password is too weak.";
            break;
          default:
            serverMessage = "Signup error: " + error.code.replace("auth/", "");
        }
      } else if (typeof error === "object" && error !== null && "message" in error) {
        serverMessage = (error as any).message;
      }
      setError(serverMessage);
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <Link to="/login">Already have an account? Login</Link>
      <form className="signup-form" onSubmit={handleSignup}>
        <TextField
          id="signup-email"
          label="Email"
          variant="standard"
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          required
        />
        <TextField
          id="signup-password"
          label="Password"
          variant="standard"
          color="secondary"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
        />
        <TextField
          id="signup-confirm-password"
          label="Confirm Password"
          variant="standard"
          color="secondary"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
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
