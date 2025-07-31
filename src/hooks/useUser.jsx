import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { useAppStore } from "@/store/appStore";
import { user as userAPI } from "../apis/user";

export function useUser() {
  const { user, setUser } = useAuthStore();
  const { setToast } = useAppStore();

  const updateUser = useMutation({
    mutationFn: (data) => userAPI.updateUser(data),
    onSuccess: (data) => {
      setToast({
        type: "success",
        message: "Cập nhật thông tin người dùng thành công !",
      });
      setUser(data.data.user);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const getAllUsers = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await api.getAllUsers();
      return data.data.users;
    },
    onError: (error) => {
      console.error("Error fetching all users:", error);
    },
  });
  const getUsersBySchoolName = useQuery({
    queryKey: ["usersBySchoolName", user.school_name],
    queryFn: async () => {
      const { data } = await api.getUsersBySchoolName(user.school_name);
      return data.data.users;
    },
    enabled: !!user.school_name,
    onError: (error) => {
      console.error("Error fetching users by school name:", error);
    },
  });

  const getUsersBySchoolId = useQuery({
    queryKey: ["usersBySchoolId", user.school_id],
    queryFn: async () => {
      const { data } = await api.getUsersBySchoolId(user.school_id);
      return data.data.users;
    },
    enabled: !!user.school_id,
    onError: (error) => {
      console.error("Error fetching users by school ID:", error);
    },
  });

  const getUsersByRole = useQuery({
    queryKey: ["usersByRole", user.role],
    queryFn: async () => {
      const { data } = await api.getUsersByRole(user.role);
      return data.data.users;
    },
    enabled: !!user.role,
    onError: (error) => {
      console.error("Error fetching users by role:", error);
    },
  });

  const getUserById = useQuery({
    queryKey: ["userById", user.id],
    queryFn: async () => {
      const { data } = await api.getUserById(user.id);
      return data.data.user;
    },
    enabled: !!user.id,
    onError: (error) => {
      console.error("Error fetching user by ID:", error);
    },
  });

  return {
    updateUser,
    getUsersBySchoolName,
    getUserById,
    getUsersBySchoolId,
    getUsersByRole,
  };
}
