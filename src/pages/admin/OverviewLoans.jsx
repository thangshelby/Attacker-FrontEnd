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
  const { loan, setLoan } = useAppStore();
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
      toast.success("Cập nhật khoản vay thành công");

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

  const filteredLoans =
    loans?.filter((loan) => {
      if (!loan) return false; // Safety check
      const matchesSearch =
        searchTerm === "" ||
        (loan.student_id &&
          loan.student_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (loan.studentInfo?.name &&
          loan.studentInfo.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
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
                          {/* View Conversation Button - Temporarily disabled */}
                          <button
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
            const status =
              openModal === "accepted_modal" ? "accepted" : "rejected";
            handleLoanAction(status);
          }}
          onCancel={() => setOpenModal(false)}
          loading={updateLoanContract.isPending}
        />
      )}

      {/* Temporarily disabled - causing React hooks error */}
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

const masConversationDefault = {
  _id: "6897a08744bb68cba46b29db",
  loan_id: "6897a05b7d9e8a59a1a1b035",
  request_id: "6897a05b7d9e8a59a1a1b035",
  request_data: {},
  result_stringify:
    '{\n  "responses": {\n    "academic_repredict": {\n      "decision": "reject",\n      "reason": "Phản biện chỉ ra rằng việc dựa vào tỷ lệ thu nhập gần như 100% để từ chối khoản vay là một giả định quá cứng nhắc và thiếu tính linh hoạt. Tuy nhiên, trong phân tích ban đầu, tôi đã xem xét các yếu tố khác như khả năng tài chính gia đình, sự ổn định của nguồn thu nhập, và khả năng sinh lời của khoản",\n      "raw_response": "QUYẾT ĐỊNH: REJECT\\n\\nLÝ DO:  \\nPhản biện chỉ ra rằng việc dựa vào tỷ lệ thu nhập gần như 100% để từ chối khoản vay là một giả định quá cứng nhắc và thiếu tính linh hoạt. Tuy nhiên, trong phân tích ban đầu, tôi đã xem xét các yếu tố khác như khả năng tài chính gia đình, sự ổn định của nguồn thu nhập, và khả năng sinh lời của khoản vay sau khi tốt nghiệp. Mặc dù sinh viên có thu nhập ổn định từ việc làm thêm và gia đình hỗ trợ, việc khoản vay gần như chiếm trọn thu nhập hàng tháng vẫn đặt ra rủi ro lớn về khả năng trả nợ, đặc biệt trong bối cảnh không có dữ liệu rõ ràng về các khoản chi tiêu cố định hoặc các khoản nợ khác.  \\n\\nHơn nữa, giả định rằng các nguồn thu nhập phụ hoặc hỗ trợ từ gia đình có thể bù đắp cho phần lớn gánh nặng tài chính là quá lạc quan mà không có bằng chứng cụ thể. Trong thực tế, tỷ lệ này phản ánh một áp lực tài chính đáng kể, có thể dẫn đến khả năng vỡ nợ nếu có biến động về thu nhập hoặc chi phí sinh hoạt.  \\n\\nVì vậy, quyết định từ chối dựa trên tiêu chí này vẫn phù hợp để đảm bảo rủi ro tài chính được kiểm soát chặt chẽ hơn, mặc dù phản biện đúng khi nhấn mạnh tính linh hoạt cần thiết trong đánh giá. Trong trường hợp này, các yếu tố về khả năng tài chính dài hạn và khả năng trả nợ sau tốt nghiệp vẫn chưa đủ để đảm bảo an toàn cho khoản vay."\n    },\n    "finance_repredict": {\n      "decision": "reject",\n      "reason": "Phản biện của agent phản biện dựa trên tỷ lệ thu nhập so với khoản vay gần như 100% là một giả định quá cứng nhắc và thiếu tính linh hoạt. Trong thực tế, việc sinh viên vay gần như toàn bộ thu nhập hàng tháng không nhất thiết dẫn đến khả năng trả nợ thấp, đặc biệt nếu có các nguồn thu nhập phụ hoặc ",\n      "raw_response": "QUYẾT ĐỊNH: REJECT\\n\\nLÝ DO:  \\nPhản biện của agent phản biện dựa trên tỷ lệ thu nhập so với khoản vay gần như 100% là một giả định quá cứng nhắc và thiếu tính linh hoạt. Trong thực tế, việc sinh viên vay gần như toàn bộ thu nhập hàng tháng không nhất thiết dẫn đến khả năng trả nợ thấp, đặc biệt nếu có các nguồn thu nhập phụ hoặc hỗ trợ từ gia đình. Tuy nhiên, trong trường hợp này, các yếu tố sau cần xem xét kỹ hơn:\\n\\n1. Tính chính xác của tỷ lệ thu nhập so với khoản vay:  \\n- Thu nhập của sinh viên là 2,342,311 VND/tháng, trong khi khoản vay là 2,342,432 VND, gần như bằng đúng. Tỷ lệ này là 100%, gây áp lực lớn về khả năng trả nợ, đặc biệt trong bối cảnh sinh viên còn đang học và chưa có thu nhập ổn định lâu dài.  \\n- Không rõ các khoản chi tiêu cố định, sinh hoạt phí, hoặc các khoản nợ khác của sinh viên, nên giả định khả năng tiết kiệm hoặc hỗ trợ từ gia đình là chưa đủ để đảm bảo khả năng trả nợ trong dài hạn.\\n\\n2. Rủi ro về khả năng trả nợ:  \\n- Dù có nguồn thu nhập từ việc làm thêm, mức thu nhập này có thể không đủ để trang trải các chi phí sinh hoạt, học phí, và trả nợ cùng lúc.  \\n- Không có dữ liệu về khả năng sinh lời của khoản vay sau khi tốt nghiệp, cũng như khả năng sinh viên duy trì thành tích học tập để đảm bảo việc làm ổn định và mức lương phù hợp.\\n\\n3. Các yếu tố bảo đảm và rủi ro vĩ mô:  \\n- Mẹ là người bảo lãnh nhưng không có tài sản đảm bảo rõ r"\n    },\n    "critical_academic": {\n      "critical_response": "PHẢN BIỆN:  \\nLập luận dựa trên thành tích học tập của sinh viên (GPA chuẩn hóa 0.85/1.0) và hoạt độn",\n      "recommended_decision": "reject",\n      "raw_response": "PHẢN BIỆN:  \\nLập luận dựa trên thành tích học tập của sinh viên (GPA chuẩn hóa 0.85/1.0) và hoạt động ngoại khóa liên quan ngành Công Nghệ Tài Chính là yếu tố tích cực, tuy nhiên, thiếu dữ liệu về khả năng tài chính dài hạn của sinh viên và khả năng trả nợ sau khi tốt nghiệp. Mặc dù mẹ là người bảo lãnh và thu nhập gia đình ổn định, nhưng mức thu nhập 2,34 triệu VND/tháng khá thấp so với các khoản chi phí học tập, sinh hoạt và khoản vay tiềm năng. Ngoài ra, không có dữ liệu về khả năng sinh viên duy trì thành tích học tập trong các năm tiếp theo hoặc khả năng thích nghi với thị trường lao động sau tốt nghiệp. Các giả định về cơ hội việc làm trong lĩnh vực công nghệ tài chính tại khu vực Bắc dựa trên tiềm năng chung, nhưng không phản ánh rõ ràng khả năng sinh viên có thể đảm bảo thu nhập đủ để trả nợ trong dài hạn. Do đó, quyết định dựa trên các yếu tố tích cực hiện tại có thể chưa đủ để đánh giá rủi ro tài chính toàn diện.\\n\\nKHUYẾN NGHỊ: REJECT"\n    },\n    "critical_finance": {\n      "critical_response": "PHẢN BIỆN: Lập luận cho quyết định từ chối dựa trên tỷ lệ thu nhập so với khoản vay gần như 100% là ",\n      "recommended_decision": "reject",\n      "raw_response": "PHẢN BIỆN: Lập luận cho quyết định từ chối dựa trên tỷ lệ thu nhập so với khoản vay gần như 100% là một giả định quá cứng nhắc và thiếu tính linh hoạt. Trong thực tế, việc sinh viên vay gần như toàn bộ thu nhập hàng tháng không nhất thiết dẫn đến khả năng trả nợ thấp, đặc biệt nếu có các nguồn thu nhập phụ hoặc hỗ trợ từ gia đình. Ngoài ra, không có dữ liệu về các khoản chi tiêu cố định, nợ hiện tại hoặc khả năng sinh lời của khoản vay sau khi tốt nghiệp, khiến cho việc đánh giá khả năng trả nợ chưa đầy đủ. Tính toán tỷ lệ 1.00 dựa trên số liệu thuần túy mà không xem xét các yếu tố khác như khả năng tiết kiệm, hỗ trợ tài chính từ gia đình hoặc các khoản thu nhập khác là thiếu chính xác và có thể dẫn đến quyết định quá thận trọng hoặc không công bằng.\\n\\nKHUYẾN NGHỊ: REJECT"\n    },\n    "final_decision": {\n      "decision": "approve",\n      "reason": "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic agent(s) đồng ý."\n    }\n  },\n  "rule_based": {\n    "total_passed_count": 6,\n    "special_violations_count": 0,\n    "rule_based_decision": "approve",\n    "rule_based_reason": "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7).",\n    "features_analysis": {\n      "feature_1_thu_nhap": true,\n      "feature_2_hoc_luc": true,\n      "feature_3_truong_hoc": false,\n      "feature_4_nganh_uu_tien": true,\n      "feature_5_bao_lanh": true,\n      "feature_6_khoan_vay": true,\n      "feature_7_no_existing_debt": true\n    }\n  },\n  "agent_status": {\n    "academic_approve": true,\n    "finance_approve": false,\n    "at_least_one_agent_approve": true,\n    "both_conditions_met": true\n  },\n  "final_result": {\n    "decision": "approve",\n    "reason": "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic agent(s) đồng ý.",\n    "rule_based_pass": true,\n    "agent_support_available": true,\n    "hybrid_approach": "subjective_debate_to_objective_rules"\n  },\n  "request_metadata": {\n    "loan_contract_id": "6897a05b7d9e8a59a1a1b035",\n    "loan_amount": 2342432,\n    "loan_purpose": "học",\n    "gpa_normalized": 0.85,\n    "university_tier": 1,\n    "public_university": false,\n    "guarantor": "mẹ",\n    "family_income": 2342311,\n    "has_existing_debt": false,\n    "age": 20,\n    "gender": "male",\n    "major_category": "Công Nghệ Tài Chính",\n    "processing_time_seconds": 44.03,\n    "timestamp": 1754767495.6163301\n  },\n  "processing_time_seconds": 44.03,\n  "request_id": "6897a05b7d9e8a59a1a1b035"\n}',
  decision: "approve",
  processing_time: 44.03,
  timestamp: "2025-08-09T19:24:55.616Z",
  created_at: "2025-08-09T19:24:55.616Z",
  updated_at: "2025-08-09T19:24:55.616Z",
};

