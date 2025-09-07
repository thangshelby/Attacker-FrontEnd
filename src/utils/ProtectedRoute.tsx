import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  // const { user } = useAuthStore();
  const { user } = useAuth();

  // ✅ Always call hooks at the top level
  const citizenId = user && user.role !== "Admin" ? user.citizen_id : "";
  const { student } = useStudent(citizenId);
  const studentId = student?.student_id || "";
  useAcademic(studentId);
  useNotification();

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  if (user.kyc_status === "Pending") {
    return <Navigate to="/auth/verify-email" replace />;
  }

  if (user.role === "Admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
