import { useMutation, useQuery } from "@tanstack/react-query";
import { auth } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { queryClient } from "../apis/react-query";
import { toast } from "react-toastify";
import { useAppStore } from "../store/appStore";
import { set } from "zod";

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setError } = useAuthStore();
  const { setLoading, setMessage, setError: setAppError } = useAppStore();

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
      setMessage("Welcome back!");
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
        setMessage("Please verify your email to continue.");
        return;
      }
      if (data.data.user.role === "Admin") {
        navigate("/admin");
        setMessage("Welcome back, Admin!");
        return;
      }
      if (data.data.user.role === "User") {
        navigate("/");
        setMessage("Welcome back!");
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
      setMessage("Registration successful! Please verify your email.");
    },
    onError: (error) => {
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
        setMessage("Email verified! Welcome back, Admin!");
        return;
      }
      navigate("/");
      setMessage("Email verified! Welcome back!");
    },
    onError: (error) => {
      setError(error.response.data.message);
    },
  });

  const logout = async () => {
    try {
      await auth.logout(); // Call the server to clear cookies
      localStorage.removeItem("token");
      setUser(null);
      queryClient.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  //   const updateUser = useMutation({
  //     mutationFn: users.update,
  //     onSuccess: ({ data }) => {
  //       setUser(data.data);
  //       queryClient.setQueryData(["currentUser"], { data: data.data });
  //     },
  //
  //     onError: (error: any) => {
  //       console.error("Update failed:", error);
  //     },
  //   });

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
