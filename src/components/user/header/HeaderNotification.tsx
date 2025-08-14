import React, { useState, useEffect, forwardRef } from "react";
import { useNotification } from "@/hooks/useNotifcation";
import { Bell, X, CheckCircle } from "lucide-react";
import { getIcon } from "@/utils/getIcon";
import { getUploadElapsedTime } from "@/utils";
import { getSocket } from "@/services/socket";
import { queryClient } from "@/apis/react-query";
import { useAuth } from "@/hooks/useAuth";

const HeaderNotification = forwardRef((_, notificationRef) => {
  // const {handleNewNotification, emitNewNotification} = useNotifcationRealTime();
  const { notifications, updateNotification, markAllAsRead } =
    useNotification();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    if (!notificationRef) return;
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationRef]);

  useEffect(() => {
    if (notifications) {
      setUnreadCount(notifications.filter((n) => !n.is_read).length);
    }
  }, [notifications]);
  useEffect(() => {
    const socket = getSocket();

    const handleNoti = (data) => {
      console.log("📢 Notification:", data);
      queryClient.setQueryData(
        ["notifications", user?.citizen_id],
        (oldData) => {
          const newNotifications = [...(oldData || []), data];
          return newNotifications;
        },
      );
      setUnreadCount((prev) => prev + 1);
      queryClient.invalidateQueries(["notifications", user?.citizen_id]);
    };

    socket?.on("notification", (newNoti) => {
      console.log("📢 Notification:", newNoti);
      queryClient.setQueryData(
        ["notifications", user?.citizen_id],
        (oldData) => {
          const newNotifications = [...(oldData || []), newNoti.data];
          return newNotifications;
        },
      );
      setUnreadCount((prev) => prev + 1);
      console.log("Updated unread count:", unreadCount);
      queryClient.invalidateQueries(["notifications", user?.citizen_id]);
    });

    return () => {
      socket?.off("notification", handleNoti);
    };
  }, []);

  const handleMarkAsRead = (id) => {
    updateNotification.mutate({
      id,
      data: {
        is_read: true,
      },
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate();
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <button
        onClick={toggleNotifications}
        className={`relative cursor-pointer rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ${
          unreadCount.length ? "animate-bounce" : ""
        }`}
      >
        <Bell
          className={`h-6 w-6 ${showNotifications ? "text-blue-600 dark:text-blue-400" : ""}`}
        />
        {unreadCount > 0 && (
          <>
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
            {/* Pulsing ring effect */}
            <span className="absolute -top-1 -right-1 h-5 w-5 animate-ping rounded-full bg-red-400 opacity-75"></span>
          </>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
});

export default HeaderNotification;
const NotificationDropdown = ({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "warning":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "error":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="animate-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-2 w-96 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Thông báo
          </h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="cursor-pointer text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {!notifications ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Không có thông báo nào
            </p>
          </div>
        ) : (
          notifications?.map((notification) => {
            const IconComponent = getIcon(notification?.icon);
            return (
              <div
                key={notification?._id}
                className={`border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 ${
                  !notification?.is_read
                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                    : ""
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${getTypeStyles(notification?.type)}`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <p
                        className={`text-sm font-medium ${
                          !notification?.is_read
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {notification?.header}
                      </p>
                      {!notification?.is_read && (
                        <button
                          onClick={() => onMarkAsRead(notification?._id)}
                          className="ml-2 flex-shrink-0 cursor-pointer rounded-full p-1 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30"
                          title="Đánh dấu đã đọc"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {notification?.content}
                    </p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      {getUploadElapsedTime(notification.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications?.length > 0 && (
        <div className="border-t border-gray-200 p-3 dark:border-gray-700">
          <button className="w-full cursor-pointer rounded-lg py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30">
            Xem tất cả thông báo
          </button>
        </div>
      )}
    </div>
  );
};
