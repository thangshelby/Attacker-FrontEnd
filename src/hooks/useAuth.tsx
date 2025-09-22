import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { auth } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "../apis/react-query";
import { useAppStore } from "../store/appStore";

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setError } = useAuthStore();
  const { setToast } = useAppStore();

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await auth.getCurrentUser();
      setUser(data.data.user);
      if (data.data.user.kyc_status === "Pending") {
        navigate("/auth/verify-email");
        return data.data.user;
      } else if (data.data.user.role === "Admin") {
        navigate("/admin");
        return data.data.user;
      }

      setToast({
        type: "success",
        message: "Chào mừng bạn đã quay lại!",
      });

      navigate("/");
      return data.data.user;
    },
    retry: false,
    enabled: false, // ⚠️ DISABLE auto-execute
  });

  const login = useMutation({
    mutationFn: auth.login,
    onSuccess: ({ data }) => {
      setUser(data.data.user);
      queryClient.setQueryData(["currentUser"], data.data.user);
      const token = data.data.accessToken;
      localStorage.setItem("token", token);
      if (data.data.user.kyc_status === "Pending") {
        navigate("/auth/verify-email");
        setToast({
          type: "warn",
          message: "Vui lòng xác thực email để tiếp tục.",
        });
        return;
      }
      if (data.data.user.role === "Admin") {
        navigate("/admin");
        setToast({
          type: "success",
          message: "Chào mừng quản trị viên đã quay lại!",
        });
        return;
      }
      if (data.data.user.role === "User") {
        navigate("/");
        setToast({
          type: "success",
          message: "Đăng nhập thành công! Chào mừng bạn quay lại.",
        });
      }
    },
    onError: (error: any) => {
      console.log(error);
      setError(
        error?.response?.data?.message || error.message || "Đã xảy ra lỗi.",
      );
      setToast({
        type: "error",
        message: "Đăng nhập thất bại!",
      });
    },
  });

  const signUp = useMutation({
    mutationFn: auth.register,
    onSuccess: ({ data }) => {
      setUser(data.data.user);
      queryClient.setQueryData(["currentUser"], data.data.user);
      const token = data.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/auth/verify-email");
      setToast({
        type: "success",
        message: "Đăng ký thành công! Vui lòng xác thực email của bạn.",
      });
    },
    onError: (error: any) => {
      setToast({
        type: "error",
        message: "Đăng ký thất bại!",
      });
      console.log(error);
      setError(
        error?.response?.data?.message || error.message || "Đã xảy ra lỗi.",
      );
    },
  });

  const verifyEmail = useMutation({
    mutationFn: auth.verifyEmail,
    onSuccess: ({ data }) => {
      setUser(data.data.user);
      queryClient.setQueryData(["currentUser"], data.data.user);
      if (data.data.user.role === "Admin") {
        navigate("/admin");
        setToast({
          type: "success",
          message: "Xác thực email thành công! Chào mừng quản trị viên.",
        });
        return;
      }
      navigate("/");
      setToast({
        type: "success",
        message: "Xác thực email thành công! Chào mừng bạn quay lại.",
      });
    },
    onError: (error: any) => {
      setError(
        error?.response?.data?.message || error.message || "Đã xảy ra lỗi.",
      );
      setToast({
        type: "error",
        message: "Xác thực email thất bại!",
      });
    },
  });

  const resendCode = useMutation({
    mutationFn: (email: string) => auth.resendOtp(email),
    onSuccess: () => {
      setToast({
        type: "success",
        message: "Mã xác thực đã được gửi lại!",
      });
    },
    onError: (error: any) => {
      setError(
        error?.response?.data?.message || error.message || "An error occurred",
      );
      setToast({
        type: "error",
        message: "Gửi lại mã xác thực thất bại!",
      });
    },
  });

  const logout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem("token");
      setUser(null);
      queryClient.clear();
      //window.location.href = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"}/auth/login`;
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      queryClient.clear();
      //window.location.href = `${import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"}/auth/login`;
    }
  };

  // ✅ Manual method để check authentication
  const checkAuth = useCallback(async () => {
    try {
      console.log("checkAuth: Making API call...");
      const { data } = await auth.getCurrentUser();
      console.log("checkAuth: API response:", data);
      console.log("checkAuth: Setting user:", data.data.user);
      
      // Update both store and React Query cache
      setUser(data.data.user);
      queryClient.setQueryData(["currentUser"], data.data.user);
      
      console.log("checkAuth: User set in store and query cache");
      return data.data.user;
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      queryClient.setQueryData(["currentUser"], null);
      return null;
    }
  }, [setUser]);

  return {
    user: currentUser,
    isLoading,
    error,
    login,
    signUp,
    verifyEmail,
    resendCode,
    logout,
    checkAuth, // ✅ Export manual check method
  };
}
