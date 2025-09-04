import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap,
  Bot,
  Shield,
  Calculator,
  MessageSquare,
  Eye,
  Activity,
  Target,
  Sparkles,
  Timer,
  Download,
  Share,
  Bell,
  Maximize2,
  Copy,
} from "lucide-react";
import AgentOpinions from "@/components/admin/loandetail/AgentOpinions";
import AgentDebate from "@/components/admin/loandetail/AgentDebate";
import DecisionBadge from "@/components/admin/loandetail/DecisionBade";
import { useNavigate, useLocation } from "react-router-dom";
// Sample data
const sampleLoanData = {
  _id: "689493432f3ceb2fda6fba9c",
  created_at: "2025-08-07T11:51:31.199Z",
  decision: "approve",
  loan_id: "6894930bdcb9c4dc32a9fc62",
  processing_time: 55.17,
  loan_amount_requested: 20000000,
  loan_purpose: "3",
  monthly_installment: 2000000,
  student_id: "SV001234",
  status: "accepted",
  updated_at: "2025-08-07T11:51:31.199Z",
  studentInfo: {
    name: "Nguyễn Văn A",
    gpa: 3.4,
    phone: "0123456789",
    university: "Đại học Bách Khoa Hà Nội",
    faculty: "Khoa Công Nghệ Thông Tin",
    major: "Công Nghệ Tài Chính",
    year: 3,
    email: "nguyenvana@student.hust.edu.vn",
    address: "123 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
  },
  responses: {
    academic_repredict: {
      decision: "reject",
      reason:
        "Phản biện của agent phản biện tập trung vào các yếu tố rủi ro tiềm ẩn",
      raw_response:
        "QUYẾT ĐỊNH: REJECT\n\nLÝ DO: Phản biện của agent phản biện tập trung vào các yếu tố rủi ro tiềm ẩn",
    },
    finance_repredict: {
      decision: "reject",
      reason: "Sau phản biện vẫn giữ thái độ thận trọng về rủi ro tài chính",
      raw_response:
        "Dựa trên framework tái đánh giá rủi ro, tôi sẽ phân tích lại phản biện",
    },
    critical_academic: {
      critical_response:
        "Lập luận của quyết định dựa chủ yếu vào thành tích học tập, hoạt động ngoại khóa và bối cảnh tài chính của sinh viên, nhưng chưa đủ xem xét các yếu tố rủi ro dài hạn",
      recommended_decision: "reject",
      raw_response:
        "PHẢN BIỆN: Lập luận của quyết định dựa chủ yếu vào thành tích học tập, hoạt động ngoại khóa",
    },
    critical_finance: {
      critical_response:
        "Lập luận dựa trên tỷ lệ thu nhập/thanh toán vay (47%) và khả năng chi trả của sinh viên là hợp lý, tuy nhiên, không xem xét đến các yếu tố rủi ro tiềm ẩn",
      recommended_decision: "reject",
      raw_response:
        "PHẢN BIỆN: Lập luận dựa trên tỷ lệ thu nhập/thanh toán vay (47%)",
    },
    final_decision: {
      decision: "approve",
      reason:
        "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic, Finance agent(s) đồng ý.",
      final_result: {
        decision: "approve",
        reason:
          "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic, Finance agent(s) đồng ý.",
        rule_based_pass: true,
        agent_support_available: true,
        hybrid_approach: "subjective_debate_to_objective_rules",
      },
    },
  },
  rule_based: {
    total_passed_count: 6,
    special_violations_count: 0,
    rule_based_decision: "approve",
    features_analysis: {
      feature_1_thu_nhap: false,
      feature_2_hoc_luc: true,
      feature_3_truong_hoc: true,
      feature_4_nganh_uu_tien: true,
      feature_5_bao_lanh: true,
      feature_6_khoan_vay: true,
      feature_7_no_existing_debt: true,
    },
  },
  agent_status: {
    academic_approve: true,
    finance_approve: true,
    at_least_one_agent_approve: true,
    both_conditions_met: true,
  },
};
import { useLoans, useMASConversation } from "@/hooks/useLoan";
import { useUserByCitizenId } from "@/hooks/useUser";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { useLoan } from "@/hooks/useLoan";
import OverviewSection from "@/components/admin/loandetail/Overview";
import { Loan } from "@/types/loan";

