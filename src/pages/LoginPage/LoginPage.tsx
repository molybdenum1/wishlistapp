import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useAuthForm } from "../../hooks/useAuthForm";

import "./LoginPage.css";

export const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    emailError,
    passwordError,
    handleSubmit,
  } = useAuthForm(login, { onSuccessRedirect: "/" });

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <Link to="/signup">Don't have an account? Sign up</Link>
      <form className="login-form" onSubmit={handleSubmit}>
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
      <p>or</p>
      <Button variant="contained" color="secondary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
};
