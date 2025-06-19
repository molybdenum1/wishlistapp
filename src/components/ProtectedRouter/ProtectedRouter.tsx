import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const { user, loading } = useAuth();
  if (loading) return 
    <div>Loading...</div>
  ;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
