import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/appStore";
import { user as userAPI } from "../apis/user";
import { queryClient } from "@/apis/react-query";

export function useUpdateUser() {
  const { setToast } = useAppStore();
  const { mutate: updateUser,isPending:updateUserLoading } = useMutation({
    mutationFn: (data: any) => userAPI.updateUser(data),
    onSuccess: (data) => {
      setToast({
        type: "success",
        message: "Cập nhật thông tin người dùng thành công !",
      });
      queryClient.setQueryData(["currentUser"], data.data.user);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
  // const getUserById = useQuery({
  //   queryKey: ["userById", user?.id],
  //   queryFn: async () => {
  //     const { data } = await userAPI.getUserById(user?.id);
  //     return data.data.user;
  //   },
  //   enabled: !!user?.id,
  // });

  // const getUsersBySchoolName = useQuery({
  //   queryKey: ["usersBySchoolName", user?.school_name],
  //   queryFn: async () => {
  //     const { data } = await userAPI.getUsersBySchoolName(user?.school_name);
  //     return data.data.users;
  //   },
  //   enabled: !!user?.school_name,
  //   onError: (error) => {
  //     console.error("Error fetching users by school name:", error);
  //   },
  // });

  // const getUsersBySchoolId = useQuery({
  //   queryKey: ["usersBySchoolId", user?.school_id],
  //   queryFn: async () => {
  //     const { data } = await userAPI.getUsersBySchoolId(user?.school_id);
  //     return data.data.users;
  //   },
  //   enabled: !!user?.school_id,
  //   onError: (error) => {
  //     console.error("Error fetching users by school ID:", error);
  //   },
  // });

  return {
    updateUser,
    updateUserLoading
    // getUsersBySchoolName,
    // getUserById,
    // getUsersBySchoolId,
    // getUsersByRole,
  };
}

export function useUserByCitizenId(citizen_id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", citizen_id],
    queryFn: () => userAPI.getUserByCitizenId(citizen_id),
    enabled: !!citizen_id,
  });
  return {
    user: data,
    isLoading,
    error,
  };
}