const AdminLoanDetail = () => {
  const [selectedLoan] = useState(sampleLoanData);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const location = useLocation();
  const selectedLoanId = location.pathname.split("/").pop();
  const { selectedLoan: loan } = useLoan(selectedLoanId ?? "07520400104");
  // const { user: selectedUser } = useUserByCitizenId(loan?.citizen_id||"07520400104");
  // const { student } = useStudent(loan?.citizen_id||"07520400104");
  // const { academicData } = useAcademic(loan.citizen_id || "07520400104");
  const navigate = useNavigate();
  const { masConversation } = useMASConversation(loan?.loan_id);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleCopyLoanId = () => {
    navigator.clipboard.writeText(selectedLoan.loan_id);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleExport = () => {
    // const data = JSON.stringify(selectedLoan, null, 2);
    // const blob = new Blob([data], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // // a.download = `loan-${selectedLoan.loan_id.slice(-8)}.json`;
    // a.click();
  };
  // if (getMASConversation.isLoading || !masConversation) {
  //   return <div>Loading...</div>;
  // }
  return (  
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Notification Toast */}
      {showNotification && (
        <div className="animate-slide-in-right fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-2 rounded-lg border border-emerald-500 bg-emerald-600 px-4 py-2 text-white shadow-2xl">
            <CheckCircle className="h-4 w-4" />
            <span>Đã sao chép Loan ID!</span>
          </div>
        </div>
      )}

      <div className="mx-auto p-4 px-16">
        <Header
          selectedLoan={selectedLoan}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          onCopyLoanId={handleCopyLoanId}
          onExport={handleExport}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          handleBackToList={() => {
            navigate("/admin/loans");
          }}
        />

        {/*  Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedLoan={selectedLoan}
        />

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <OverviewSection
              selectedLoan={selectedLoan}
              formatCurrency={formatCurrency}
            />
          )}

          {/* {activeTab === "rule-based" && (
            <RuleBasedSection selectedLoan={selectedLoan} />
          )} */}

          {activeTab === "agents" && (
            <AgentOpinions selectedLoan={selectedLoan} />
          )}

          {activeTab === "debate" && (
            <div className="space-y-8">
              <AgentDebate
                selectedLoan={selectedLoan}
                masConversation={JSON.parse(
                  masConversation?.result_stringify || "{}",
                )}
                expandedAgent={expandedAgent}
                setExpandedAgent={setExpandedAgent}
              />
              {/* <DecisionMatrix selectedLoan={selectedLoan} />
              <RiskAssessmentChart selectedLoan={selectedLoan} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
//  Optimized Header Component - Tối giản hóa khi có thông tin chi tiết bên dưới
const Header = ({
  selectedLoan,
  formatCurrency,
  formatDate,
  onCopyLoanId,
  onExport,
  isFullscreen,
  onToggleFullscreen,
  handleBackToList,
}:{
  selectedLoan:Loan,
  formatCurrency:(value:number)=>string,
  formatDate:(value:string)=>string,
  onCopyLoanId:()=>void,
  onExport:()=>void,
  isFullscreen:boolean,
  onToggleFullscreen:()=>void,
  handleBackToList:()=>void
}) => (
  <div className="mb-6">
    {/* Top Navigation Bar */}
    <div className="mb-4 flex items-center justify-between">
      <button
        onClick={handleBackToList}
        className="group flex items-center text-blue-400 transition-all hover:translate-x-1 hover:text-blue-300"
      >
        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Quay lại danh sách</span>
      </button>

      {/* Action buttons */}
      <div className="flex items-center space-x-3">
        {[
          {
            icon: Maximize2,
            action: onToggleFullscreen,
            tooltip: "Toàn màn hình",
          },
          { icon: Download, action: onExport, tooltip: "Xuất dữ liệu" },
          { icon: Share, action: () => {}, tooltip: "Chia sẻ" },
          { icon: Bell, action: () => {}, tooltip: "Thông báo" },
        ].map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            title={btn.tooltip}
            className="group rounded-xl border border-slate-700 bg-slate-800/70 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:border-slate-600 hover:bg-slate-700/70"
          >
            <btn.icon className="h-5 w-5 text-slate-300 transition-colors group-hover:text-white" />
          </button>
        ))}
      </div>
    </div>

    {/* Compact Header Card - Chỉ thông tin cần thiết */}
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {/* Left: Loan ID & Quick Info */}
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-bold text-transparent">
                Hợp đồng #{selectedLoan.loan_id.slice(-8)}
              </h1>
              <button
                onClick={onCopyLoanId}
                className="rounded-lg p-1.5 transition-colors hover:bg-slate-700"
                title="Sao chép ID"
              >
                <Copy className="h-4 w-4 text-slate-400 hover:text-white" />
              </button>
            </div>
            <p className="text-sm text-slate-400">
              {selectedLoan.studentInfo?.name} •{" "}
              {formatDate(selectedLoan.created_at)}
            </p>
          </div>
        </div>

        {/* Center: Amount & Status */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="mb-1 text-sm font-medium text-slate-400">
              Số tiền vay
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
              {formatCurrency(selectedLoan.loan_amount_requested)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DecisionBadge decision={selectedLoan.decision} size="medium" />
            <div className="flex items-center rounded-full border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-sm text-slate-300">
              <Timer className="mr-2 h-3 w-3" />
              <span className="font-medium">
                {selectedLoan.processing_time}s
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center rounded-full border border-emerald-700/50 bg-emerald-900/30 px-3 py-1.5 text-sm text-emerald-400">
            <Activity className="mr-2 h-3 w-3" />
            <span className="font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Alternative: Even more minimal version
const MinimalHeader = ({
  selectedLoan,
  onCopyLoanId,
  onExport,
  isFullscreen,
  onToggleFullscreen,
  handleBackToList,
}) => (
  <div className="mb-6">
    {/* Single row with all essential info */}
    <div className="flex items-center justify-between rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 shadow-xl backdrop-blur-xl">
      {/* Left: Back button + Loan ID */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBackToList}
          className="group flex items-center text-blue-400 transition-all hover:text-blue-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Danh sách</span>
        </button>

        <div className="h-6 w-px bg-slate-600"></div>

        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-white">
            #{selectedLoan.loan_id.slice(-8)}
          </span>
          <button
            onClick={onCopyLoanId}
            className="rounded p-1 transition-colors hover:bg-slate-700"
          >
            <Copy className="h-3 w-3 text-slate-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Center: Status */}
      <div className="flex items-center space-x-3">
        <DecisionBadge decision={selectedLoan.decision} size="small" />
        <div className="flex items-center rounded-full border border-emerald-700/50 bg-emerald-900/30 px-2 py-1 text-xs text-emerald-400">
          <Activity className="mr-1 h-3 w-3" />
          Active
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2">
        {[
          { icon: Maximize2, action: onToggleFullscreen },
          { icon: Download, action: onExport },
          { icon: Share, action: () => {} },
        ].map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className="rounded-lg border border-slate-700 bg-slate-800/70 p-2 transition-all hover:border-slate-600 hover:bg-slate-700/70"
          >
            <btn.icon className="h-4 w-4 text-slate-300 hover:text-white" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

//  Tab Navigation
const TabNavigation = ({ activeTab, setActiveTab, selectedLoan }) => {
  const tabs = [
    { key: "overview", label: "📋 Tổng quan", icon: Eye, count: null },
    // {
    //   key: "rule-based",
    //   label: "⚖️ Rule-based",
    //   icon: Calculator,
    //   count: selectedLoan.rule_based?.total_passed_count,
    // },
    { key: "agents", label: "🤖 Agent Opinions", icon: Bot, count: 2 },
    { key: "debate", label: "🧠 Phản biện", icon: MessageSquare, count: 2 },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <div className="flex flex-row gap-2 rounded-2xl border border-slate-700/50 bg-slate-800/60 p-2 shadow-xl backdrop-blur-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center rounded-xl px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "scale-105 border border-purple-500 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg"
                  : "border border-transparent text-slate-300 hover:border-slate-600 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${
                    activeTab === tab.key
                      ? "bg-white/20 text-white"
                      : "border border-slate-600 bg-slate-700 text-slate-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const RuleBasedSection = ({ selectedLoan }) => {
  const ruleData = selectedLoan.rule_based;

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-8 flex items-center text-2xl font-bold text-white">
        <div className="mr-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
          <Calculator className="h-6 w-6 text-white" />
        </div>
        Phân tích Rule-based System
      </h2>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-blue-700/50 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-indigo-900/40 p-6 text-center shadow-lg">
          <div className="mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent">
            {ruleData?.total_passed_count}/7
          </div>
          <div className="font-semibold text-blue-300">Tiêu chí đạt</div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
              style={{ width: `${(ruleData?.total_passed_count / 7) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-red-700/50 bg-gradient-to-br from-red-900/40 via-red-800/30 to-rose-900/40 p-6 text-center shadow-lg">
          <div className="mb-2 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-4xl font-bold text-transparent">
            {ruleData?.special_violations_count}
          </div>
          <div className="font-semibold text-red-300">Vi phạm đặc biệt</div>
          <div className="mt-2 flex justify-center">
            {ruleData?.special_violations_count === 0 ? (
              <CheckCircle className="h-6 w-6 text-green-400" />
            ) : (
              <XCircle className="h-6 w-6 text-red-400" />
            )}
          </div>
        </div>

        <div className="rounded-xl border border-green-700/50 bg-gradient-to-br from-green-900/40 via-green-800/30 to-emerald-900/40 p-6 text-center shadow-lg">
          <div className="mb-3">
            <DecisionBadge decision={ruleData?.rule_based_decision} />
          </div>
          <div className="font-semibold text-green-300">Quyết định</div>
        </div>
      </div>

      {/* Features Analysis */}
      <h3 className="mb-6 flex items-center text-xl font-bold text-white">
        <Target className="mr-2 h-5 w-5 text-purple-400" />
        Chi tiết các tiêu chí
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(ruleData?.features_analysis || {}).map(
          ([key, passed], index) => (
            <div key={key} className="animate-slide-down">
              <FeatureCard
                key={key}
                featureKey={key}
                passed={passed}
                index={index}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

//  Feature Card
const FeatureCard = ({ featureKey, passed, index }) => {
  const getFeatureInfo = (key) => {
    const features = {
      feature_1_thu_nhap: {
        name: "Thu nhập",
        icon: DollarSign,
        description: "Đánh giá khả năng tài chính",
        color: passed
          ? "from-green-400 to-green-600"
          : "from-red-400 to-red-600",
      },
      feature_2_hoc_luc: {
        name: "Học lực",
        icon: GraduationCap,
        description: "Kết quả học tập",
        color: passed ? "from-blue-400 to-blue-600" : "from-red-400 to-red-600",
      },
      feature_3_truong_hoc: {
        name: "Trường học",
        icon: Target,
        description: "Uy tín trường đại học",
        color: passed
          ? "from-purple-400 to-purple-600"
          : "from-red-400 to-red-600",
      },
      feature_4_nganh_uu_tien: {
        name: "Ngành ưu tiên",
        icon: Sparkles,
        description: "Ngành nghề được ưu tiên",
        color: passed
          ? "from-yellow-400 to-orange-600"
          : "from-red-400 to-red-600",
      },
      feature_5_bao_lanh: {
        name: "Bảo lãnh",
        icon: Shield,
        description: "Có người bảo lãnh",
        color: passed
          ? "from-indigo-400 to-indigo-600"
          : "from-red-400 to-red-600",
      },
      feature_6_khoan_vay: {
        name: "Khoản vay",
        icon: Calculator,
        description: "Mức vay phù hợp",
        color: passed ? "from-teal-400 to-teal-600" : "from-red-400 to-red-600",
      },
      feature_7_no_existing_debt: {
        name: "Không nợ xấu",
        icon: CheckCircle,
        description: "Lịch sử tín dụng tốt",
        color: passed
          ? "from-green-400 to-emerald-600"
          : "from-red-400 to-red-600",
      },
    };
    return (
      features[key] || {
        name: key,
        icon: AlertCircle,
        description: "",
        color: "from-gray-400 to-gray-600",
      }
    );
  };

  const feature = getFeatureInfo(featureKey);

  return (
    <div
      className={`rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        passed
          ? "border-green-700/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20 hover:border-green-600/70"
          : "border-red-700/50 bg-gradient-to-br from-red-900/20 to-rose-900/20 hover:border-red-600/70"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`rounded-lg bg-gradient-to-r p-2 ${feature.color} shadow-lg`}
        >
          <feature.icon className="h-5 w-5 text-white" />
        </div>
        <div
          className={`rounded-full p-1 ${
            passed
              ? "bg-green-900/50 text-green-400"
              : "bg-red-900/50 text-red-400"
          }`}
        >
          {passed ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
        </div>
      </div>

      <div>
        <div
          className={`mb-1 font-semibold ${passed ? "text-green-300" : "text-red-300"}`}
        >
          {feature.name}
        </div>
        <p className="text-xs text-slate-400">{feature.description}</p>
      </div>
    </div>
  );
};

// Custom CSS animations
const customStyles = `
  .animate-slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }
  
  .animate-slide-down {
    animation: slideDown 0.3s ease-out;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

export default AdminLoanDetail;
