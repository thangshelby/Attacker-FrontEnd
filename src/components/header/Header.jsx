import React, { useState, useRef, useEffect } from "react";
import { Bell, MoreVertical, X, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotifcation";
import { getIcon } from "@/utils/getIcon";
import HeaderNotification from "./HeaderNotification";
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

const Header = () => {
  const notificationRef = useRef(null);
  const { user } = useAuth();

  // Debug: Check user object
  console.log("User in Header component:", user);

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
          <HeaderNotification notificationRef={notificationRef} />
        </div>

        {/* User Profile */}
        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
          <img
            src={
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            }
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
