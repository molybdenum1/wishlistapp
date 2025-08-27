/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button, TextField } from "@mui/material";

import "./LoginPage.css"; // Assuming you have a CSS file for styling


export const LoginPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) {
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (error: unknown) {
      let serverMessage = "Login failed. Please check your credentials.";

      // Firebase error handling
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as any).code === "string"
      ) {
        const code = (error as any).code;
        switch (code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
            serverMessage = "Invalid email or password.";
            break;
          case "auth/user-not-found":
            serverMessage = "No user found with this email.";
            break;
          case "auth/too-many-requests":
            serverMessage = "Too many attempts. Please try again later.";
            break;
          // Add more cases as needed
          default:
            serverMessage = "Authentication error: " + code.replace("auth/", "");
        }
      } else if (typeof error === "object" && error !== null) {
        type ErrorWithResponse = {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        };
        const err = error as ErrorWithResponse;
        if (err.response?.data?.message && typeof err.response.data.message === "string") {
          serverMessage = err.response.data.message;
        } else if (err.message && typeof err.message === "string") {
          serverMessage = err.message;
        }
      }

      setError(serverMessage);
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <Link to="/signup">Don't have an account? Sign up</Link>
      <form className="login-form" onSubmit={handleLogin}>
        <TextField
          id="login-email"
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
          id="login-password"
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
        <Button variant="contained" color="secondary" type="submit">
          Login
        </Button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
