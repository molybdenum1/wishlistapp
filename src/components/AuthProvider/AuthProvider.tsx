import React, { useContext } from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface IUser {
  id: string;
  name?: string;
  email: string;
  password: string;
  // Add other user properties as needed
}

type AuthContextType = {
  user: IUser | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;
        const newUser: IUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          password: password,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  const login = (email: string, password: string ) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;
        const newUser: IUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          password: password,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
