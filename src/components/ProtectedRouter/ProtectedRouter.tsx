import { useAuth } from "../AuthProvider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
