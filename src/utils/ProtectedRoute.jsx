import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Outlet } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { useNotification } from "@/hooks/useNotifcation";
const ProtectedRoute = () => {
  const { user, setUser } = useAuthStore();

  // Always call hooks at top-level to keep hook order stable
  // Queries inside these hooks are gated via their own `enabled` flags
  useNotification();
  useStudent();
  useAcademic();

  // Simple logic: just check token, don't overcomplicate
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Demo only: If have token but no user, set hardcoded admin user
  if (token && !user) {
    setUser({
      _id: '6880d4bcd940b3d1fe30d088',
      citizen_id: '07520400109', 
      email: 'n.nducthangg@gmail.com',
      role: 'Admin',
      kyc_status: 'Verified',
      phone: '0123456789'
    });
  }

  return <Outlet />;
};

export default ProtectedRoute;

