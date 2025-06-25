import React from "react";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

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
  loading: boolean;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const firebaseUser = userCredential.user;
        const newUser: IUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          password: password,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        await setDoc(doc(db, "users", firebaseUser.uid), {
          email: newUser.email,
          name: newUser.name || "",
          isGuest: false,
          // Add other user properties as needed
        });
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  const login = (email: string, password: string) => {
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
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
