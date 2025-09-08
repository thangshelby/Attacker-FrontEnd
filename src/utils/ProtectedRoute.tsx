import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore();
  const { checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const hasCheckedAuth = useRef(false);

  // ✅ Always call hooks at the top level
  const citizenId = user && user.role !== "Admin" ? user.citizen_id : "";
  const { student } = useStudent(citizenId);
  const studentId = student?.student_id || "";
  useAcademic(studentId);
  useNotification();

  useEffect(() => {
    const initAuth = async () => {
      // Prevent double execution in React Strict Mode
      if (hasCheckedAuth.current) {
        console.log("ProtectedRoute: Auth already checked, skipping");
        return;
      }
      
      const token = localStorage.getItem("token");
      console.log("ProtectedRoute: Token exists:", !!token, "User exists:", !!user);
      
      if (token && !user) {
        hasCheckedAuth.current = true;
        try {
          console.log("Checking auth with token...");
          const result = await checkAuth();
          console.log("Auth check result:", result);
        } catch (error) {
          console.error("Auth initialization failed:", error);
          localStorage.removeItem("token");
        }
      }
      // Always set checking to false after the auth check attempt
      console.log("Setting isChecking to false");
      setIsChecking(false);
    };
    
    // Add timeout as fallback
    const timeoutId = setTimeout(() => {
      console.log("Auth check timeout reached");
      setIsChecking(false);
    }, 2000); // Reduced from 3000ms to 2000ms
    
    initAuth().finally(() => {
      clearTimeout(timeoutId);
    });
    
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array - only run once on mount

  // Separate effect to handle when user state changes
  useEffect(() => {
    console.log("ProtectedRoute: User state changed:", user);
    if (user) {
      console.log("ProtectedRoute: User exists, stopping loading");
      setIsChecking(false);
    }
  }, [user]);

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

  if (user.kyc_status === "Pending") {
    return <Navigate to="/auth/verify-email" replace />;
  }

  if (user.role === "Admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
