import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  BarChart3,
  Bot,
  Brain,
  TrendingUp,
  Shield,
  Calculator,
  Zap,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Eye,
  Users,
  Activity,
  Target,
  Layers,
  ChevronRight,
  ChevronDown,
  Info,
  Sparkles,
  Timer,
  Badge,
  MessageCircle,
  Expand,
//   Compress,
} from "lucide-react";

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
      reason: "Phản biện của agent phản biện tập trung vào các yếu tố rủi ro tiềm ẩn liên quan đến khả năng duy trì thành tích học tập và khả năng trả nợ trong tương lai",
      raw_response: "QUYẾT ĐỊNH: REJECT\n\nLÝ DO: Phản biện của agent phản biện tập trung vào các yếu tố rủi ro tiềm ẩn liên quan đến khả năng duy trì thành tích học tập và khả năng trả nợ trong tương lai, đặc biệt là các yếu tố về biến động thu nhập, khả năng mất việc hoặc các rủi ro vĩ mô không được xem xét đầy đủ trong đánh giá ban đầu.",
    },
    finance_repredict: {
      decision: "reject",
      reason: "Sau phản biện vẫn giữ thái độ thận trọng về rủi ro tài chính",
      raw_response: "Dựa trên framework tái đánh giá rủi ro, tôi sẽ phân tích lại phản biện của CriticalAgent và các yếu tố liên quan để đưa ra quyết định phú hợp.",
    },
    critical_academic: {
      critical_response: "Lập luận của quyết định dựa chủ yếu vào thành tích học tập, hoạt động ngoại khóa và bối cảnh tài chính của sinh viên, nhưng chưa đủ xem xét các yếu tố rủi ro dài hạn",
      recommended_decision: "reject",
      raw_response: "PHẢN BIỆN: Lập luận của quyết định dựa chủ yếu vào thành tích học tập, hoạt động ngoại khóa và bối cảnh tài chính của sinh viên, nhưng chưa đủ xem xét các yếu tố rủi ro dài hạn như khả năng sinh viên duy trì thành tích trong các năm tiếp theo.",
    },
    critical_finance: {
      critical_response: "Lập luận dựa trên tỷ lệ thu nhập/thanh toán vay (47%) và khả năng chi trả của sinh viên là hợp lý, tuy nhiên, không xem xét đến các yếu tố rủi ro tiềm ẩn",
      recommended_decision: "reject",
      raw_response: "PHẢN BIỆN: Lập luận dựa trên tỷ lệ thu nhập/thanh toán vay (47%) và khả năng chi trả của sinh viên là hợp lý, tuy nhiên, không xem xét đến các yếu tố rủi ro tiềm ẩn như khả năng mất việc hoặc biến động thu nhập trong tương lai.",
    },
    final_decision: {
      decision: "approve",
      reason: "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic, Finance agent(s) đồng ý.",
      final_result: {
        decision: "approve",
        reason: "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic, Finance agent(s) đồng ý.",
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

const loanPurposes = {
  1: "Học phí",
  2: "Sinh hoạt phí", 
  3: "Mua sách/thiết bị",
  4: "Khác",
};

const LoanDetailDashboard = () => {
  const [selectedLoan] = useState(sampleLoanData);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedAgent, setExpandedAgent] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="mx-auto max-w-7xl">
        {/* Header với thông tin chung */}
        <HeaderSection 
          selectedLoan={selectedLoan} 
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-2xl bg-white/80 p-1 shadow-lg backdrop-blur-sm">
              {[
                { key: "overview", label: "📋 Tổng quan", icon: Eye },
                { key: "rule-based", label: "⚖️ Rule-based", icon: Calculator },
                { key: "agents", label: "🤖 Agent Opinions", icon: Bot },
                { key: "debate", label: "🧠 Phản biện", icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content dựa trên tab được chọn */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <OverviewSection 
              selectedLoan={selectedLoan}
              formatCurrency={formatCurrency}
            />
          )}
          
          {activeTab === "rule-based" && (
            <RuleBasedSection selectedLoan={selectedLoan} />
          )}
          
          {activeTab === "agents" && (
            <AgentOpinionsSection selectedLoan={selectedLoan} />
          )}
          
          {activeTab === "debate" && (
            <div className="space-y-8">
              <DebateSection 
                selectedLoan={selectedLoan}
                expandedAgent={expandedAgent}
                setExpandedAgent={setExpandedAgent}
              />
              <DecisionMatrix selectedLoan={selectedLoan} />
              <RiskAssessmentChart selectedLoan={selectedLoan} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Header Section với thông tin tóm tắt
const HeaderSection = ({ selectedLoan, formatCurrency, formatDate }) => (
  <div className="mb-8">
    <button className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
      <ArrowLeft className="mr-2 h-5 w-5" />
      Quay lại danh sách
    </button>

    <div className="rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Loan ID & Status */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hợp đồng #{selectedLoan.loan_id.slice(-8)}
              </h1>
              <p className="text-gray-600">
                Sinh viên: {selectedLoan.studentInfo?.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <FinalDecisionBadge decision={selectedLoan.decision} />
            <div className="flex items-center text-gray-500 text-sm">
              <Timer className="h-4 w-4 mr-1" />
              {selectedLoan.processing_time}s
            </div>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="text-center lg:text-left">
          <div className="text-sm text-gray-500 mb-1">Số tiền vay</div>
          <div className="text-2xl font-bold text-indigo-600">
            {formatCurrency(selectedLoan.loan_amount_requested)}
          </div>
          <div className="text-sm text-gray-500">
            Trả/tháng: {formatCurrency(selectedLoan.monthly_installment)}
          </div>
        </div>

        {/* Created Date */}
        <div className="text-center lg:text-left">
          <div className="text-sm text-gray-500 mb-1">Ngày tạo</div>
          <div className="text-lg font-semibold text-gray-900">
            {formatDate(selectedLoan.created_at)}
          </div>
          <div className="text-sm text-gray-500">
            {loanPurposes[selectedLoan.loan_purpose]}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Overview Section
const OverviewSection = ({ selectedLoan, formatCurrency }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Thông tin sinh viên */}
    <div className="rounded-2xl bg-white/90 p-6 shadow-lg">
      <h2 className="flex items-center text-xl font-bold text-gray-900 mb-6">
        <User className="mr-3 h-6 w-6 text-indigo-600" />
        Thông tin sinh viên
      </h2>
      
      <div className="space-y-4">
        {[
          { label: "Họ tên", value: selectedLoan.studentInfo?.name, icon: User },
          { label: "Mã SV", value: selectedLoan.student_id, icon: GraduationCap },
          { label: "GPA", value: `${selectedLoan.studentInfo?.gpa}/4.0`, icon: BarChart3 },
          { label: "Trường", value: selectedLoan.studentInfo?.university, icon: GraduationCap },
          { label: "Khoa", value: selectedLoan.studentInfo?.faculty, icon: Layers },
          { label: "Ngành", value: selectedLoan.studentInfo?.major, icon: Target },
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <item.icon className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="font-medium text-gray-900">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Final Decision Details */}
    <div className="rounded-2xl bg-white/90 p-6 shadow-lg">
      <h2 className="flex items-center text-xl font-bold text-gray-900 mb-6">
        <Zap className="mr-3 h-6 w-6 text-yellow-500" />
        Quyết định cuối cùng
      </h2>
      
      <div className="space-y-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="text-sm text-gray-500 mb-2">Lý do:</div>
          <p className="text-gray-900 leading-relaxed">
            {selectedLoan.responses?.final_decision?.reason}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Rule-based</div>
            <div className="text-lg font-bold text-green-600">
              {selectedLoan.responses?.final_decision?.final_result?.rule_based_pass ? "✓ PASS" : "✗ FAIL"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Agent Support</div>
            <div className="text-lg font-bold text-green-600">
              {selectedLoan.responses?.final_decision?.final_result?.agent_support_available ? "✓ Có" : "✗ Không"}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Rule-based Section
const RuleBasedSection = ({ selectedLoan }) => {
  const ruleData = selectedLoan.rule_based;
  
  return (
    <div className="rounded-2xl bg-white/90 p-8 shadow-lg">
      <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
        <Calculator className="mr-3 h-7 w-7 text-blue-600" />
        Phân tích Rule-based System
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {ruleData?.total_passed_count}/7
          </div>
          <div className="text-blue-800 font-medium">Tiêu chí đạt</div>
        </div>
        
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-rose-100">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {ruleData?.special_violations_count}
          </div>
          <div className="text-red-800 font-medium">Vi phạm đặc biệt</div>
        </div>
        
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100">
          <FinalDecisionBadge decision={ruleData?.rule_based_decision} />
          <div className="text-green-800 font-medium mt-2">Quyết định</div>
        </div>
      </div>

      {/* Features Analysis */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">Chi tiết các tiêu chí</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(ruleData?.features_analysis || {}).map(([key, passed]) => (
          <FeatureCard key={key} featureKey={key} passed={passed} />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ featureKey, passed }) => {
  const getFeatureName = (key) => {
    const names = {
      feature_1_thu_nhap: "Thu nhập",
      feature_2_hoc_luc: "Học lực",
      feature_3_truong_hoc: "Trường học",
      feature_4_nganh_uu_tien: "Ngành ưu tiên",
      feature_5_bao_lanh: "Bảo lãnh",
      feature_6_khoan_vay: "Khoản vay",
      feature_7_no_existing_debt: "Không nợ xấu",
    };
    return names[key] || key;
  };

  return (
    <div className={`rounded-xl border-2 p-4 transition-all ${
      passed 
        ? "border-green-200 bg-green-50 hover:shadow-md" 
        : "border-red-200 bg-red-50 hover:shadow-md"
    }`}>
      <div className="flex items-center justify-between">
        <div className={`font-medium ${passed ? "text-green-800" : "text-red-800"}`}>
          {getFeatureName(featureKey)}
        </div>
        <div className={`rounded-full p-1 ${
          passed 
            ? "bg-green-100 text-green-600" 
            : "bg-red-100 text-red-600"
        }`}>
          {passed ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
        </div>
      </div>
    </div>
  );
};

// Agent Opinions Section
const AgentOpinionsSection = ({ selectedLoan }) => (
  <div className="space-y-6">
    <div className="rounded-2xl bg-white/90 p-8 shadow-lg">
      <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
        <Bot className="mr-3 h-7 w-7 text-purple-600" />
        Ý kiến từ các AI Agent
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Agent */}
        <AgentCard
          name="Academic Agent"
          icon={Brain}
          decision={selectedLoan.responses?.academic_repredict?.decision}
          reason={selectedLoan.responses?.academic_repredict?.reason}
          color="from-blue-500 to-indigo-600"
          status={selectedLoan.agent_status?.academic_approve}
        />

        {/* Finance Agent */}
        <AgentCard
          name="Finance Agent"
          icon={TrendingUp}
          decision={selectedLoan.responses?.finance_repredict?.decision}
          reason={selectedLoan.responses?.finance_repredict?.reason}
          color="from-green-500 to-emerald-600"
          status={selectedLoan.agent_status?.finance_approve}
        />
      </div>

      {/* Agent Status Summary */}
      <div className="mt-8 p-6 rounded-xl bg-gray-50">
        <h3 className="font-bold text-gray-900 mb-4">Tóm tắt trạng thái Agent</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Ít nhất 1 agent chấp thuận:</span>
            <span className={`font-bold ${selectedLoan.agent_status?.at_least_one_agent_approve ? "text-green-600" : "text-red-600"}`}>
              {selectedLoan.agent_status?.at_least_one_agent_approve ? "✓ Có" : "✗ Không"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Cả 2 điều kiện đạt:</span>
            <span className={`font-bold ${selectedLoan.agent_status?.both_conditions_met ? "text-green-600" : "text-red-600"}`}>
              {selectedLoan.agent_status?.both_conditions_met ? "✓ Có" : "✗ Không"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AgentCard = ({ name, icon: Icon, decision, reason, color, status }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{name}</h3>
          <div className="text-sm text-gray-500">
            Trạng thái: {status ? "✅ Chấp thuận" : "❌ Từ chối"}
          </div>
        </div>
      </div>
      <DecisionBadge decision={decision} />
    </div>
    
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-sm text-gray-700 leading-relaxed">{reason}</p>
    </div>
  </div>
);

// Debate Section - Focus chính
const DebateSection = ({ selectedLoan, expandedAgent, setExpandedAgent }) => {
  const criticalAgents = [
    {
      key: "critical_academic",
      name: "Critical Academic Agent",
      avatar: "🎓",
      color: "from-orange-500 to-red-500",
      data: selectedLoan.responses?.critical_academic,
    },
    {
      key: "critical_finance", 
      name: "Critical Finance Agent",
      avatar: "💰",
      color: "from-purple-500 to-pink-500",
      data: selectedLoan.responses?.critical_finance,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/90 p-8 shadow-lg">
        <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
          <MessageSquare className="mr-3 h-7 w-7 text-red-600" />
          🧠 Phản biện từ Critical Agents
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          Dưới đây là các ý kiến phản biện từ các AI agent chuyên phụ trách đánh giá rủi ro và thách thức quyết định ban đầu:
        </p>

        {/* Chat-like interface cho phản biện */}
        <div className="space-y-6">
          {criticalAgents.map((agent) => (
            <CriticalAgentCard
              key={agent.key}
              agent={agent}
              isExpanded={expandedAgent === agent.key}
              onToggleExpand={() => setExpandedAgent(
                expandedAgent === agent.key ? null : agent.key
              )}
            />
          ))}
        </div>

        {/* Kết luận cuối */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
          <h3 className="flex items-center font-bold text-gray-900 mb-4">
            <Target className="mr-2 h-5 w-5 text-indigo-600" />
            Kết luận sau phản biện
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Mặc dù có sự phản đối từ các Critical Agent về các rủi ro tiềm ẩn, 
            hệ thống cuối cùng vẫn <strong>CHẤP THUẬN</strong> khoản vay dựa trên:
          </p>
          <ul className="mt-3 ml-6 space-y-1 text-gray-700">
            <li>• Rule-based system: <strong>6/7 tiêu chí đạt</strong></li>
            <li>• Không có vi phạm đặc biệt nào</li>
            <li>• Áp dụng hybrid approach: subjective debate → objective rules</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const CriticalAgentCard = ({ agent, isExpanded, onToggleExpand }) => (
  <div className="rounded-xl border border-red-200 bg-white shadow-sm overflow-hidden">
    {/* Agent Header */}
    <div className={`bg-gradient-to-r ${agent.color} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
            {agent.avatar}
          </div>
          <div>
            <h3 className="font-bold text-white">{agent.name}</h3>
            <div className="text-white/80 text-sm">Vai trò: Phản biện & Đánh giá rủi ro</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DecisionBadge decision={agent.data?.recommended_decision} />
          <button
            onClick={onToggleExpand}
            className="text-white hover:text-white/80 transition-colors"
          >
            {/* {isExpanded ? <Compress className="h-5 w-5" /> : <Expand className="h-5 w-5" />} */}
          </button>
        </div>
      </div>
    </div>

          {/* Agent Content */}
    <div className="p-6">
      {/* Critical Response */}
      <div className="mb-4">
        <h4 className="flex items-center font-semibold text-gray-900 mb-3">
          <MessageCircle className="mr-2 h-4 w-4 text-red-500" />
          Phản biện chính
        </h4>
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-red-800 leading-relaxed">{agent.data?.critical_response}</p>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Raw Response */}
          <div>
            <h4 className="flex items-center font-semibold text-gray-900 mb-3">
              <FileText className="mr-2 h-4 w-4 text-gray-600" />
              Chi tiết phản biện
            </h4>
            <div className="rounded-lg bg-gray-100 p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-gray-700">
                {agent.data?.raw_response}
              </pre>
            </div>
          </div>

          {/* Admin Comment Section */}
          <AdminCommentSection agentKey={agent.key} />
        </div>
      )}
    </div>
  </div>
);

// Admin Comment Component
const AdminCommentSection = ({ agentKey }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Cần xem xét thêm về khả năng sinh viên duy trì GPA trong năm cuối",
      timestamp: "2025-08-07 12:30",
      author: "Admin Nguyễn Minh"
    }
  ]);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        timestamp: new Date().toLocaleString("vi-VN"),
        author: "Admin Current User"
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="border-t pt-4">
      <h4 className="flex items-center font-semibold text-gray-900 mb-3">
        <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
        Phản hồi của Admin
      </h4>
      
      {/* Existing Comments */}
      <div className="space-y-2 mb-4">
        {comments.map((commentItem) => (
          <div key={commentItem.id} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-blue-800 text-sm">{commentItem.text}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-blue-600">{commentItem.author}</span>
              <span className="text-xs text-blue-500">{commentItem.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập phản hồi của bạn..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

// Decision Matrix Component - Bonus UI 1
const DecisionMatrix = ({ selectedLoan }) => (
  <div className="mt-8 rounded-2xl bg-white/90 p-8 shadow-lg">
    <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
      <Activity className="mr-3 h-7 w-7 text-indigo-600" />
      🔄 Ma trận So sánh Quyết định
    </h2>
    
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <th className="text-left p-4 font-bold text-gray-900 border border-gray-200">Agent</th>
            <th className="text-center p-4 font-bold text-gray-900 border border-gray-200">Quyết định</th>
            <th className="text-left p-4 font-bold text-gray-900 border border-gray-200">Lý do chính</th>
            <th className="text-center p-4 font-bold text-gray-900 border border-gray-200">Conflict</th>
          </tr>
        </thead>
        <tbody>
          {/* Academic Agent */}
          <tr className="hover:bg-gray-50">
            <td className="p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Academic Agent</span>
              </div>
            </td>
            <td className="p-4 text-center border border-gray-200">
              <DecisionBadge decision={selectedLoan.responses?.academic_repredict?.decision} />
            </td>
            <td className="p-4 border border-gray-200 text-sm text-gray-700">
              {selectedLoan.responses?.academic_repredict?.reason}
            </td>
            <td className="p-4 text-center border border-gray-200">
              <ConflictIndicator 
                agentDecision={selectedLoan.responses?.academic_repredict?.decision}
                criticalDecision={selectedLoan.responses?.critical_academic?.recommended_decision}
              />
            </td>
          </tr>

          {/* Finance Agent */}
          <tr className="hover:bg-gray-50">
            <td className="p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium">Finance Agent</span>
              </div>
            </td>
            <td className="p-4 text-center border border-gray-200">
              <DecisionBadge decision={selectedLoan.responses?.finance_repredict?.decision} />
            </td>
            <td className="p-4 border border-gray-200 text-sm text-gray-700">
              {selectedLoan.responses?.finance_repredict?.reason}
            </td>
            <td className="p-4 text-center border border-gray-200">
              <ConflictIndicator 
                agentDecision={selectedLoan.responses?.finance_repredict?.decision}
                criticalDecision={selectedLoan.responses?.critical_finance?.recommended_decision}
              />
            </td>
          </tr>

          {/* Critical Academic */}
          <tr className="bg-red-50 hover:bg-red-100">
            <td className="p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Critical Academic</span>
              </div>
            </td>
            <td className="p-4 text-center border border-gray-200">
              <DecisionBadge decision={selectedLoan.responses?.critical_academic?.recommended_decision} />
            </td>
            <td className="p-4 border border-gray-200 text-sm text-red-700">
              {selectedLoan.responses?.critical_academic?.critical_response}
            </td>
            <td className="p-4 text-center border border-gray-200">
              ⚠️
            </td>
          </tr>

          {/* Critical Finance */}
          <tr className="bg-red-50 hover:bg-red-100">
            <td className="p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <Calculator className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Critical Finance</span>
              </div>
            </td>
            <td className="p-4 text-center border border-gray-200">
              <DecisionBadge decision={selectedLoan.responses?.critical_finance?.recommended_decision} />
            </td>
            <td className="p-4 border border-gray-200 text-sm text-red-700">
              {selectedLoan.responses?.critical_finance?.critical_response}
            </td>
            <td className="p-4 text-center border border-gray-200">
              ⚠️
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Conflict Summary */}
    <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
      <div className="flex items-center mb-2">
        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
        <h4 className="font-bold text-yellow-800">Phát hiện Xung đột</h4>
      </div>
      <p className="text-yellow-700 text-sm">
        Có 2 điểm xung đột giữa các agent chính và agent phản biện. 
        Hệ thống đã áp dụng <strong>hybrid approach</strong> để ra quyết định cuối cùng.
      </p>
    </div>
  </div>
);

// Conflict Indicator Component
const ConflictIndicator = ({ agentDecision, criticalDecision }) => {
  const hasConflict = agentDecision !== criticalDecision;
  
  if (hasConflict) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-red-100 text-red-600 rounded-full p-2">
          <AlertCircle className="h-4 w-4" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center">
      <div className="bg-green-100 text-green-600 rounded-full p-2">
        <CheckCircle className="h-4 w-4" />
      </div>
    </div>
  );
};

// Risk Assessment Visualization - Bonus UI 2
const RiskAssessmentChart = ({ selectedLoan }) => {
  const riskFactors = [
    { 
      name: "Thu nhập", 
      score: selectedLoan.rule_based?.features_analysis?.feature_1_thu_nhap ? 85 : 35,
      status: selectedLoan.rule_based?.features_analysis?.feature_1_thu_nhap,
      concern: "Không đạt tiêu chí thu nhập tối thiểu"
    },
    { 
      name: "Học lực", 
      score: selectedLoan.rule_based?.features_analysis?.feature_2_hoc_luc ? 75 : 25,
      status: selectedLoan.rule_based?.features_analysis?.feature_2_hoc_luc,
      concern: ""
    },
    { 
      name: "Trường học", 
      score: selectedLoan.rule_based?.features_analysis?.feature_3_truong_hoc ? 90 : 30,
      status: selectedLoan.rule_based?.features_analysis?.feature_3_truong_hoc,
      concern: ""
    },
    { 
      name: "Bảo lãnh", 
      score: selectedLoan.rule_based?.features_analysis?.feature_5_bao_lanh ? 95 : 20,
      status: selectedLoan.rule_based?.features_analysis?.feature_5_bao_lanh,
      concern: ""
    },
    { 
      name: "Duy trì GPA", 
      score: 40, // Từ phản biện
      status: false,
      concern: "Critical agent lo ngại về khả năng duy trì thành tích"
    },
    { 
      name: "Rủi ro tài chính", 
      score: 45, // Từ phản biện
      status: false,
      concern: "Chưa xem xét biến động thu nhập tương lai"
    }
  ];

  return (
    <div className="mt-8 rounded-2xl bg-white/90 p-8 shadow-lg">
      <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
        <BarChart3 className="mr-3 h-7 w-7 text-purple-600" />
        📊 Phân tích Rủi ro Chi tiết
      </h2>

      <div className="space-y-4">
        {riskFactors.map((factor, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{factor.name}</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${
                  factor.score >= 70 ? "text-green-600" : 
                  factor.score >= 50 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {factor.score}%
                </span>
                {factor.status ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${
                  factor.score >= 70 ? "bg-green-500" : 
                  factor.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${factor.score}%` }}
              ></div>
            </div>
            
            {factor.concern && (
              <p className="text-sm text-red-600 mt-1">⚠️ {factor.concern}</p>
            )}
          </div>
        ))}
      </div>

      {/* Overall Risk Score */}
      <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-2">68%</div>
          <div className="text-indigo-800 font-medium">Điểm Rủi ro Tổng thể</div>
          <p className="text-sm text-indigo-600 mt-2">
            Mức rủi ro trung bình - Cần theo dõi thêm
          </p>
        </div>
      </div>
    </div>
  );
};

// Final Decision Badge Component
const FinalDecisionBadge = ({ decision }) => {
  const isApprove = decision === "approve";
  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
      isApprove 
        ? "bg-green-100 text-green-800 border border-green-300" 
        : "bg-red-100 text-red-800 border border-red-300"
    }`}>
      {isApprove ? (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          CHẤP THUẬN
        </>
      ) : (
        <>
          <XCircle className="mr-2 h-4 w-4" />
          TỪ CHỐI
        </>
      )}
    </div>
  );
};

const DecisionBadge = ({ decision }) => {
  const isApprove = decision === "approve";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
      isApprove
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}>
      {isApprove ? (
        <ThumbsUp className="mr-1 h-3 w-3" />
      ) : (
        <ThumbsDown className="mr-1 h-3 w-3" />
      )}
      {isApprove ? "Chấp thuận" : "Từ chối"}
    </span>
  );
};

export default LoanDetailDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   FileText,
//   CreditCard,
//   DollarSign,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   GraduationCap,
//   BarChart3,
//   Bot,
//   Brain,
//   TrendingUp,
//   Shield,
//   Calculator,
//   Zap,
//   ThumbsUp,
//   ThumbsDown,
//   MessageSquare,
//   Eye,
//   Users,
//   Activity,
//   Target,
//   Layers,
//   ChevronRight,
//   Info,
//   Sparkles,
// } from "lucide-react";

// // Sample data based on your paste
// const sampleLoanData = {
//   _id: "689493432f3ceb2fda6fba9c",
//   created_at: "2025-08-07T11:51:31.199Z",
//   decision: "approve",
//   loan_id: "6894930bdcb9c4dc32a9fc62",
//   processing_time: 55.17,
//   loan_amount_requested: 20000000,
//   loan_purpose: "3",
//   monthly_installment: 2000000,
//   student_id: "SV001234",
//   status: "accepted",
//   updated_at: "2025-08-07T11:51:31.199Z",
//   studentInfo: {
//     name: "Nguyễn Văn A",
//     gpa: 3.4,
//     phone: "0123456789",
//     university: "Đại học Bách Khoa Hà Nội",
//     faculty: "Khoa Công Nghệ Thông Tin",
//     major: "Công Nghệ Tài Chính",
//     year: 3,
//     email: "nguyenvana@student.hust.edu.vn",
//     address: "123 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
//   },
//   responses: {
//     academic_repredict: {
//       decision: "reject",
//       reason:
//         "Phản biện của agent phản biện tập trung vào các yếu tố rủi ro tiềm ẩn liên quan đến khả năng duy trì thành tích học tập và khả năng trả nợ trong tương lai",
//       raw_response:
//         "QUYẾT ĐỊNH: REJECT\n\nLÝ DO: Phản biện của agent phản biện tập trung vào các yếu tố rủi ro tiềm ẩn liên quan đến khả năng duy trì thành tích học tập và khả năng trả nợ trong tương lai, đặc biệt là các yếu tố về biến động thu nhập, khả năng mất việc hoặc các rủi ro vĩ mô không được xem xét đầy đủ trong đánh giá ban đầu.",
//     },
//     finance_repredict: {
//       decision: "reject",
//       reason: "Sau phản biện vẫn giữ thái độ thận trọng về rủi ro tài chính",
//       raw_response:
//         "Dựa trên framework tái đánh giá rủi ro, tôi sẽ phân tích lại phản biện của CriticalAgent và các yếu tố liên quan để đưa ra quyết định phù hợp.",
//     },
//     critical_academic: {
//       critical_response:
//         "Lập luận của quyết định dựa chủ yếu vào thành tích học tập, hoạt động ngoại khóa và bối cảnh tài chính của sinh viên, nhưng chưa đủ xem xét các yếu tố rủi ro dài hạn",
//       recommended_decision: "reject",
//       raw_response:
//         "PHẢN BIỆN: Lập luận của quyết định dựa chủ yếu vào thành tích học tập, hoạt động ngoại khóa và bối cảnh tài chính của sinh viên, nhưng chưa đủ xem xét các yếu tố rủi ro dài hạn như khả năng sinh viên duy trì thành tích trong các năm tiếp theo.",
//     },
//     critical_finance: {
//       critical_response:
//         "Lập luận dựa trên tỷ lệ thu nhập/thanh toán vay (47%) và khả năng chi trả của sinh viên là hợp lý, tuy nhiên, không xem xét đến các yếu tố rủi ro tiềm ẩn",
//       recommended_decision: "reject",
//       raw_response:
//         "PHẢN BIỆN: Lập luận dựa trên tỷ lệ thu nhập/thanh toán vay (47%) và khả năng chi trả của sinh viên là hợp lý, tuy nhiên, không xem xét đến các yếu tố rủi ro tiềm ẩn như khả năng mất việc hoặc biến động thu nhập trong tương lai.",
//     },
//     final_decision: {
//       decision: "approve",
//       reason:
//         "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic, Finance agent(s) đồng ý.",
//       final_result: {
//         decision: "approve",
//         reason:
//           "PASS cả 3 special features (F2,F5,F7) - CHẤP NHẬN theo quy định (passed_count = 6/7). + Agent support: Academic, Finance agent(s) đồng ý.",
//         rule_based_pass: true,
//         agent_support_available: true,
//         hybrid_approach: "subjective_debate_to_objective_rules",
//       },
//     },
//   },
//   rule_based: {
//     total_passed_count: 6,
//     special_violations_count: 0,
//     rule_based_decision: "approve",
//     features_analysis: {
//       feature_1_thu_nhap: false,
//       feature_2_hoc_luc: true,
//       feature_3_truong_hoc: true,
//       feature_4_nganh_uu_tien: true,
//       feature_5_bao_lanh: true,
//       feature_6_khoan_vay: true,
//       feature_7_no_existing_debt: true,
//     },
//   },
//   agent_status: {
//     academic_approve: true,
//     finance_approve: true,
//     at_least_one_agent_approve: true,
//     both_conditions_met: true,
//   },
// };

// const loanPurposes = {
//   1: "Học phí",
//   2: "Sinh hoạt phí",
//   3: "Mua sách/thiết bị",
//   4: "Khác",
// };

// const LoanDetail = () => {
//   const [selectedLoan] = useState(sampleLoanData);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [selectedAgent, setSelectedAgent] = useState(null);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleBackToList = () => {
//     console.log("Back to list");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900">
//       <div className="mx-auto max-w-7xl px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={handleBackToList}
//             className="group mb-6 flex items-center text-indigo-600 transition-all hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
//           >
//             <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
//             Quay lại danh sách
//           </button>

//           <div className="text-center">
//             <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/25">
//               <FileText className="h-10 w-10 text-white" />
//             </div>
//             <h1 className="mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
//               Chi Tiết Khoản Vay
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-400">
//               Phân tích chi tiết và đánh giá AI cho khoản vay #
//               {selectedLoan.student_id}
//             </p>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="mb-8">
//           <div className="flex justify-center">
//             <div className="inline-flex rounded-2xl bg-white/70 p-1 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
//               {[
//                 { key: "overview", label: "Tổng quan", icon: Eye },
//                 { key: "agents", label: "Phân tích AI", icon: Bot },
//                 { key: "decision", label: "Quyết định", icon: Target },
//               ].map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   className={`flex items-center rounded-xl px-6 py-3 text-sm font-medium transition-all ${
//                     activeTab === tab.key
//                       ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
//                       : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
//                   }`}
//                 >
//                   <tab.icon className="mr-2 h-4 w-4" />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Content based on active tab */}
//         {activeTab === "overview" && (
//           <OverviewTab
//             selectedLoan={selectedLoan}
//             formatCurrency={formatCurrency}
//             formatDate={formatDate}
//           />
//         )}
//         {activeTab === "agents" && (
//           <AgentsTab
//             selectedLoan={selectedLoan}
//             selectedAgent={selectedAgent}
//             setSelectedAgent={setSelectedAgent}
//           />
//         )}
//         {activeTab === "decision" && (
//           <DecisionTab selectedLoan={selectedLoan} />
//         )}
//       </div>
//     </div>
//   );
// };
// export default LoanDetail;

// const OverviewTab = ({ selectedLoan, formatCurrency, formatDate }) => (
//   <div className="space-y-8">
//     {/* Loan Overview */}
//     <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/80">
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6">
//         <h2 className="flex items-center text-xl font-bold text-white">
//           <CreditCard className="mr-3 h-6 w-6" />
//           Thông tin khoản vay
//         </h2>
//       </div>

//       <div className="p-8">
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {[
//             {
//               label: "Số tiền vay",
//               value: formatCurrency(selectedLoan.loan_amount_requested),
//               icon: DollarSign,
//               color: "text-indigo-600 dark:text-indigo-400",
//             },
//             {
//               label: "Mục đích vay",
//               value: loanPurposes[selectedLoan.loan_purpose],
//               icon: FileText,
//               color: "text-purple-600 dark:text-purple-400",
//             },
//             {
//               label: "Trả hàng tháng",
//               value: formatCurrency(selectedLoan.monthly_installment),
//               icon: Calendar,
//               color: "text-green-600 dark:text-green-400",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="group rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 p-6 transition-all hover:shadow-lg dark:border-gray-600/50 dark:from-gray-700 dark:to-gray-800"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
//                     {item.label}
//                   </div>
//                   <div className={`text-2xl font-bold ${item.color}`}>
//                     {item.value}
//                   </div>
//                 </div>
//                 <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 p-3 dark:from-indigo-900/30 dark:to-purple-900/30">
//                   <item.icon className={`h-6 w-6 ${item.color}`} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Student Information */}
//     <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/80">
//       <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-8 py-6">
//         <h2 className="flex items-center text-xl font-bold text-white">
//           <User className="mr-3 h-6 w-6" />
//           Thông tin sinh viên
//         </h2>
//       </div>

//       <div className="p-8">
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//           <div className="space-y-6">
//             {[
//               {
//                 label: "Họ và tên",
//                 value: selectedLoan.studentInfo?.name,
//                 icon: User,
//               },
//               {
//                 label: "Mã sinh viên",
//                 value: selectedLoan.student_id,
//                 icon: GraduationCap,
//               },
//               {
//                 label: "GPA",
//                 value: `${selectedLoan.studentInfo?.gpa}/4.0`,
//                 icon: BarChart3,
//               },
//               {
//                 label: "Số điện thoại",
//                 value: selectedLoan.studentInfo?.phone,
//                 icon: Phone,
//               },
//             ].map((item, index) => (
//               <div key={index} className="flex items-center space-x-4">
//                 <div className="rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 p-2 dark:from-indigo-900/30 dark:to-purple-900/30">
//                   <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                     {item.label}
//                   </div>
//                   <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {item.value}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="space-y-6">
//             {[
//               {
//                 label: "Trường đại học",
//                 value: selectedLoan.studentInfo?.university,
//               },
//               { label: "Khoa", value: selectedLoan.studentInfo?.faculty },
//               { label: "Chuyên ngành", value: selectedLoan.studentInfo?.major },
//               {
//                 label: "Năm học",
//                 value: `Năm ${selectedLoan.studentInfo?.year}`,
//               },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-700 dark:to-gray-800"
//               >
//                 <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                   {item.label}
//                 </div>
//                 <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
//                   {item.value}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const AgentsTab = ({ selectedLoan, selectedAgent, setSelectedAgent }) => {
//   const agents = [
//     {
//       key: "academic_repredict",
//       name: "AI Agent - Đánh giá Học thuật",
//       icon: Brain,
//       color: "from-blue-500 to-indigo-500",
//       response: selectedLoan.responses?.academic_repredict,
//       description: "Đánh giá khả năng học tập và tiềm năng phát triển",
//     },
//     {
//       key: "finance_repredict",
//       name: "AI Agent - Đánh giá Tài chính",
//       icon: TrendingUp,
//       color: "from-green-500 to-emerald-500",
//       response: selectedLoan.responses?.finance_repredict,
//       description: "Phân tích khả năng tài chính và rủi ro",
//     },
//     {
//       key: "critical_academic",
//       name: "AI Agent - Phản biện Học thuật",
//       icon: Shield,
//       color: "from-orange-500 to-red-500",
//       response: selectedLoan.responses?.critical_academic,
//       description: "Phản biện và đánh giá rủi ro về mặt học thuật",
//     },
//     {
//       key: "critical_finance",
//       name: "AI Agent - Phản biện Tài chính",
//       icon: Calculator,
//       color: "from-purple-500 to-pink-500",
//       response: selectedLoan.responses?.critical_finance,
//       description: "Phản biện và đánh giá rủi ro tài chính",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Agent Overview */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         {agents.map((agent) => (
//           <AgentOverviewCard
//             key={agent.key}
//             agent={agent}
//             onClick={() => setSelectedAgent(agent)}
//             isActive={selectedAgent?.key === agent.key}
//           />
//         ))}
//       </div>

//       {/* Detailed Analysis */}
//       {selectedAgent && (
//         <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/80">
//           <div className={`bg-gradient-to-r ${selectedAgent.color} px-8 py-6`}>
//             <div className="flex items-center justify-between">
//               <h2 className="flex items-center text-xl font-bold text-white">
//                 <selectedAgent.icon className="mr-3 h-6 w-6" />
//                 {selectedAgent.name}
//               </h2>
//               <DecisionBadge
//                 decision={
//                   selectedAgent.response?.decision ||
//                   selectedAgent.response?.recommended_decision
//                 }
//               />
//             </div>
//             <p className="mt-2 text-white/80">{selectedAgent.description}</p>
//           </div>

//           <div className="p-8">
//             <AgentDetailedAnalysis response={selectedAgent.response} />
//           </div>
//         </div>
//       )}

//       {/* Multi-Agent Conversation Flow */}
//       <ConversationFlow agents={agents} />
//     </div>
//   );
// };

// const AgentOverviewCard = ({ agent, onClick, isActive }) => {
//   const decision =
//     agent.response?.decision || agent.response?.recommended_decision;

//   return (
//     <div
//       className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
//         isActive
//           ? "border-indigo-300 bg-white shadow-xl dark:border-indigo-600 dark:bg-gray-800"
//           : "border-gray-200/50 bg-white/60 hover:bg-white dark:border-gray-600/50 dark:bg-gray-800/60 dark:hover:bg-gray-800"
//       }`}
//       onClick={onClick}
//     >
//       <div className={`bg-gradient-to-r ${agent.color} p-6`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="rounded-xl bg-white/20 p-3">
//               <agent.icon className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-white">{agent.name}</h3>
//               <p className="text-sm text-white/80">{agent.description}</p>
//             </div>
//           </div>
//           <ChevronRight className="h-5 w-5 text-white/60 transition-transform group-hover:translate-x-1" />
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-600 dark:text-gray-400">
//             Quyết định
//           </div>
//           <DecisionBadge decision={decision} />
//         </div>

//         <div className="mt-4">
//           <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
//             {agent.response?.reason ||
//               agent.response?.critical_response ||
//               "Không có thông tin"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AgentDetailedAnalysis = ({ response }) => {
//   if (!response) return <div>Không có dữ liệu phản hồi</div>;

//   const sections = [
//     {
//       title: "Lý do chính",
//       content: response.reason || response.critical_response,
//       icon: MessageSquare,
//       color: "text-blue-600",
//     },
//     {
//       title: "Phản hồi đầy đủ",
//       content: response.raw_response,
//       icon: FileText,
//       color: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {sections.map(
//         (section, index) =>
//           section.content && (
//             <div
//               key={index}
//               className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-700 dark:to-gray-800"
//             >
//               <div className="mb-4 flex items-center space-x-3">
//                 <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-gray-600">
//                   <section.icon className={`h-5 w-5 ${section.color}`} />
//                 </div>
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {section.title}
//                 </h4>
//               </div>

//               <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-600">
//                 <p className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-200">
//                   {section.content}
//                 </p>
//               </div>
//             </div>
//           ),
//       )}
//     </div>
//   );
// };

// const ConversationFlow = ({ agents }) => {
//   return (
//     <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/80">
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-6">
//         <h2 className="flex items-center text-xl font-bold text-white">
//           <Users className="mr-3 h-6 w-6" />
//           Luồng phân tích Multi-Agent
//         </h2>
//         <p className="mt-2 text-white/80">
//           Quá trình tương tác và phản biện giữa các AI agents
//         </p>
//       </div>

//       <div className="p-8">
//         <div className="space-y-6">
//           {agents.map((agent, index) => (
//             <div key={agent.key} className="flex items-start space-x-4">
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`rounded-xl bg-gradient-to-r ${agent.color} p-3 shadow-lg`}
//                 >
//                   <agent.icon className="h-5 w-5 text-white" />
//                 </div>
//                 {index < agents.length - 1 && (
//                   <div className="mt-2 h-12 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700"></div>
//                 )}
//               </div>

//               <div className="flex-1">
//                 <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-700 dark:to-gray-800">
//                   <div className="mb-2 flex items-center justify-between">
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       {agent.name}
//                     </h4>
//                     <DecisionBadge
//                       decision={
//                         agent.response?.decision ||
//                         agent.response?.recommended_decision
//                       }
//                     />
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     {agent.response?.reason ||
//                       agent.response?.critical_response ||
//                       "Không có phản hồi"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const DecisionTab = ({ selectedLoan }) => {
//   const finalDecision = selectedLoan.responses?.final_decision;
//   const ruleBasedData = selectedLoan.rule_based;

//   return (
//     <div className="space-y-8">
//       {/* Final Decision */}
//       <div
//         className={`overflow-hidden rounded-3xl shadow-2xl ${
//           finalDecision?.decision === "approve"
//             ? "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600"
//             : "bg-gradient-to-br from-red-400 via-rose-500 to-pink-600"
//         }`}
//       >
//         <div className="p-8 text-white">
//           <div className="text-center">
//             <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
//               <Zap className="h-10 w-10" />
//             </div>
//             <h2 className="mb-4 text-3xl font-bold">Quyết định cuối cùng</h2>
//             <div className="inline-flex items-center rounded-2xl bg-white/20 px-6 py-3 text-xl font-bold backdrop-blur-sm">
//               {finalDecision?.decision === "approve" ? (
//                 <>
//                   <CheckCircle className="mr-3 h-6 w-6" />
//                   CHẤP THUẬN
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="mr-3 h-6 w-6" />
//                   TỪ CHỐI
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 space-y-6">
//             <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
//               <h3 className="mb-3 text-lg font-semibold">Lý do quyết định:</h3>
//               <p className="leading-relaxed opacity-90">
//                 {finalDecision?.reason || "Không có thông tin"}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//               <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
//                 <div className="text-sm opacity-75">Hybrid Approach</div>
//                 <div className="text-xs font-bold">
//                   {finalDecision?.final_result?.hybrid_approach
//                     ?.replace(/_/g, " ")
//                     .toUpperCase() || "N/A"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Rule-based Analysis */}
//       <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/80">
//         <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-8 py-6">
//           <h2 className="flex items-center text-xl font-bold text-white">
//             <Activity className="mr-3 h-6 w-6" />
//             Phân tích Rule-based
//           </h2>
//         </div>

//         <div className="p-8">
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//             <div className="space-y-4">
//               <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-700 dark:to-gray-800">
//                 <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//                   Tổng quan
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Tổng số tiêu chí đạt:
//                     </span>
//                     <span className="font-semibold">
//                       {ruleBasedData?.total_passed_count}/7
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Vi phạm đặc biệt:
//                     </span>
//                     <span className="font-semibold">
//                       {ruleBasedData?.special_violations_count}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Quyết định:
//                     </span>
//                     <DecisionBadge
//                       decision={ruleBasedData?.rule_based_decision}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-700 dark:to-gray-800">
//                 <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//                   Trạng thái Agent
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Academic Agent:
//                     </span>
//                     <span
//                       className={`font-semibold ${selectedLoan.agent_status?.academic_approve ? "text-green-600" : "text-red-600"}`}
//                     >
//                       {selectedLoan.agent_status?.academic_approve
//                         ? "✓ Chấp thuận"
//                         : "✗ Từ chối"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       Finance Agent:
//                     </span>
//                     <span
//                       className={`font-semibold ${selectedLoan.agent_status?.finance_approve ? "text-green-600" : "text-red-600"}`}
//                     >
//                       {selectedLoan.agent_status?.finance_approve
//                         ? "✓ Chấp thuận"
//                         : "✗ Từ chối"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Features Analysis */}
//           <div className="mt-8">
//             <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
//               Chi tiết các tiêu chí đánh giá
//             </h3>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {Object.entries(ruleBasedData?.features_analysis || {}).map(
//                 ([key, passed]) => (
//                   <div
//                     key={key}
//                     className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         {getFeatureName(key)}
//                       </div>
//                       <div
//                         className={`rounded-full p-1 ${passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
//                       >
//                         {passed ? (
//                           <CheckCircle className="h-4 w-4" />
//                         ) : (
//                           <XCircle className="h-4 w-4" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ),
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getFeatureName = (key) => {
//   const names = {
//     feature_1_thu_nhap: "Thu nhập",
//     feature_2_hoc_luc: "Học lực",
//     feature_3_truong_hoc: "Trường học",
//     feature_4_nganh_uu_tien: "Ngành ưu tiên",
//     feature_5_bao_lanh: "Bảo lãnh",
//     feature_6_khoan_vay: "Khoản vay",
//     feature_7_no_existing_debt: "Không nợ xấu",
//   };
//   return names[key] || key;
// };

// const StatusBadge = ({ status }) => {
//   const getStatusConfig = () => {
//     switch (status) {
//       case "accepted":
//         return {
//           bg: "bg-green-100 dark:bg-green-900/30",
//           text: "text-green-800 dark:text-green-300",
//           icon: CheckCircle,
//           label: "Đã duyệt",
//         };
//       case "pending":
//         return {
//           bg: "bg-yellow-100 dark:bg-yellow-900/30",
//           text: "text-yellow-800 dark:text-yellow-300",
//           icon: Clock,
//           label: "Đang chờ",
//         };
//       case "rejected":
//         return {
//           bg: "bg-red-100 dark:bg-red-900/30",
//           text: "text-red-800 dark:text-red-300",
//           icon: XCircle,
//           label: "Từ chối",
//         };
//       default:
//         return {
//           bg: "bg-gray-100 dark:bg-gray-700",
//           text: "text-gray-800 dark:text-gray-300",
//           icon: AlertCircle,
//           label: "Không xác định",
//         };
//     }
//   };

//   const { bg, text, icon: Icon, label } = getStatusConfig();

//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${bg} ${text}`}
//     >
//       <Icon className="mr-1 h-3 w-3" />
//       {label}
//     </span>
//   );
// };

// const DecisionBadge = ({ decision }) => {
//   const isApprove = decision === "approve";
//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
//         isApprove
//           ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
//           : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
//       }`}
//     >
//       {isApprove ? (
//         <ThumbsUp className="mr-1 h-3 w-3" />
//       ) : (
//         <ThumbsDown className="mr-1 h-3 w-3" />
//       )}
//       {isApprove ? "Chấp thuận" : "Từ chối"}
//     </span>
//   );
// };


