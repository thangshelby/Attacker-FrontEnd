import React from "react";
import { CheckCircle, XCircle } from "lucide-react"; 

const DecisionBadge = ({ decision, size = "normal" }) => {
  const isApprove = decision === "approve";
  const sizeClasses =
    size === "large" ? "px-6 py-3 text-base" : "px-4 py-2 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold shadow-lg transition-all hover:scale-105 ${sizeClasses} ${
        isApprove
          ? "border border-green-600/50 bg-green-900/30 text-green-300"
          : "border border-red-600/50 bg-red-900/30 text-red-300"
      }`}
    >
      {isApprove ? (
        <>
          <div className="mr-2 rounded-full bg-green-800/50 p-1">
            <CheckCircle className="h-4 w-4 text-green-400" />
          </div>
          {size === "large" ? "CHẤP THUẬN" : "Chấp thuận"}
        </>
      ) : (
        <>
          <div className="mr-2 rounded-full bg-red-800/50 p-1">
            <XCircle className="h-4 w-4 text-red-400" />
          </div>
          {size === "large" ? "TỪ CHỐI" : "Từ chối"}
        </>
      )}
    </span>
  );
};

export default DecisionBadge;