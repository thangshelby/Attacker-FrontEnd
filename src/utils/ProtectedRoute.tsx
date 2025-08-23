import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Outlet } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { useNotification } from "@/hooks/useNotification";
const ProtectedRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role != "Admin") {
    useStudent();
    useAcademic();
  }
  useNotification();

  return <Outlet />;
};

export default ProtectedRoute;
