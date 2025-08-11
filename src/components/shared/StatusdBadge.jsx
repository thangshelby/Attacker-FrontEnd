import React from "react";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "accepted":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-300",
          icon: CheckCircle,
          label: "Chấp nhận",
        };
      case "pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-800 dark:text-yellow-300",
          icon: Clock,
          label: "Đang chờ",
        };
      case "rejected":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-800 dark:text-red-300",
          icon: XCircle,
          label: "Từ chối",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-700",
          text: "text-gray-800 dark:text-gray-300",
          icon: AlertCircle,
          label: "Không xác định",
        };
    }
  };

  const { bg, text, icon: Icon, label } = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${bg} ${text}`}
    >
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </span>
  );
};

export default StatusBadge;
