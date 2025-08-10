import React, { useState, useEffect } from "react";
import {
  History,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Eye,
  ArrowLeft,
  Sparkles,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { useStudentLoans } from "@/hooks/useLoan";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";


const LoanHistoryPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const { student } = useStudent();
  console.log(user,student)
  const { loans, isLoadingLoans, loansError, refetch } = useStudentLoans(student?.student_id);

  // Refetch data when component mounts to ensure fresh data
  useEffect(() => {
    if (student?.student_id && refetch) {
      console.log("📱 History page mounted - refetching loan data");
      refetch();
    }
  }, [student?.student_id, refetch]);
  const mockLoanDetail = {
    id: 1,
    loanAmount: "20,000,000",
    applicationDate: "2025-08-04",
    applicationTime: new Date().getTime(),
    approvalDate: "2025-08-05 - 2025-08-06",
    status: "Đang xử lý",
    interestRate: "6%",
    loanTerm: "12 tháng",
    monthlyPayment: "545.796",
    purpose: "Chi phí học tập",
    studentInfo: {
      name: user?.name || "Nguyễn Văn A",
      studentId: user?.student_id || "K22414694",
      university: "Đại học Kinh Tế - Luật - ĐHQG TPHCM",
      faculty: "Công nghệ Thông tin",
      major: "FINTECH",
      year: "3",
      phone: user?.phone || "0901234567",
      email: user?.email || "student@example.com",
      address: user?.address || "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
    },
  };
  const handleViewDetail = (loan) => {
    setSelectedLoan({ ...mockLoanDetail, ...loan });
  };

  const handleBackToHistory = () => {
    setSelectedLoan(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Pagination logic

  if (selectedLoan) {
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
  }

  const handleBackToList = () => {
    setSelectedLoan(null);
  };
 
  if (isLoadingLoans) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Đang tải dữ liệu lịch sử giao dịch...</p>
        </div>
      </div>
    );
  }

  if (loansError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Có lỗi xảy ra khi tải dữ liệu</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Vui lòng thử lại sau</p>
          </div>
        </div>
      );
    }
  // Sort loans by created_at (newest first) before pagination
  const sortedLoans = loans?.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA; // Newest first (descending order)
  });

  const totalPages = Math.ceil((sortedLoans?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedLoans?.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto px-4 py-8 lg:px-20 2xl:px-24">
        {/* Header */}
        <div className="mb-8 flex flex-row items-center justify-start gap-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg lg:h-12 lg:w-12 2xl:h-16 2xl:w-16">
            <History className="h-4 w-4 text-white lg:h-6 lg:w-6 2xl:h-8 2xl:w-8" />
          </div>

          <div className="flex h-full flex-col items-start justify-between">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-bold text-transparent lg:text-xl xl:text-2xl 2xl:text-3xl">
              Lịch sử vay
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Lịch sử giao dịch vay vốn của bạn
            </p>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <Sparkles className="mr-2 h-5 w-5" />
              Lịch sử giao dịch
            </h2>
          </div>

          {/* Filter Options */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-700/50">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lọc theo tháng:
                </label>
                <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="">Tất cả</option>
                  <option value="01">Tháng 1</option>
                  <option value="02">Tháng 2</option>
                  <option value="03">Tháng 3</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lọc theo năm:
                </label>
                <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="">Tất cả</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lọc theo tình trạng:
                </label>
                <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="">Tất cả</option>
                  <option value="success">Thành công</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="failed">Thất bại</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Mã sinh viên
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Số tiền vay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Mục đích
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Trả góp/tháng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-end text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-end text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                {currentItems && currentItems.length > 0 ? currentItems.map((loan) => (
                  <tr
                    key={loan._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                      {loan?.student_id || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-green-600 dark:text-green-400">
                      {formatCurrency(loan?.loan_amount_requested || 0)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {loan?.loan_purpose || "Không xác định"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-blue-600 dark:text-blue-400">
                      {formatCurrency(loan?.monthly_installment || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={loan?.status || "unknown"} />
                    </td>
                    <td className="px-6 py-4 text-end text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {loan?.created_at ? formatDate(loan.created_at) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-end text-sm whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetail(loan)}
                        className="inline-flex items-center rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">Chưa có lịch sử giao dịch</p>
                        <p className="text-sm">Bạn chưa có khoản vay nào. Hãy tạo đơn vay đầu tiên của bạn!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {sortedLoans && sortedLoans.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-600 dark:bg-gray-700/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedLoans?.length || 0)} of{" "}
              {sortedLoans?.length || 0} items
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`cursor-pointer rounded-lg px-3 py-1 text-sm ${
                      currentPage === page
                        ? "bg-indigo-500 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanHistoryPage;
