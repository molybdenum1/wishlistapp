/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthFn = (email: string, password: string) => void;

interface UseAuthFormOptions {
  confirmPassword?: boolean;
  onSuccessRedirect: string;
}

export const useAuthForm = (
  authFn: AuthFn,
  options: UseAuthFormOptions
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

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
    if (options.confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        valid = false;
      }
    }
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) {
      return;
    }

    try {
      await authFn(email, password);
      navigate(options.onSuccessRedirect);
    } catch (error: any) {
      let serverMessage = "Authentication failed. Please check your credentials.";
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
      ) {
        switch (error.code) {
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
            serverMessage = "Authentication error: " + error.code.replace("auth/", "");
        }
      } else if (typeof error === "object" && error !== null && "message" in error) {
        serverMessage = error.message;
      }
      setError(serverMessage);
      console.error(error);
    }
  };

  return {
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
  };
};
