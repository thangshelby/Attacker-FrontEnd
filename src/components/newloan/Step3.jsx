import React, { useState } from "react";
import {
  DollarSign,
  Calculator,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  GraduationCap,
  Award,
} from "lucide-react";
import {
  loanPurposes,
  paymentMethods,
  paymentFrequencies,
} from "@/constants/newloan";
const Step3 = ({ formData, studentInfo }) => {
  const [verificationId, setVerificationId] = useState(null);

  const selectedPurpose = loanPurposes.find(
    (p) => p.id === parseInt(formData.loan_purpose),
  );
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const getPurposeDisplayText = () => {
    if (formData.loan_purpose === "6" && formData.custom_purpose) {
      return formData.custom_purpose;
    }
    return selectedPurpose?.name || "";
  };
  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(
      (pm) => pm.id === parseInt(formData.payment_method),
    );
  };
  const selectedPaymentMethod = getSelectedPaymentMethod();

  return (
    <div>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          <FileText className="mr-2 h-5 w-5" />
          Bước 3: Xem lại thông tin và gửi yêu cầu
        </h2>
      </div>

      <div className="space-y-8 p-6">
        {/* Loan Summary */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Loan Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                Thông tin khoản vay
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Số tiền vay:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(formData.requested_loan_amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Thời hạn:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {formData.loan_tenor} tháng
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Mục đích:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {getPurposeDisplayText()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Người bảo lãnh:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {formData.guarantor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Thu nhập gia đình:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(formData.family_income)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Phương thức trả:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {selectedPaymentMethod?.shortName}
                      {formData.payment_frequency && (
                        <span className="text-sm">
                          {" "}
                          (Mỗi {formData.payment_frequency} tháng)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-green-800 dark:text-green-200">
                <Calculator className="mr-2 h-5 w-5" />
                Tóm tắt thanh toán
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700 dark:text-green-300">
                    Tổng lãi:
                  </span>
                  <span className="font-bold text-green-800 dark:text-green-200">
                    {formatCurrency(formData.total_interest)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700 dark:text-green-300">
                    Tổng tiền phải trả:
                  </span>
                  <span className="text-xl font-bold text-green-800 dark:text-green-200">
                    {formatCurrency(formData.total_payment)}
                  </span>
                </div>
                <div className="border-t border-green-200 pt-2 text-xs text-green-600 dark:border-green-700 dark:text-green-400">
                  Lãi suất:{" "}
                  {(selectedPaymentMethod?.interestRate * 100).toFixed(1)}
                  %/năm
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Student Info */}
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                <User className="mr-2 h-5 w-5 text-blue-500" />
                Thông tin sinh viên đã xác minh
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Họ và tên:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {studentInfo.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Mã sinh viên:
                  </span>
                  <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                    {studentInfo.studentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Ngành học:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {studentInfo.major}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Khóa học:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {studentInfo.academicYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200">
                <GraduationCap className="mr-2 h-5 w-5" />
                Kết quả học tập
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">GPA:</span>
                  <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {studentInfo.gpa}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-300">
                    Tín chỉ:
                  </span>
                  <span className="font-semibold text-blue-800 dark:text-blue-200">
                    {studentInfo.completedCredits}/{studentInfo.totalCredits}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">
                    Xếp loại:
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      studentInfo.academicRank === "Xuất sắc"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : studentInfo.academicRank === "Giỏi"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : studentInfo.academicRank === "Khá"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    <Award className="mr-1 h-3 w-3" />
                    {studentInfo.academicRank}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <h5 className="font-medium text-green-800 dark:text-green-200">
                    Đã xác minh
                  </h5>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Thông tin học tập đã được xác minh qua Verifiable Credential
                  </p>
                  <p className="mt-1 font-mono text-xs text-green-600 dark:text-green-400">
                    ID: {verificationId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Confirmation */}
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="mr-2 h-5 w-5" />
            Xác nhận cuối cùng
          </h3>
          <div className="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
            <p>
              • Tôi xác nhận rằng tất cả thông tin đã cung cấp là chính xác và
              trung thực.
            </p>
            <p>
              • Tôi hiểu rằng việc cung cấp thông tin sai sự thật có thể dẫn đến
              việc từ chối khoản vay.
            </p>
            <p>• Tôi đồng ý với các điều khoản và điều kiện của khoản vay.</p>
            <p>
              • Tôi hiểu rằng lãi suất và điều khoản cuối cùng sẽ được xác định
              sau khi đánh giá hồ sơ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
