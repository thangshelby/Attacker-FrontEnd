import React from "react";
import {
  CheckCircle,

} from "lucide-react";
const StepIndicator = ({ currentStep }) => {
  const steps = [
    {
      title: "Thu thập thông tin",
      description: "Điền thông tin khoản vay",
    },
    {
      title: "Xác minh học tập",
      description: "Xác minh kết quả học tập",
    },
    {
      title: "Xem thông tin",
      description: "Xem lại và gửi yêu cầu",
    },
    {
      title: "Xác thực OTP",
      description: "Xác nhận qua email",
    },
    {
      title: "Kết quả đánh giá",
      description: "Kết quả từ hệ thống AI",
    },
  ];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                index + 1 < currentStep
                  ? "border-green-500 bg-green-500 text-white"
                  : index + 1 === currentStep
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-gray-200 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {index + 1 < currentStep ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>
            <div className="ml-3 text-sm">
              <div
                className={`font-medium ${
                  index + 1 <= currentStep
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {step.description}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 w-12 ${
                  index + 1 < currentStep
                    ? "bg-green-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