const ConversationModal = ({ loan, onClose }) => {
  const [conversationData, setConversationData] = useState(
    masConversationDefault,
  );
  const { getMASConversation } = useLoan(loan?._id);
  const masConversation = getMASConversation.data;
  console.log("MAS Conversation Data:", masConversation);
  useEffect(() => {
    if (masConversation) {
      try {
        const parsedData = JSON.parse(masConversation.result_stringify || "{}");
        setConversationData(parsedData);
      } catch (error) {
        console.error("Error parsing MAS conversation data:", error);
        setConversationData(masConversationDefault);
      }
    } else {
      setConversationData(masConversationDefault);
    }
  }, [masConversation]);
  // Loading state
  if (getMASConversation.isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-[1000px] rounded-2xl bg-slate-800 p-6 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <p className="mt-4 text-white">Đang tải cuộc tranh luận...</p>
        </div>
      </div>
    );
  }

  // No conversation found
  // if (!masConversation) {

  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  //       <div className="w-full max-w-[1000px] rounded-2xl bg-slate-800 p-6 text-center">
  //         <AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
  //         <h3 className="mb-2 text-lg font-semibold text-white">
  //           Chưa có cuộc tranh luận
  //         </h3>
  //         <p className="mb-4 text-slate-400">
  //           Khoản vay này chưa được xử lý bởi hệ thống Multi-Agent.
  //         </p>
  //         <button
  //           onClick={onClose}
  //           className="rounded-lg bg-slate-700 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-600"
  //         >
  //           Đóng
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // Parse conversation data and map to display format
  // const conversationData = JSON.parse(masConversation.result_stringify || "{}");

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
      decision:
        conversationData.responses.academic_repredict.decision || "unknown",
      reason:
        conversationData.responses.academic_repredict.reason ||
        "Không có lý do",
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
      decision:
        conversationData.responses.finance_repredict.decision || "unknown",
      reason:
        conversationData.responses.finance_repredict.reason || "Không có lý do",
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
      decision:
        conversationData.responses.critical_academic.decision || "unknown",
      reason:
        conversationData.responses.critical_academic.reason || "Không có lý do",
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
      decision:
        conversationData.responses.critical_finance.decision || "unknown",
      reason:
        conversationData.responses.critical_finance.reason || "Không có lý do",
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
      reason:
        conversationData.responses.final_decision.reason || "Không có lý do",
    });
  }

  const mockConversation = {
    agents: agents,
    finalDecision:
      conversationData.responses?.final_decision?.decision || "unknown",
    summary:
      conversationData.responses?.final_decision?.reason ||
      "Không có thông tin tổng kết",
  };

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
                }).format(loan?.loan_amount_requested)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Final Decision Summary */}
            <div
              className={`rounded-lg border-2 p-4 ${
                mockConversation.finalDecision === "approve"
                  ? "border-green-500/50 bg-green-900/20"
                  : "border-red-500/50 bg-red-900/20"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="flex items-center text-lg font-semibold text-white">
                  <Gavel className="mr-2 h-5 w-5" />
                  Quyết định cuối cùng
                </h4>
                <div className="flex items-center space-x-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      mockConversation.finalDecision === "approve"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {mockConversation.finalDecision === "approve"
                      ? "PHÊ DUYỆT"
                      : "TỪ CHỐI"}
                  </span>
                </div>
              </div>
              <p className="text-slate-300">{mockConversation.summary}</p>
            </div>

            {/* Agent Conversations */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {mockConversation.agents.map((agent, index) => {
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
