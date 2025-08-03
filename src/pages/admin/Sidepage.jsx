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
  Search,
  Filter,
  Users,
  TrendingUp,
  BarChart3,
  Bot,
  Brain,
  Shield,
  Calculator,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Zap,
} from "lucide-react";

// Mock data for loans
const mockLoans = [
  {
    _id: "64a1234567890abcdef12345",
    student_id: "SV001",
    loan_amount_requested: 50000000,
    loan_purpose: 1,
    monthly_installment: 2500000,
    status: "pending",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    studentInfo: {
      name: "Nguyễn Văn A",
      university: "Đại học Kinh Tế - Luật - ĐHQG TPHCM",
      faculty: "Công nghệ Thông tin",
      major: "FINTECH",
      year: "3",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      address: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
      gpa: 3.8,
    },
    responses: {
      academic_repredict: {
        decision: "approve",
        reason: "Sinh viên có GPA cao (3.8/4.0) và hoạt động ngoại khóa tích cực",
        raw_response: "QUYẾT ĐỊNH: APPROVE - GPA cao, hoạt động tốt"
      },
      finance_repredict: {
        decision: "approve",
        reason: "Thu nhập ổn định 30 triệu/tháng, khả năng trả nợ tốt",
        raw_response: "QUYẾT ĐỊNH: APPROVE - Thu nhập ổn định"
      },
      critical_academic: {
        critical_response: "Cần xem xét thêm về khả năng học tập dài hạn",
        recommended_decision: "approve",
        raw_response: "PHẢN BIỆN: Cần theo dõi thêm nhưng chấp nhận"
      },
      critical_finance: {
        critical_response: "Tỷ lệ vay/thu nhập hợp lý ở mức 83%",
        recommended_decision: "approve",
        raw_response: "PHẢN BIỆN: Tỷ lệ hợp lý"
      },
      final_decision: {
        final_result: {
          decision: "approve",
          reason: "Đạt tiêu chí học thuật và tài chính với điểm GPA cao và thu nhập ổn định",
          rule_based_pass: true,
          agent_support_available: true,
          hybrid_approach: "objective_rules_with_agent_support"
        },
        error: null
      }
    }
  },
  {
    _id: "64a1234567890abcdef12346",
    student_id: "SV002",
    loan_amount_requested: 30000000,
    loan_purpose: 2,
    monthly_installment: 1500000,
    status: "rejected",
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-16T09:15:00Z",
    studentInfo: {
      name: "Trần Thị B",
      university: "Đại học Bách Khoa TP.HCM",
      faculty: "Khoa học Máy tính",
      major: "Data Science",
      year: "2",
      phone: "0907654321",
      email: "tranthib@example.com",
      address: "456 Lý Thường Kiệt, Q.10, TP.HCM",
      gpa: 2.1,
    },
    responses: {
      academic_repredict: {
        decision: "reject",
        reason: "GPA thấp (2.1/4.0), nhiều môn học lại, cần cải thiện kết quả học tập",
        raw_response: "QUYẾT ĐỊNH: REJECT - GPA thấp, cần cải thiện"
      },
      finance_repredict: {
        decision: "reject",
        reason: "Thu nhập không ổn định, chỉ 15 triệu/tháng, không đủ đảm bảo trả nợ",
        raw_response: "QUYẾT ĐỊNH: REJECT - Thu nhập thấp, rủi ro cao"
      },
      critical_academic: {
        critical_response: "Sinh viên cần cải thiện kết quả học tập trước khi vay, có nhiều môn học lại",
        recommended_decision: "reject",
        raw_response: "PHẢN BIỆN: Không nên cho vay do kết quả học tập kém"
      },
      critical_finance: {
        critical_response: "Rủi ro cao do thu nhập không đủ đảm bảo, tỷ lệ thu nhập/vay không an toàn",
        recommended_decision: "reject",
        raw_response: "PHẢN BIỆN: Rủi ro tài chính cao, không khuyến nghị"
      },
      final_decision: {
        final_result: {
          decision: "reject",
          reason: "Không đạt tiêu chuẩn học thuật và tài chính, GPA quá thấp và thu nhập không ổn định",
          rule_based_pass: false,
          agent_support_available: true,
          hybrid_approach: "agent_consensus_reject"
        },
        error: null
      }
    }
  },
  {
    _id: "64a1234567890abcdef12347",
    student_id: "SV003",
    loan_amount_requested: 40000000,
    loan_purpose: 1,
    monthly_installment: 2000000,
    status: "accepted",
    created_at: "2024-01-13T09:15:00Z",
    updated_at: "2024-01-16T11:30:00Z",
    studentInfo: {
      name: "Lê Văn C",
      university: "Đại học Quốc Gia TP.HCM",
      faculty: "Kinh tế",
      major: "Tài chính Ngân hàng",
      year: "4",
      phone: "0908888999",
      email: "levanc@example.com",
      address: "789 Cách Mạng Tháng 8, Q.3, TP.HCM",
      gpa: 3.9,
    },
    responses: {
      academic_repredict: {
        decision: "approve",
        reason: "Thành tích học tập xuất sắc, GPA 3.9/4.0, nhiều giải thưởng học thuật",
        raw_response: "QUYẾT ĐỊNH: APPROVE - Xuất sắc về mặt học thuật"
      },
      finance_repredict: {
        decision: "approve",
        reason: "Thu nhập 35 triệu/tháng, tỷ lệ an toàn, có nguồn thu ổn định từ part-time",
        raw_response: "QUYẾT ĐỊNH: APPROVE - Tài chính rất tốt"
      },
      critical_academic: {
        critical_response: "Sinh viên có tiềm năng rất cao, đáng tin cậy, thành tích ấn tượng",
        recommended_decision: "approve",
        raw_response: "PHẢN BIỆN: Rất đáng tin cậy, ứng viên lý tưởng"
      },
      critical_finance: {
        critical_response: "Khả năng trả nợ rất tốt, tỷ lệ thu nhập/vay ở mức an toàn",
        recommended_decision: "approve",
        raw_response: "PHẢN BIỆN: An toàn tài chính cao"
      },
      final_decision: {
        final_result: {
          decision: "approve",
          reason: "Hoàn toàn đạt yêu cầu, ứng viên lý tưởng với thành tích xuất sắc",
          rule_based_pass: true,
          agent_support_available: true,
          hybrid_approach: "unanimous_approval"
        },
        error: null
      }
    }
  },
  {
    _id: "64a1234567890abcdef12348",
    student_id: "SV004",
    loan_amount_requested: 25000000,
    loan_purpose: 3,
    monthly_installment: 1250000,
    status: "pending",
    created_at: "2024-01-16T16:45:00Z",
    updated_at: "2024-01-16T16:45:00Z",
    studentInfo: {
      name: "Phạm Thị D",
      university: "Đại học Công Nghệ TP.HCM",
      faculty: "Điện tử Viễn thông",
      major: "IoT",
      year: "3",
      phone: "0909111222",
      email: "phamthid@example.com",
      address: "321 Võ Văn Tần, Q.3, TP.HCM",
      gpa: 3.2,
    },
    responses: {
      academic_repredict: {
        decision: "approve",
        reason: "GPA trung bình khá (3.2/4.0), có tham gia dự án nghiên cứu",
        raw_response: "QUYẾT ĐỊNH: APPROVE - Kết quả học tập ổn"
      },
      finance_repredict: {
        decision: "approve",
        reason: "Thu nhập 22 triệu/tháng, tỷ lệ chấp nhận được",
        raw_response: "QUYẾT ĐỊNH: APPROVE - Thu nhập đủ điều kiện"
      },
      critical_academic: {
        critical_response: "Cần theo dõi thêm về khả năng duy trì kết quả học tập",
        recommended_decision: "approve",
        raw_response: "PHẢN BIỆN: Chấp nhận nhưng cần theo dõi"
      },
      critical_finance: {
        critical_response: "Tỷ lệ ở mức giới hạn nhưng vẫn chấp nhận được",
        recommended_decision: "approve",
        raw_response: "PHẢN BIỆN: Chấp nhận với điều kiện"
      },
      final_decision: {
        final_result: {
          decision: "approve",
          reason: "Đạt tiêu chuẩn tối thiểu, cần theo dõi trong quá trình trả nợ",
          rule_based_pass: true,
          agent_support_available: true,
          hybrid_approach: "conditional_approval"
        },
        error: null
      }
    }
  }
];

