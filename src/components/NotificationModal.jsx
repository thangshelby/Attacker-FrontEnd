import React from "react";
import { useAppStore } from "@/store/appStore";

const NotificationModal = () => {
  const { modal, clearModal } = useAppStore();

  if (!modal) {
    return null;
  }

  const handleClose = () => {
    clearModal();
  };

  const getTypeConfig = (type) => {
    switch (type) {
      case "success":
        return {
          iconColor: "text-green-500",
          borderColor: "border-green-500",
          buttonColor: "bg-green-500 hover:bg-green-600",
          icon: (
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        };
      case "warn":
        return {
          iconColor: "text-yellow-500",
          borderColor: "border-yellow-500",
          buttonColor: "bg-yellow-500 hover:bg-yellow-600",
          icon: (
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          ),
        };
      case "error":
      default:
        return {
          iconColor: "text-red-500",
          borderColor: "border-red-500",
          buttonColor: "bg-red-500 hover:bg-red-600",
          icon: (
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
        };
    }
  };

  const typeConfig = getTypeConfig(modal.type);

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/45">
      <div className="relative w-auto rounded-lg bg-white p-6 shadow-xl">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div
            className={`h-16 w-16 rounded-full border-2 ${typeConfig.borderColor} flex items-center justify-center ${typeConfig.iconColor}`}
          >
            {typeConfig.icon}
          </div>
        </div>

        {/* Title */}
        <div className="mb-2 text-center">
          <h3 className={`text-lg font-semibold ${typeConfig.iconColor}`}>
            {modal.title ||
              (modal.type === "success"
                ? "Success!"
                : modal.type === "warn"
                  ? "Warning!"
                  : "Invalid email!")}
          </h3>
        </div>

        {/* Message */}
        <div className="mb-6 px-4 text-center">
          <p className="text-sm text-gray-600">
            {modal.message || "This email is already registered, please login."}
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className={`cursor-pointer rounded px-6 py-2 font-medium text-white transition-colors ${typeConfig.buttonColor}`}
          >
            {modal.buttonText || "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
