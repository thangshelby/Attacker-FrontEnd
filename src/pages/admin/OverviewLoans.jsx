import React, { useState, useEffect } from "react";
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
  User,
  Brain,
  DollarSign,
  Shield,
  Gavel,
} from "lucide-react";
import { useLoan } from "@/hooks/useLoan";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppStore } from "@/store/appStore";

const OverviewLoans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(null);
  const itemsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [reason, setreason] = useState("");
  const { loans, isLoadingLoans, updateLoanContract } = useLoan();
  const [isLoading, setIsLoading] = useState(false);
  const {loan, setLoan} = useAppStore();
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const navigate = useNavigate();

  // Handle loan approval/rejection
  const handleLoanAction = async (newStatus) => {
    const data = { status: newStatus, reason: reason };
    try {
      setActionLoading(loan._id);
      await updateLoanContract.mutateAsync({
        loan_id: loan._id,
        ...data,
      });
      
      // Close modal and reset form
      setOpenModal(false);
      setreason("");
      toast.success('Cập nhật khoản vay thành công')
      
      // Optionally show success notification
      console.log(`Loan ${newStatus} successfully`);
    } catch (error) {
      console.error("Error updating loan status:", error);
      // Optionally show error notification
    } finally {
      setActionLoading(null);
    }
  };

  // Filter loans based on search and status
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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

  const handleViewDetail = (loan) => {
    navigate(`/admin/loans/${loan._id}`);
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
    pending: loans?.filter((loan) => loan.status === "pending").length || 0,
    accepted: loans?.filter((loan) => loan.status === "accepted").length || 0,
    rejected: loans?.filter((loan) => loan.status === "rejected").length || 0,
  };

  const filteredLoans = loans?.filter((loan) => {
    if (!loan) return false; // Safety check
    const matchesSearch = searchTerm === "" || (
      (loan.student_id && loan.student_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (loan.studentInfo?.name && loan.studentInfo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (loan.citizen_id && loan.citizen_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
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
                {currentItems.map((loan) => {
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
                      {loan.studentInfo?.name || "Nguyen Van A"}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap text-green-600 dark:text-green-400">
                      {loan.loan_amount_requested ? formatCurrency(loan.loan_amount_requested) : "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {loan.loan_tenor || "N/A"} tháng
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold whitespace-nowrap text-purple-600 dark:text-purple-400">
                      {loan.total_payment ? formatCurrency(loan.total_payment) : "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <StatusBadge status={loan.status || "unknown"} />
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {loan.created_at ? formatDate(loan.created_at) : "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {/* View Conversation Button - Temporarily disabled */}
                        {/* <button
                          onClick={() => {
                            setSelectedLoan(loan);
                            setShowConversationModal(true);
                          }}
                          className="inline-flex items-center rounded-lg bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
                          title="Xem cuộc tranh luận của các Agent"
                        >
                          <Eye className="h-3 w-3" />
                        </button> */}

                        {/* Action buttons for pending loans */}
                        {loan.status === "pending" && (
                          <>
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
            const status = openModal === "accepted_modal" ? "accepted" : "rejected";
            handleLoanAction(status);
          }}
          onCancel={() => setOpenModal(false)}
          loading={updateLoanContract.isPending}
        />
      )}

      {/* Temporarily disabled - causing React hooks error
      {showConversationModal && (
        <ConversationModal
          loan={selectedLoan}
          onClose={() => {
            setShowConversationModal(false);
            setSelectedLoan(null);
          }}
        />
      )} */}
    </div>
  );
};

export default OverviewLoans;

const Modal = ({ modal, reason, setreason, onConfirm, onCancel, loading }) => {
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
            {modal === "rejected_modal"
              ? "Lý do từ chối"
              : "Lý do xác nhận" }
          </label>
          <textarea
            value={reason}
            onChange={(e) => setreason(e.target.value)}
            placeholder={`${modal === "rejected_modal" ? "Nhập lý do từ chối..." : "Nhập lý do xác nhận..."}`}
            rows={4}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 outline-none
            px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

const ConversationModal = ({ loan, onClose }) => {
  const { getMASConversation } = useLoan(loan?._id);
  const masConversation = getMASConversation.data;
  
  // Loading state
  if (getMASConversation.isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-slate-800 p-6 text-center">
          <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <p className="mt-4 text-white">Đang tải cuộc tranh luận...</p>
        </div>
      </div>
    );
  }
  
  // No conversation found
  if (!masConversation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-slate-800 p-6 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Chưa có cuộc tranh luận</h3>
          <p className="text-slate-400 mb-4">Khoản vay này chưa được xử lý bởi hệ thống Multi-Agent.</p>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-600"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  // Parse conversation data and map to display format
  const conversationData = JSON.parse(masConversation.result_stringify || "{}");
  
  // Map the conversation data to display format
  const agents = [];
  
  // Academic Agent
  if (conversationData.responses?.academic_repredict) {
    agents.push({
      name: "Academic Agent",
      icon: Brain,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      decision: conversationData.responses.academic_repredict.decision || "unknown",
      reason: conversationData.responses.academic_repredict.reason || "Không có lý do"
    });
  }
  
  // Finance Agent
  if (conversationData.responses?.finance_repredict) {
    agents.push({
      name: "Finance Agent",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      decision: conversationData.responses.finance_repredict.decision || "unknown",
      reason: conversationData.responses.finance_repredict.reason || "Không có lý do"
    });
  }
  
  // Critical Academic Agent
  if (conversationData.responses?.critical_academic) {
    agents.push({
      name: "Critical Agent for Academic",
      icon: Shield,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      decision: conversationData.responses.critical_academic.decision || "unknown",
      reason: conversationData.responses.critical_academic.reason || "Không có lý do"
    });
  }
  
  // Critical Finance Agent
  if (conversationData.responses?.critical_finance) {
    agents.push({
      name: "Critical Agent for Finance",
      icon: Shield,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      decision: conversationData.responses.critical_finance.decision || "unknown",
      reason: conversationData.responses.critical_finance.reason || "Không có lý do"
    });
  }
  
  // Decision Agent
  if (conversationData.responses?.final_decision) {
    agents.push({
      name: "Decision Agent",
      icon: Gavel,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      decision: conversationData.responses.final_decision.decision || "unknown",
      reason: conversationData.responses.final_decision.reason || "Không có lý do"
    });
  }
  
  const mockConversation = {
    agents: agents,
    finalDecision: conversationData.responses?.final_decision?.decision || "unknown",
    summary: conversationData.responses?.final_decision?.reason || "Không có thông tin tổng kết"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-6xl h-[90vh] rounded-2xl border border-slate-700/50 bg-slate-800 shadow-2xl flex flex-col">
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
                Mã sinh viên: {loan?.student_id} | Số tiền: {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(loan?.loan_amount_requested)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Final Decision Summary */}
            <div className={`rounded-lg border-2 p-4 ${
              mockConversation.finalDecision === 'approve' 
                ? 'border-green-500/50 bg-green-900/20' 
                : 'border-red-500/50 bg-red-900/20'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white flex items-center">
                  <Gavel className="h-5 w-5 mr-2" />
                  Quyết định cuối cùng
                </h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mockConversation.finalDecision === 'approve'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {mockConversation.finalDecision === 'approve' ? 'PHÊ DUYỆT' : 'TỪ CHỐI'}
                  </span>
                </div>
              </div>
              <p className="text-slate-300">{mockConversation.summary}</p>
            </div>

            {/* Agent Conversations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockConversation.agents.map((agent, index) => {
                const IconComponent = agent.icon;
                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${agent.borderColor} ${agent.bgColor}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`h-5 w-5 ${agent.color}`} />
                        <h5 className="font-semibold text-white">{agent.name}</h5>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        agent.decision === 'approve' 
                          ? 'bg-green-500/20 text-green-400'
                          : agent.decision === 'reject'
                          ? 'bg-red-500/20 text-red-400'  
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {agent.decision === 'approve' ? 'Đồng ý' : 
                         agent.decision === 'reject' ? 'Từ chối' : 'Trung lập'}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 space-y-2">
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
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-700 px-6 py-2 text-slate-300 transition-colors hover:bg-slate-600"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
