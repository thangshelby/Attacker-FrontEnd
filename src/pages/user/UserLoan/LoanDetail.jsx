import React, { useEffect } from "react";
import { useAppStore } from "@/store/appStore";
import {
  ArrowLeft,
  FileText,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  User,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { useNavigate, useLocation } from "react-router-dom";

const LoanDetail = () => {
  const { loan } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackToHistory = () => {
    navigate("/user/loans/history");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackToHistory}
            className="mb-4 flex cursor-pointer items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại lịch sử giao dịch
          </button>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Chi Tiết Khoản Vay
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Thông tin chi tiết về khoản vay của bạn
            </p>
          </div>
        </div>

        {/* Loan Details */}
        <div className="space-y-6">
          {/* Loan Overview */}
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="flex items-center text-lg font-semibold text-white">
                <CreditCard className="mr-2 h-5 w-5" />
                Thông tin khoản vay
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Số tiền vay
                  </div>
                  <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {selectedLoan.soTienVay} VND
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-2 h-4 w-4" />
                    Ngày nộp hồ sơ
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedLoan.ngayLapHoSo}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedLoan.thoiGianLapHoSo}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Trạng thái
                  </div>
                  <div className="mt-2">
                    <StatusBadge
                      status={selectedLoan.status}
                      text={selectedLoan.tinhTrang}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Lãi suất
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {mockLoanDetail.interestRate}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Thời hạn vay
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {mockLoanDetail.loanTerm}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Trả hàng tháng
                  </div>
                  <div className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">
                    {mockLoanDetail.monthlyPayment} VND
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Mục đích vay
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {mockLoanDetail.purpose}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="flex items-center text-lg font-semibold text-white">
                <User className="mr-2 h-5 w-5" />
                Thông tin sinh viên
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <User className="mr-2 h-4 w-4" />
                      Họ và tên
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.name}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Mã sinh viên
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.studentId}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Phone className="mr-2 h-4 w-4" />
                      Số điện thoại
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.phone}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.email}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Trường đại học
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.university}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Khoa
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.faculty}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Chuyên ngành
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {mockLoanDetail.studentInfo.major}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Năm học
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      Năm {mockLoanDetail.studentInfo.year}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <MapPin className="mr-2 h-4 w-4" />
                  Địa chỉ
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {mockLoanDetail.studentInfo.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
