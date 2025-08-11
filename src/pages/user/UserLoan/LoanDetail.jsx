import React from "react";
import { useAppStore } from "@/store/appStore";
import {
  ArrowLeft,
  FileText,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  User,
  // Info
  GraduationCap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoan } from "@/hooks/useLoan";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/hooks/useAuth";

const UserLoanDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loanId = location.pathname.split("/").pop();
  const { user } = useAuth();
  const { student } = useStudent(user?.citizen_id);
  const { selectedLoan, isLoadingLoan, loanError } = useLoan(loanId);

  const handleBackToHistory = () => {
    navigate("/history");
  };

  if (!selectedLoan) {
    return (
      <div className="p-6 text-center">Không tìm thấy thông tin khoản vay</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={handleBackToHistory}
            className="mb-4 flex cursor-pointer items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:opacity-50"
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

        {/* Loan Info */}
        <div className="overflow-hidden rounded-2xl border bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <CreditCard className="mr-2 h-5 w-5" />
              Thông tin khoản vay
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<DollarSign className="h-4 w-4" />}
              label="Số tiền vay"
              value={`${selectedLoan.loan_amount_requested.toLocaleString()} VND`}
              valueClass="text-indigo-600 dark:text-indigo-400"
            />
            <InfoCard
              icon={<Calendar className="h-4 w-4" />}
              label="Ngày tạo"
              value={new Date(selectedLoan.created_at).toLocaleDateString()}
            />
            <div className="rounded-lg border p-4 dark:border-gray-600">
              <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                <CheckCircle className="mr-2 h-4 w-4" /> Trạng thái
              </div>
              <div className="mt-2">
                <StatusBadge status={selectedLoan.status} />
              </div>
            </div>

            <InfoCard
              label="Thời hạn vay"
              value={`${selectedLoan.loan_tenor} tháng`}
            />
            <InfoCard
              label="Trả hàng tháng"
              value={`${selectedLoan.monthly_installment.toLocaleString()} VND`}
              valueClass="text-green-600 dark:text-green-400"
            />
            <InfoCard
              label="Tổng lãi"
              value={`${selectedLoan.total_interest.toLocaleString()} VND`}
            />
            <InfoCard
              label="Tổng phải trả"
              value={`${selectedLoan.total_payment.toLocaleString()} VND`}
            />
            <InfoCard
              label="Mục đích vay"
              value={
                selectedLoan.loan_purpose === "other"
                  ? selectedLoan.custom_purpose
                  : selectedLoan.loan_purpose
              }
            />
            <InfoCard
              label="Thu nhập gia đình"
              value={selectedLoan.family_income}
            />
            <InfoCard
              label="Phương thức thanh toán"
              value={selectedLoan.payment_method}
            />
            <InfoCard
              label="Tần suất thanh toán"
              value={selectedLoan.payment_frequency || "Không có"}
            />
            {selectedLoan.reason && (
              <InfoCard
                label="Lý do (nếu bị từ chối)"
                value={selectedLoan.reason}
              />
            )}
          </div>
        </div>

        {/* Student Information */}
        {selectedLoan.student_id && (
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
                  <InfoRow
                    icon={<User className="mr-2 h-4 w-4" />}
                    label="Họ và tên"
                    value={user?.name || "—"}
                  />
                  <InfoRow
                    icon={<GraduationCap className="mr-2 h-4 w-4" />}
                    label="Mã sinh viên"
                    value={student?.student_id || "—"}
                  />
                  <InfoRow
                    icon={<Phone className="mr-2 h-4 w-4" />}
                    label="Số điện thoại"
                    value={user?.phone || "—"}
                  />
                  <InfoRow
                    icon={<Mail className="mr-2 h-4 w-4" />}
                    label="Email"
                    value={user?.email || "—"}
                  />
                </div>

                <div className="space-y-4">
                  <InfoRow
                    label="Trường đại học"
                    value={student?.university || "—"}
                  />
                  <InfoRow label="Khoa" value={student?.faculty_name || "—"} />
                  <InfoRow
                    label="Chuyên ngành"
                    value={student?.major_name || "—"}
                  />
                  <InfoRow
                    label="Năm học"
                    value={
                      student?.year_of_study
                        ? `Năm ${student?.year_of_study}`
                        : "—"
                    }
                  />
                </div>
              </div>

              <div className="mt-6">
                <InfoRow
                  icon={<MapPin className="mr-2 h-4 w-4" />}
                  label="Địa chỉ"
                  value={user?.address || "—"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component nhỏ tái sử dụng
const InfoRow = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
      {icon} {label}
    </div>
    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
      {value}
    </div>
  </div>
);
const InfoCard = ({ icon, label, value, valueClass }) => (
  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
    {icon && (
      <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {icon} {label}
      </div>
    )}
    {!icon && (
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
    )}
    <div
      className={`mt-1 text-lg font-semibold ${valueClass || "text-gray-900 dark:text-white"}`}
    >
      {value}
    </div>
  </div>
);

export default UserLoanDetail;
