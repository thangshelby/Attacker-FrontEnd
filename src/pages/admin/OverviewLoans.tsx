import { useState, useEffect } from "react";
import {
  History,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Sparkles,
  Search,
  Filter,
  Users,
  Check,
  X,
  AlertCircle,
  MessageSquare,
  Brain,
  DollarSign,
  Shield,
  Gavel,
  ChartArea,
} from "lucide-react";
import { useLoans, useUpdateLoan } from "@/hooks/useLoan";
import { loan as loanApi } from "@/apis/loan";
import { toast } from "react-toastify";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppStore } from "@/store/appStore";
import { Loan } from "@/types";
import { useAnalyzeLoan} from "@/hooks/useLoan";

interface ModalProps {
  modal: string;
  reason: string;
  setreason: (reason: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

interface ConversationModalProps {
  loan: Loan | null;
  onClose: () => void;
}

const OverviewLoans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const itemsPerPage = 5;
  const [openModal, setOpenModal] = useState<string | false>(false);
  const [reason, setreason] = useState("");
  const { loans, isLoadingLoans } = useLoans();
  const { updateLoan, updateLoanPending } = useUpdateLoan();
  const { loan, setLoan } = useAppStore();
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const { analyzeLoan } = useAnalyzeLoan();


  // Handle loan approval/rejection
  const handleLoanAction = (newStatus: string) => {
    const data = { status: newStatus, reason: reason };
    try {
      if (!loan) return;
      setActionLoading(loan._id);
      updateLoan({
        loan_id: loan._id,
        data,
      });

      // Close modal and reset form
      setOpenModal(false);
      setreason("");
      toast.success("Cập nhật khoản vay thành công");
    } catch (error) {
      console.error("Error updating loan status:", error);
      // Optionally show error notification
    } finally {
      setActionLoading(null);
    }
  };

  const handleAnalyzeLoan = async () => {
    if (!loan) return;
    setActionLoading(loan._id);
    // updateLoan({
    //   loan_id: loan._id,
    //   data: { is_analyze: true },
    // });
    // if (!loan) return;
    await analyzeLoan({
      student_id: loan.student_id,
      loan_id: loan._id
    });
  };

  // Filter loans based on search and status
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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

  // Check if loan is still being processed by AI (created < 1 minute ago)
  const isAIProcessing = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = (now.getTime() - created.getTime()) / (1000 * 60);
    return diffInMinutes < 1;
  };

