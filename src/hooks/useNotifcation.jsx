import { useQuery, useMutation } from "@tanstack/react-query";
import { notification } from "../apis/notification"; // Sửa đường dẫn nếu khác
import { queryClient } from "../apis/react-query";
import { useAppStore } from "../store/appStore";
import { useAuth } from "./useAuth";

export function useNotification() {
  const { setToast } = useAppStore();
  const { user } = useAuth();
  const citizen_id = user.citizen_id;
  // 1. Get all notifications
  const allNotifications = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const { data } = await notification.getAllNotifications();
        return data.data || []; // Backend returns { data: notifications_array }
      } catch (error) {
        console.error("Error fetching all notifications:", error);
        return [];
      }
    },
    enabled: !citizen_id, // chỉ gọi khi không có citizen_id
    retry: 3,
    refetchOnWindowFocus: false,
  });

  // 2. Get notifications by citizen_id
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", citizen_id],
    queryFn: async () => {
      try {
        const response = await notification.getNotificationsByCitizenId(citizen_id);
        // Based on backend controller, the structure is response.data.data (which is the array)
        return response.data.data || [];
      } catch (error) {
        console.error("Error fetching notifications:", error);
        return []; // Return empty array on error
      }
    },
    enabled: !!citizen_id,
    retry: 3, // Retry failed requests
    refetchOnWindowFocus: false,
  });

  // 3. Create notification
  const createNotification = useMutation({
    mutationFn: notification.createNotification,
    onSuccess: () => {
      setToast({
        type: "success",
        message: "Created notification successfully.",
      });
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => {
      setToast({ type: "error", message: "Failed to create notification." });
    },
  });

  // 4. Update notification
  const updateNotification = useMutation({
    mutationFn: ({ id, data }) => notification.updateNotification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => {
      setToast({ type: "error", message: "Failed to update notification." });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: () => notification.markAllAsRead(citizen_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => {
      setToast({ type: "error", message: "Failed to update notification." });
    },
  });
  // 5. Delete notification
  const remove = useMutation({
    mutationFn: (id) => notification.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => {
      setToast({ type: "error", message: "Failed to delete notification." });
    },
  });

  return {
    // Queries
    // notificationsByUser,
    notifications,
    isLoading,
    allNotifications,
    // Mutations
    createNotification,
    updateNotification,
    markAllAsRead,
    remove,
  };
}
