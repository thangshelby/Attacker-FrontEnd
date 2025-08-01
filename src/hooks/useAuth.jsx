import { useMutation, useQuery } from "@tanstack/react-query";
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
        message: "Welcome back !",
      });
      navigate("/");
      return data.data.user;
    },
    retry: false,
    enabled: true,
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
          type: "info",
          message: "Please verify your email to continue.",
        });
        return;
      }
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
      navigate("/auth/verify-email");
      setToast({
        type: "success",
        message: "Registration successful! Please verify your email.",
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
    } catch (error) {
      console.error("Logout failed:", error);
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
