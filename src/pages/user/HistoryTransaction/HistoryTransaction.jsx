import React, { useState } from "react";
import {
  History,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
// Mock data for loan history
const mockLoanHistory = [
  {
    id: 1,
    stt: "1",
    ngayLapHoSo: "2025-08-04",
    thoiGianLapHoSo: "14:30",
    soTienVay: "20,000,000",
    ngayDuyet: "2025-08-05 - 2025-08-06",
    tinhTrang: "Đang xử lý",
    status: "processing",
  },
  {
    id: 2,
    stt: "2",
    ngayLapHoSo: "2024-02-10",
    thoiGianLapHoSo: "09:15",
    soTienVay: "3,500,000",
    ngayDuyet: "2024-02-15",
    tinhTrang: "Đang xử lý",
    status: "processing",
  },
  {
    id: 3,
    stt: "3",
    ngayLapHoSo: "2024-03-05",
    thoiGianLapHoSo: "16:45",
    soTienVay: "7,200,000",
    ngayDuyet: "2024-03-12",
    tinhTrang: "Đang xử lý",
    status: "processing",
  },
  {
    id: 4,
    stt: "4",
    ngayLapHoSo: "2024-04-20",
    thoiGianLapHoSo: "11:20",
    soTienVay: "4,800,000",
    ngayDuyet: "2024-04-22",
    tinhTrang: "Thất bại",
    status: "failed",
  },
  {
    id: 5,
    stt: "5",
    ngayLapHoSo: "2024-05-18",
    thoiGianLapHoSo: "13:10",
    soTienVay: "6,000,000",
    ngayDuyet: "2024-05-25",
    tinhTrang: "Thành công",
    status: "success",
  },
  {
    id: 6,
    stt: "6",
    ngayLapHoSo: "2024-06-12",
    thoiGianLapHoSo: "10:30",
    soTienVay: "8,500,000",
    ngayDuyet: "2024-06-18",
    tinhTrang: "Thành công",
    status: "success",
  },
  {
    id: 7,
    stt: "7",
    ngayLapHoSo: "2024-07-25",
    thoiGianLapHoSo: "15:45",
    soTienVay: "2,800,000",
    ngayDuyet: "2024-07-30",
    tinhTrang: "Thất bại",
    status: "failed",
  },
  {
    id: 8,
    stt: "8",
    ngayLapHoSo: "2024-08-01",
    thoiGianLapHoSo: "08:20",
    soTienVay: "9,200,000",
    ngayDuyet: "Chưa duyệt",
    tinhTrang: "Thành công",
    status: "success",
  },
];

// Mock detailed loan data

const StatusBadge = ({ status, text }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-300",
          icon: CheckCircle,
        };
      case "processing":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-800 dark:text-blue-300",
          icon: Clock,
        };
      case "failed":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-800 dark:text-red-300",
          icon: XCircle,
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-700",
          text: "text-gray-800 dark:text-gray-300",
          icon: AlertCircle,
        };
    }
  };

  const { bg, textColor, icon: Icon } = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${bg} ${textColor}`}
    >
      <Icon className="mr-1 h-3 w-3" />
      {text}
    </span>
  );
};

const LoanHistoryPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const { student } = useStudent();
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

  // Pagination logic
  const totalPages = Math.ceil(mockLoanHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mockLoanHistory.slice(startIndex, endIndex);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <History className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
            My History Transaction
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Lịch sử giao dịch vay vốn của bạn
          </p>
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
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Ngày lập hồ sơ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thời gian lập hồ sơ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Số tiền vay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Ngày duyệt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Tình trạng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                {currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                      {item.stt}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.ngayLapHoSo}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.thoiGianLapHoSo}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-green-600 dark:text-green-400">
                      {item.soTienVay} VND
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.ngayDuyet}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status} text={item.tinhTrang} />
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetail(item)}
                        className="inline-flex cursor-pointer items-center rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-600 dark:bg-gray-700/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1}-
              {Math.min(endIndex, mockLoanHistory.length)} of{" "}
              {mockLoanHistory.length} items
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
        </div>
      </div>
    </div>
  );
};

export default LoanHistoryPage;
