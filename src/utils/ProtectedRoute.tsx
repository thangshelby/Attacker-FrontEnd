import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Outlet } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user } = useAuthStore();
  const { checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  // ✅ Always call hooks at the top level
  const citizenId = user && user.role !== "Admin" ? user.citizen_id : "";
  const { student } = useStudent(citizenId);
  const studentId = student?.student_id || "";
  useAcademic(studentId);
  useNotification();

  useEffect(() => {
    const initAuth = async () => {
      if (!user && localStorage.getItem("token")) {
        await checkAuth();
      }
      setIsChecking(false);
    };
    initAuth();
  }, [user, checkAuth]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
