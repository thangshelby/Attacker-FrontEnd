import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  MoreVertical,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Award,
  FileText,
  Users,
  Calendar,
  Settings,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/store/notificationStore";
// Mock theme toggle component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
};

// Mock user data
const mockUser = {
  name: "Ngo Nguyen Duc Thang",
  email: "thangnd@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
};

const NotificationDropdown = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Không có thông báo nào
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 ${
                  !notification.isRead
                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                    : ""
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${getTypeStyles(notification.type)}`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <p
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="ml-2 flex-shrink-0 rounded-full p-1 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30"
                          title="Đánh dấu đã đọc"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-gray-200 p-3 dark:border-gray-700">
          <button className="w-full rounded-lg py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30">
            Xem tất cả thông báo
          </button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { notifications, updateNotification } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const notificationRef = useRef(null);
  const { user } = useAuth();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdown when clicking outside
  useEffect(() => {
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
  }, []);

  // Simulate new notification animation
  useEffect(() => {
    if (unreadCount > 0) {
      setHasNewNotification(true);
      const timer = setTimeout(() => setHasNewNotification(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  const handleMarkAsRead = (id) => {
    // setNotifications((prev) =>
    //   prev.map((notification) =>
    //     notification.id === id
    //       ? { ...notification, isRead: true }
    //       : notification,
    //   ),
    // );
  };

  const handleMarkAllAsRead = () => {
    // setNotifications((prev) =>
    //   prev.map((notification) => ({ ...notification, isRead: true })),
    // );
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md dark:bg-gray-900">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          My Website
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={toggleNotifications}
            className={`relative cursor-pointer rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ${
              hasNewNotification ? "animate-bounce" : ""
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
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* User Profile */}
        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
          <img
            src={mockUser.avatar}
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            alt="user avatar"
          />
          <div className="min-w-0 leading-4">
            <h4 className="truncate font-bold text-gray-800 dark:text-gray-100">
              {user.name}
            </h4>
            <span className="block truncate text-xs font-medium text-gray-600 dark:text-gray-400">
              {user.email}
            </span>
          </div>
          <MoreVertical
            size={20}
            className="flex-shrink-0 text-gray-600 dark:text-gray-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
