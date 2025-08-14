import { useState } from "react";
import { History, FileText, Eye, Sparkles } from "lucide-react";
// import { useStudentLoans } from "@/hooks/useLoan";  
import { useStudent } from "@/hooks/useStudent";
import StatusBadge from "@/components/shared/StatusBadge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loan } from "@/types";
import { loan } from "@/apis/loan";


export function useStudentLoans(student_id: string) {
  const {
    data: loans,
    isLoading: isLoadingLoans,
    error: loansError,
    refetch,
  } = useQuery({
    queryKey: ["loans", student_id],
    queryFn: async () => {
      const response = await loan.getLoanByStudentId(student_id);
      return response.data.data.loans;
    },
    enabled: !!student_id,
    refetchOnWindowFocus: true, // Refetch when window gets focus
    staleTime: 0, // Consider data stale immediately for fresh loans
  });
  return {
    loans,
    isLoadingLoans,
    loansError,
    refetch,
  };
}


const LoanHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const { student } = useStudent(user?.citizen_id || "k224141694");
  const { loans, isLoadingLoans, loansError } = useStudentLoans(
    student?.student_id || "k224141694",
  );
  const navigate = useNavigate();

  const handleViewDetail = (loan: Loan) => {
    navigate("/loans/" + loan._id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Pagination logic

  if (isLoadingLoans || !loans) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Đang tải dữ liệu lịch sử giao dịch...
          </p>
        </div>
      </div>
    );
  }

  if (loansError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">
            Có lỗi xảy ra khi tải dữ liệu
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Vui lòng thử lại sau
          </p>
        </div>
      </div>
    );
  }
  const totalPages = Math.ceil((loans?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = loans?.slice(startIndex, endIndex);

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
                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((loan: Loan) => (
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
                          className="inline-flex cursor-pointer items-center rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td  className="px-6 py-12 text-center columns-7">
                      <div className="text-gray-500 dark:text-gray-400">
                        <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
                        <p className="mb-2 text-lg font-medium">
                          Chưa có lịch sử giao dịch
                        </p>
                        <p className="text-sm">
                          Bạn chưa có khoản vay nào. Hãy tạo đơn vay đầu tiên
                          của bạn!
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          {loans && loans.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-600 dark:bg-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {startIndex + 1}-
                {Math.min(endIndex, loans?.length || 0)} of {loans?.length || 0}{" "}
                items
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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

export default LoanHistory;