// Loan purpose mapping
const loanPurposes = {
  1: "Học phí",
  2: "Sinh hoạt phí", 
  3: "Mua sách/thiết bị",
  4: "Khác"
};

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "accepted":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-300",
          icon: CheckCircle,
          label: "Đã duyệt"
        };
      case "pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-800 dark:text-yellow-300",
          icon: Clock,
          label: "Đang chờ"
        };
      case "rejected":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-800 dark:text-red-300",
          icon: XCircle,
          label: "Từ chối"
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-700",
          text: "text-gray-800 dark:text-gray-300",
          icon: AlertCircle,
          label: "Không xác định"
        };
    }
  };

  const { bg, text, icon: Icon, label } = getStatusConfig();

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${bg} ${text}`}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </span>
  );
};

const DecisionBadge = ({ decision }) => {
  const isApprove = decision === 'approve';
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
      isApprove 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    }`}>
      {isApprove ? <ThumbsUp className="mr-1 h-3 w-3" /> : <ThumbsDown className="mr-1 h-3 w-3" />}
      {isApprove ? 'Chấp thuận' : 'Từ chối'}
    </span>
  );
};

const AgentCard = ({ agentType, agentName, response, icon: Icon }) => {
  if (!response) return null;

  const decision = response.decision || response.recommended_decision;
  const reason = response.reason || response.critical_response;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/30">
            <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{agentName}</h3>
        </div>
        {decision && <DecisionBadge decision={decision} />}
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Lý do:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{reason}</p>
        </div>
        
        {response.raw_response && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Phản hồi gốc:</h4>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{response.raw_response}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LoanAdminDashboard = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter loans based on search and status
  const filteredLoans = mockLoans.filter(loan => {
    const matchesSearch = loan.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.studentInfo?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLoans.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats
  const stats = {
    total: mockLoans.length,
    pending: mockLoans.filter(loan => loan.status === 'pending').length,
    accepted: mockLoans.filter(loan => loan.status === 'accepted').length,
    rejected: mockLoans.filter(loan => loan.status === 'rejected').length,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetail = (loan) => {
    setSelectedLoan(loan);
  };

  const handleBackToList = () => {
    setSelectedLoan(null);
  };

  if (selectedLoan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Header with Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBackToList}
              className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                Chi Tiết Khoản Vay
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Thông tin chi tiết và phân tích AI cho khoản vay {selectedLoan.student_id}
              </p>
            </div>
          </div>

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
                      {formatCurrency(selectedLoan.loan_amount_requested)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Calendar className="mr-2 h-4 w-4" />
                      Ngày nộp hồ sơ
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDate(selectedLoan.created_at)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Trạng thái
                    </div>
                    <div className="mt-2">
                      <StatusBadge status={selectedLoan.status} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Mục đích vay
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {loanPurposes[selectedLoan.loan_purpose]}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Trả hàng tháng
                    </div>
                    <div className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(selectedLoan.monthly_installment)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Cập nhật lần cuối
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDate(selectedLoan.updated_at)}
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
                        {selectedLoan.studentInfo?.name}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Mã sinh viên
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedLoan.student_id}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        GPA
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedLoan.studentInfo?.gpa}/4.0
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        <Phone className="mr-2 h-4 w-4" />
                        Số điện thoại
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedLoan.studentInfo?.phone}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Trường đại học
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedLoan.studentInfo?.university}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Khoa
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedLoan.studentInfo?.faculty}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Chuyên ngành
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedLoan.studentInfo?.major}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Năm học
                      </div>
                      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        Năm {selectedLoan.studentInfo?.year}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedLoan.studentInfo?.email}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      <MapPin className="mr-2 h-4 w-4" />
                      Địa chỉ
                    </div>
                    <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedLoan.studentInfo?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Multi-Agent Analysis */}
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <h2 className="flex items-center text-lg font-semibold text-white">
                  <Bot className="mr-2 h-5 w-5" />
                  Phân tích AI Multi-Agent System
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <AgentCard
                    agentType="academic_repredict"
                    agentName="AI Agent - Đánh giá Học thuật"
                    response={selectedLoan.responses?.academic_repredict}
                    icon={Brain}
                  />
                  
                  <AgentCard
                    agentType="finance_repredict"
                    agentName="AI Agent - Đánh giá Tài chính"
                    response={selectedLoan.responses?.finance_repredict}
                    icon={TrendingUp}
                  />
                  
                  <AgentCard
                    agentType="critical_academic"
                    agentName="AI Agent - Phản biện Học thuật"
                    response={selectedLoan.responses?.critical_academic}
                    icon={Shield}
                  />
                  
                  <AgentCard
                    agentType="critical_finance"
                    agentName="AI Agent - Phản biện Tài chính"
                    response={selectedLoan.responses?.critical_finance}
                    icon={Calculator}
                  />
                </div>
              </div>
            </div>

            {/* Final Decision */}
            {selectedLoan.responses?.final_decision && (
              <div className={`overflow-hidden rounded-2xl shadow-xl ${
                selectedLoan.responses.final_decision.final_result?.decision === 'approve'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-gradient-to-r from-red-500 to-rose-600'
              }`}>
                <div className="p-6 text-white">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                      <Zap className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Quyết định cuối cùng</h2>
                    <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-lg font-semibold">
                      {selectedLoan.responses.final_decision.final_result?.decision === 'approve' ? (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          CHẤP THUẬN
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-2 h-5 w-5" />
                          TỪ CHỐI
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg bg-white/10 p-4">
                      <h3 className="font-semibold mb-2">Lý do:</h3>
                      <p className="text-sm opacity-90">
                        {selectedLoan.responses.final_decision.final_result?.reason}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-lg bg-white/10 p-3 text-center">
                        <div className="text-xs opacity-75">Rule-based Pass</div>
                        <div className="font-semibold">
                          {selectedLoan.responses.final_decision.final_result?.rule_based_pass ? 'Có' : 'Không'}
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-white/10 p-3 text-center">
                        <div className="text-xs opacity-75">Agent Support</div>
                        <div className="font-semibold">
                          {selectedLoan.responses.final_decision.final_result?.agent_support_available ? 'Có' : 'Không'}
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-white/10 p-3 text-center">
                        <div className="text-xs opacity-75">Hybrid Approach</div>
                        <div className="font-semibold text-xs">
                          {selectedLoan.responses.final_decision.final_result?.hybrid_approach?.replace(/_/g, ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <History className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Quản lý các khoản vay sinh viên với hệ thống Multi-Agent AI
          </p>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng số</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Đang chờ</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Đã duyệt</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.accepted}</p>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Từ chối</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rejected}</p>
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
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo mã SV hoặc tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Mã sinh viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Tên sinh viên
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
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                {currentItems.map((loan) => (
                  <tr key={loan._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                      {loan.student_id}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {loan.studentInfo?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-green-600 dark:text-green-400">
                      {formatCurrency(loan.loan_amount_requested)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {loanPurposes[loan.loan_purpose] || 'Không xác định'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-blue-600 dark:text-blue-400">
                      {formatCurrency(loan.monthly_installment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {formatDate(loan.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetail(loan)}
                        className="inline-flex items-center rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors"
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
              Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLoans.length)} trong {filteredLoans.length} kết quả
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAdminDashboard;