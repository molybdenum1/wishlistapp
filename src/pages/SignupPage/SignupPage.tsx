import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useAuthForm } from "../../hooks/useAuthForm";

import "./SignupPage.css";

export const SignupPage = () => {
  const { register } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    emailError,
    passwordError,
    confirmPasswordError,
    handleSubmit,
  } = useAuthForm(register, { confirmPassword: true, onSuccessRedirect: "/login" });

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <Link to="/login">Already have an account? Login</Link>
      <form className="signup-form" onSubmit={handleSubmit}>
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