  // Get remaining time for AI processing
  const getAIProcessingTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor(
      (now.getTime() - created.getTime()) / 1000,
    );
    const remainingSeconds = Math.max(0, 60 - diffInSeconds);
    return remainingSeconds;
  };

  
  if (isLoadingLoans || !loans) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Đang tải dữ liệu</p>
      </div>
    );
  }

  // Calculate stats - will auto-update when loans data changes
  const stats = {
    total: loans?.length || 0,
    pending:
      loans?.filter((loan: Loan) => loan.status === "pending").length || 0,
    accepted:
      loans?.filter((loan: Loan) => loan.status === "accepted").length || 0,
    rejected:
      loans?.filter((loan: Loan) => loan.status === "rejected").length || 0,
  };

  const filteredLoans =
    loans?.filter((loan: Loan) => {
      if (!loan) return false; // Safety check
      const matchesSearch =
        searchTerm === "" ||
        (loan.student_id &&
          loan.student_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (loan.name &&
          loan.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (loan.citizen_id &&
          loan.citizen_id.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = !statusFilter || loan.status === statusFilter;
      return matchesSearch && matchesStatus;
    }) || []; // Fallback to empty array

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto flex flex-col gap-6 px-12 py-8">
        {/* Header */}
        <div className="flex flex-row items-start justify-start gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <History className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col items-start justify-between">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Quản lý các khoản vay sinh viên với hệ thống Multi-Agent AI
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tổng số
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Đang chờ
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.pending}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Đã duyệt
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.accepted}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Từ chối
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.rejected}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <Sparkles className="mr-2 h-5 w-5" />
              Danh sách khoản vay
            </h2>
          </div>

          {/* Filters */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-700/50">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo mã SV, tên, CCCD..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Đang chờ</option>
                  <option value="accepted">Đã duyệt</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Mã sinh viên
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Tên sinh viên
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Số tiền vay
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thời hạn
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Tổng trả
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Ngày tạo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                {currentItems.map((loan: Loan) => {
                  if (!loan || !loan._id) {
                    console.warn("⚠️ Invalid loan object:", loan);
                    return null;
                  }
                  return (
                    <tr
                      key={loan._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                        {loan.student_id || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {loan.name || "Nguyen Van A"}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap text-green-600 dark:text-green-400">
                        {loan.loan_amount_requested
                          ? formatCurrency(loan.loan_amount_requested)
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {loan.loan_tenor || "N/A"} tháng
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap text-purple-600 dark:text-purple-400">
                        {loan.total_payment
                          ? formatCurrency(loan.total_payment)
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <StatusBadge status={loan.status || "unknown"} />
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {loan.created_at ? formatDate(loan.created_at) : "N/A"}
                      </td>
                      {/* ACTION BUTTON */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {/* View Conversation Button */}
                          <button
                            disabled={loan.is_analyze}
                            onClick={() => {
                              setSelectedLoan(loan);
                              setShowConversationModal(true);
                            }}
                            className="inline-flex items-center rounded-lg bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                            title="Xem cuộc tranh luận của các Agent"
                          >
                            <Eye className="h-3 w-3" />
                          </button>

                          {/* Action buttons for pending loans */}
                          {loan.status === "pending" && (
                            <>
                              {isAIProcessing(loan.created_at) ? (
                                <div className="flex items-center gap-2">
                                  <div className="inline-flex items-center rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                    <Brain className="mr-1 h-3 w-3 animate-pulse" />
                                    AI đang xử lý
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {getAIProcessingTime(loan.created_at)}s
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {/* Analyze Button */}
                                  <button
                                    onClick={() => {
                                      setLoan(loan);
                                      handleAnalyzeLoan();
                                    }}
                                    disabled={actionLoading === loan._id}
                                    className="inline-flex items-center rounded-lg bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 transition-colors hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50"
                                    title="Duyệt khoản vay"
                                  >
                                    {actionLoading === loan._id ? (
                                      <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                                    ) : (
                                      <ChartArea className="h-3 w-3" />
                                    )}
                                  </button>

                                  {/* Approve Button */}
                                  <button
                                    onClick={() => {
                                      setOpenModal("accepted_modal");
                                      setLoan(loan);
                                    }}
                                    disabled={actionLoading === loan._id}
                                    className="inline-flex items-center rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700 transition-colors hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                                    title="Duyệt khoản vay"
                                  >
                                    {actionLoading === loan._id ? (
                                      <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                                    ) : (
                                      <Check className="h-3 w-3" />
                                    )}
                                  </button>

                                  {/* Reject Button */}
                                  <button
                                    onClick={() => {
                                      setLoan(loan);
                                      setOpenModal("rejected_modal");
                                    }}
                                    disabled={actionLoading === loan._id}
                                    className="inline-flex items-center rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                                    title="Từ chối khoản vay"
                                  >
                                    {actionLoading === loan._id ? (
                                      <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    )}
                                  </button>
                                </>
                              )}
                            </>
                          )}

                          {/* Status indicator for processed loans */}
                          {loan.status !== "pending" && (
                            <div className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                              <AlertCircle className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {currentItems.length === 0 && (
            <div className="py-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Không có khoản vay nào
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Không tìm thấy khoản vay nào phù hợp với bộ lọc hiện tại.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-600 dark:bg-gray-700/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hiển thị {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredLoans.length)}{" "}
                trong {filteredLoans.length} kết quả
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg px-3 py-1 text-sm transition-colors ${
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
                  className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {openModal && (
        <Modal
          modal={openModal}
          reason={reason}
          setreason={setreason}
          onConfirm={() => {
            const status =
              openModal === "accepted_modal" ? "accepted" : "rejected";
            handleLoanAction(status);
          }}
          onCancel={() => setOpenModal(false)}
          loading={updateLoanPending}
        />
      )}

      {/* Conversation Modal */}
      {showConversationModal && (
        <ConversationModal
          loan={selectedLoan}
          onClose={() => {
            setShowConversationModal(false);
            setSelectedLoan(null);
          }}
        />
      )}
    </div>
  );
};

export default OverviewLoans;

const Modal = ({
  modal,
  reason,
  setreason,
  onConfirm,
  onCancel,
  loading,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[1000px] rounded-2xl border border-slate-700/50 bg-slate-800 p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 ${modal === "rejected_modal" ? "border-red-600/50 bg-red-600/20" : "bg-greenen-600/50 border-green-600/50 bg-green-600/20"} `}
          >
            {modal === "rejected_modal" ? (
              <XCircle className="h-8 w-8 text-red-400" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-400" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {modal === "rejected_modal"
              ? "Từ chối khoản vay này?"
              : "Xác nhận đồng ý khoản vay này?"}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {modal === "rejected_modal"
              ? "  Vui lòng nhập lý do từ chối để gửi thông báo cho sinh viên."
              : "Vui lòng xác nhận lý do xác nhận khoản vay này trước khi gửi thông báo."}
          </p>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            {modal === "rejected_modal" ? "Lý do từ chối" : "Lý do xác nhận"}
          </label>
          <textarea
            value={reason}
            onChange={(e) => setreason(e.target.value)}
            placeholder={`${modal === "rejected_modal" ? "Nhập lý do từ chối..." : "Nhập lý do xác nhận..."}`}
            rows={4}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-400">{reason.length}/500 ký tự</span>
            {reason.length < 10 && (
              <span className="text-red-400">Tối thiểu 10 ký tự</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || reason.length < 10}
            className={`${modal === "rejected_modal" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} flex items-center rounded-lg px-4 py-2 text-white transition-all hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Đang xử lý...
              </>
            ) : modal === "rejected_modal" ? (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Xác nhận từ chối
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Xác nhận
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConversationModal = ({ loan, onClose }: ConversationModalProps) => {
  const [isLoadingConversation, setIsLoadingConversation] = useState(true);
  const [conversationData, setConversationData] = useState<any>(null);

  // Fetch MAS conversation data
  const fetchConversation = async (loanId: string) => {
    setIsLoadingConversation(true);
    try {
      console.log("Fetching conversation for loan ID:", loanId);
      const response = await loanApi.getMassConversation(loanId);
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      
      // Try different possible data structures
      let conversationData = null;
      
      const rawData = response.data.data;
      console.log("Raw data object:", rawData);
      
      // Check if result_stringify is in the conversation object
      const conversationObj = rawData.conversation;
      console.log("Conversation object:", conversationObj);
      console.log("result_stringify exists:", conversationObj?.result_stringify);
      
      if (conversationObj && conversationObj.result_stringify && typeof conversationObj.result_stringify === 'string') {
        // Parse the result_stringify which contains the actual conversation data
        try {
          conversationData = JSON.parse(conversationObj.result_stringify);
          console.log("SUCCESS! Parsed result_stringify:", conversationData);
          console.log("Responses object:", conversationData.responses);
          console.log("Academic repredict:", conversationData.responses?.academic_repredict);
          console.log("Finance repredict:", conversationData.responses?.finance_repredict);
          console.log("Critical academic:", conversationData.responses?.critical_academic);
          console.log("Critical finance:", conversationData.responses?.critical_finance);
          console.log("Final result:", conversationData.final_result);
        } catch (parseError) {
          console.error("Error parsing result_stringify:", parseError);
          conversationData = conversationObj;
        }
      } else {
        console.log("result_stringify not found or not a string");
        conversationData = rawData;
      }
      
      console.log("Final conversation data:", conversationData);
      setConversationData(conversationData);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setConversationData(null);
    } finally {
      setIsLoadingConversation(false);
    }
  };

  useEffect(() => {
    if (loan?._id) {
      fetchConversation(loan._id);
    }
  }, [loan?._id]);

  // Show loading state while fetching conversation
  if (isLoadingConversation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex h-[90vh] w-full max-w-6xl flex-col rounded-2xl border border-slate-700/50 bg-slate-800 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Cuộc tranh luận của Multi-Agent System
                </h3>
                <p className="text-sm text-slate-400">
                  Mã sinh viên: {loan?.student_id} | Số tiền:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(loan?.loan_amount_requested || 0)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-2 border-indigo-500"></div>
              <p className="mt-4 text-white">Đang tải cuộc tranh luận...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no conversation data
  if (!conversationData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex h-[90vh] w-full max-w-6xl flex-col rounded-2xl border border-slate-700/50 bg-slate-800 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Cuộc tranh luận của Multi-Agent System
                </h3>
                <p className="text-sm text-slate-400">
                  Mã sinh viên: {loan?.student_id} | Số tiền:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(loan?.loan_amount_requested || 0)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
              <p className="mt-4 text-white">Không tìm thấy dữ liệu cuộc tranh luận</p>
              <p className="mt-2 text-slate-400">Có thể khoản vay chưa được xử lý bởi MAS</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from real conversation structure
  const finalResult = conversationData.final_result || {};
  const responses = conversationData.responses || {};
  const ruleBased = conversationData.rule_based || {};

  // Map agent responses to display format - using processed LLM responses, not raw
  const agents = [
    {
      name: "Academic Agent",
      icon: Brain,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-700",
      decision: responses.academic_repredict?.decision || "unknown",
      reason: responses.academic_repredict?.raw_response || responses.academic_repredict?.reason || "Không có dữ liệu",
    },
    {
      name: "Finance Agent", 
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-700",
      decision: responses.finance_repredict?.decision || "unknown",
      reason: responses.finance_repredict?.raw_response || responses.finance_repredict?.reason || "Không có dữ liệu",
    },
    {
      name: "Critical Agent (Academic)",
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-700",
      decision: responses.critical_academic?.recommended_decision || "unknown",
      reason: responses.critical_academic?.raw_response || responses.critical_academic?.critical_response || "Không có dữ liệu",
    },
    {
      name: "Critical Agent (Finance)",
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-700",
      decision: responses.critical_finance?.recommended_decision || "unknown",
      reason: responses.critical_academic?.raw_response || responses.critical_academic?.critical_response || "Không có dữ liệu",
    },
    {
      name: "Decision Agent",
      icon: Gavel,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-700",
      decision: finalResult.decision || "unknown",
      reason: finalResult.raw_response || finalResult.reason || "Không có dữ liệu",
    },
  ];

  const summary = `Quyết định: ${finalResult.decision || "unknown"}. ${finalResult.reason || ""} ${ruleBased.rule_based_reason ? `Rule-based: ${ruleBased.rule_based_reason}` : ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex h-[90vh] w-full max-w-6xl flex-col rounded-2xl border border-slate-700/50 bg-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Cuộc tranh luận của Multi-Agent System
              </h3>
              <p className="text-sm text-slate-400">
                Mã sinh viên: {loan?.student_id} | Số tiền:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(loan?.loan_amount_requested || 0)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Summary Section */}
            <div className={`rounded-lg border p-4 ${
              finalResult.decision === "approve" 
                ? "border-green-700 bg-green-900/20" 
                : finalResult.decision === "reject"
                ? "border-red-700 bg-red-900/20"
                : "border-yellow-700 bg-yellow-900/20"
            }`}>
              <h4 className={`mb-2 flex items-center text-lg font-semibold ${
                finalResult.decision === "approve" 
                  ? "text-green-400" 
                  : finalResult.decision === "reject"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}>
                {finalResult.decision === "approve" ? (
                  <CheckCircle className="mr-2 h-5 w-5" />
                ) : finalResult.decision === "reject" ? (
                  <XCircle className="mr-2 h-5 w-5" />
                ) : (
                  <AlertCircle className="mr-2 h-5 w-5" />
                )}
                Kết quả cuối cùng
              </h4>
              <p className={`text-sm ${
                finalResult.decision === "approve" 
                  ? "text-green-300" 
                  : finalResult.decision === "reject"
                  ? "text-red-300"
                  : "text-yellow-300"
              }`}>
                {summary}
              </p>
            </div>

            {/* Agent Conversations */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {agents.map((agent, index) => {
                const IconComponent = agent.icon;
                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${agent.borderColor} ${agent.bgColor}`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`h-5 w-5 ${agent.color}`} />
                        <h5 className="font-semibold text-white">
                          {agent.name}
                        </h5>
                      </div>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          agent.decision === "approve"
                            ? "bg-green-500/20 text-green-400"
                            : agent.decision === "reject"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {agent.decision === "approve"
                          ? "Đồng ý"
                          : agent.decision === "reject"
                            ? "Từ chối"
                            : "Trung lập"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p className="leading-relaxed">{agent.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-slate-700 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
