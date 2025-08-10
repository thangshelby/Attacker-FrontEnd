import { useMutation, useQuery } from "@tanstack/react-query";
import { auth } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "../apis/react-query";
import { useAppStore } from "../store/appStore";

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setError, user } = useAuthStore();
  const { setToast } = useAppStore();

  // Simplified: No complex query logic, just use what's in store
  const currentUser = user;
  const isLoading = false;
  const error = null;

  const login = useMutation({
    mutationFn: auth.login,
    onSuccess: ({ data }) => {
      setUser(data.data.user);
      queryClient.setQueryData(["currentUser"], data.data.user);
      const token = data.data.accessToken;
      localStorage.setItem("token", token);
      
      // Demo mode: Skip email verification, direct login
      if (data.data.user.role === "Admin") {
        navigate("/admin");
        setToast({
          type: "success",
          message: "Welcome back, Admin!",
        });
        return;
      }
      if (data.data.user.role === "User") {
        navigate("/");
        setToast({
          type: "success",
          message: "Welcome back!",
        });
      }
    },
    onError: (error) => {
      setError(error.response.data.message);
    },
  });

  const signUp = useMutation({
    mutationFn: auth.register,
    onSuccess: ({ data }) => {
      setUser(data.data.user);
      queryClient.setQueryData(["currentUser"], data.data.user);
      const token = data.data.accessToken;
      localStorage.setItem("token", token);
      
      // Demo mode: Skip email verification, direct to dashboard
      navigate("/");
      setToast({
        type: "success",
        message: "Registration successful! Welcome!",
      });
    },
    onError: (error) => {
      setToast({
        type: "error",
        message: "Thất bại!",
      });
      setError(error.response.data.message);
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
          message: "Email verified! Welcome back, Admin!",
        });
        return;
      }
      navigate("/");
      setToast({
        type: "success",
        message: "Email verified! Welcome back!",
      });
    },
    onError: (error) => {
      setError(error.response.data.message);
    },
  });

  const logout = async () => {
    try {
      await auth.logout();
      localStorage.removeItem("token");
      setUser(null);
      queryClient.clear();
      // Redirect to login page after logout
      window.location.href = "http://localhost:5173/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout API fails, clear local state and redirect
      localStorage.removeItem("token");
      setUser(null);
      queryClient.clear();
      window.location.href = "http://localhost:5173/auth/login";
    }
  };

  return {
    user: currentUser,
    isLoading,
    error,
    login,
    signUp,
    verifyEmail,
    logout,
  };
}
