import { useMutation, useQuery } from "@tanstack/react-query";
import { auth } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../store/authStore";
import {queryClient } from '../apis/react-query'

export function useAuth() {
  const navigate = useNavigate();
  const {setUser,setError} = useAuthStore();
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],  
    queryFn: async () => {
      const { data } = await auth.getCurrentUser();
      setUser(data.data);
      return data;
    },
    retry: false,
    enabled: true,
  });

  const login = useMutation({
    mutationFn: auth.login,
    onSuccess: ({ data }) => {
      setUser(data.data);
      queryClient.setQueryData(["currentUser"], data.data);
      navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error) => {
      setError(error.response.data.message);
    },
  });

  const signUp = useMutation({
    mutationFn: auth.register,
    onSuccess: ({ data }) => {
      console.log(data.data)
      setUser(data.data);
      queryClient.setQueryData(["currentUser"], data.data);
      // navigate("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    logout,
    // updateUser: updateUser.mutate,
  };
}