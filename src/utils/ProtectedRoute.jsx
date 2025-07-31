import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
