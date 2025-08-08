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
//   ChevronDown,
//   Info,
//   Sparkles,
//   Timer,
//   Badge,
//   MessageCircle,
//   Expand,
//   Download,
//   Share,
//   Filter,
//   Search,
//   Bell,
//   Settings,
//   Maximize2,
//   Copy,
//   RefreshCw,
// } from "lucide-react";

// // Sample data
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
//         "Dựa trên framework tái đánh giá rủi ro, tôi sẽ phân tích lại phản biện của CriticalAgent và các yếu tố liên quan để đưa ra quyết định phú hợp.",
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

// const LoanDetailDashboard = ({ handleBackToList }) => {
//   const [selectedLoan] = useState(sampleLoanData);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [expandedAgent, setExpandedAgent] = useState(null);
//   const [showNotification, setShowNotification] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   // Animation and notification effects
//   useEffect(() => {
//     const timer = setTimeout(() => setShowNotification(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

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

//   const handleCopyLoanId = () => {
//     navigator.clipboard.writeText(selectedLoan.loan_id);
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 3000);
//   };

//   const handleExport = () => {
//     const data = JSON.stringify(selectedLoan, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `loan-${selectedLoan.loan_id.slice(-8)}.json`;
//     a.click();
//   };

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-all duration-500 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
//     >
//       {/* Notification Toast */}
//       {showNotification && (
//         <div className="animate-slide-in-right fixed top-4 right-4 z-50">
//           <div className="flex items-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
//             <CheckCircle className="h-4 w-4" />
//             <span>Loan ID copied to clipboard!</span>
//           </div>
//         </div>
//       )}

//       <div className="mx-auto max-w-7xl p-4">
//         {/* Enhanced Header */}
//         <EnhancedHeader
//           selectedLoan={selectedLoan}
//           formatCurrency={formatCurrency}
//           formatDate={formatDate}
//           onCopyLoanId={handleCopyLoanId}
//           onExport={handleExport}
//           isFullscreen={isFullscreen}
//           onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
//         />

//         {/* Enhanced Tab Navigation */}
//         <EnhancedTabNavigation
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           selectedLoan={selectedLoan}
//         />

//         {/* Content with smooth transitions */}
//         <div className="space-y-6">
//           <div
//             className={`transition-all duration-500 ease-in-out ${
//               activeTab === "overview"
//                 ? "translate-y-0 opacity-100"
//                 : "hidden translate-y-4 opacity-0"
//             }`}
//           >
//             {activeTab === "overview" && (
//               <EnhancedOverviewSection
//                 selectedLoan={selectedLoan}
//                 formatCurrency={formatCurrency}
//               />
//             )}
//           </div>

//           <div
//             className={`transition-all duration-500 ease-in-out ${
//               activeTab === "rule-based"
//                 ? "translate-y-0 opacity-100"
//                 : "hidden translate-y-4 opacity-0"
//             }`}
//           >
//             {activeTab === "rule-based" && (
//               <EnhancedRuleBasedSection selectedLoan={selectedLoan} />
//             )}
//           </div>

//           <div
//             className={`transition-all duration-500 ease-in-out ${
//               activeTab === "agents"
//                 ? "translate-y-0 opacity-100"
//                 : "hidden translate-y-4 opacity-0"
//             }`}
//           >
//             {activeTab === "agents" && (
//               <EnhancedAgentOpinionsSection selectedLoan={selectedLoan} />
//             )}
//           </div>

//           <div
//             className={`transition-all duration-500 ease-in-out ${
//               activeTab === "debate"
//                 ? "translate-y-0 opacity-100"
//                 : "hidden translate-y-4 opacity-0"
//             }`}
//           >
//             {activeTab === "debate" && (
//               <div className="space-y-8">
//                 <EnhancedDebateSection
//                   selectedLoan={selectedLoan}
//                   expandedAgent={expandedAgent}
//                   setExpandedAgent={setExpandedAgent}
//                 />
//                 <EnhancedDecisionMatrix selectedLoan={selectedLoan} />
//                 <EnhancedRiskAssessmentChart selectedLoan={selectedLoan} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Header with new features
// const EnhancedHeader = ({
//   selectedLoan,
//   formatCurrency,
//   formatDate,
//   onCopyLoanId,
//   onExport,
//   isFullscreen,
//   onToggleFullscreen,
// }) => (
//   <div className="mb-8">
//     <div className="mb-6 flex items-center justify-between">
//       <button className="flex items-center text-indigo-600 transition-all hover:translate-x-1 hover:text-indigo-800">
//         <ArrowLeft className="mr-2 h-5 w-5" />
//         <span className="font-medium">Quay lại danh sách</span>
//       </button>

//       {/* Action buttons */}
//       <div className="flex items-center space-x-3">
//         <button
//           onClick={onToggleFullscreen}
//           className="rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl"
//         >
//           <Maximize2 className="h-5 w-5 text-gray-600" />
//         </button>
//         <button
//           onClick={onExport}
//           className="rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl"
//         >
//           <Download className="h-5 w-5 text-gray-600" />
//         </button>
//         <button className="rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
//           <Share className="h-5 w-5 text-gray-600" />
//         </button>
//         <button className="rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
//           <Bell className="h-5 w-5 text-gray-600" />
//         </button>
//       </div>
//     </div>

//     <div className="rounded-3xl border border-white/20 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl">
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
//         {/* Enhanced Loan ID & Status */}
//         <div className="lg:col-span-2">
//           <div className="mb-4 flex items-center space-x-4">
//             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
//               <FileText className="h-7 w-7 text-white" />
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center space-x-2">
//                 <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
//                   Hợp đồng #{selectedLoan.loan_id.slice(-8)}
//                 </h1>
//                 <button
//                   onClick={onCopyLoanId}
//                   className="rounded p-1 transition-colors hover:bg-gray-100"
//                 >
//                   <Copy className="h-4 w-4 text-gray-400" />
//                 </button>
//               </div>
//               <p className="font-medium text-gray-600">
//                 Sinh viên: {selectedLoan.studentInfo?.name}
//               </p>
//               <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
//                 <GraduationCap className="h-4 w-4" />
//                 <span>{selectedLoan.studentInfo?.university}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <EnhancedFinalDecisionBadge decision={selectedLoan.decision} />
//             <div className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
//               <Timer className="mr-1 h-4 w-4" />
//               <span className="font-medium">
//                 {selectedLoan.processing_time}s
//               </span>
//             </div>
//             <div className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
//               <Activity className="mr-1 h-4 w-4" />
//               <span className="font-medium">Active</span>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Amount Display */}
//         <div className="text-center lg:text-left">
//           <div className="mb-2 text-sm font-medium text-gray-500">
//             Số tiền vay
//           </div>
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
//             {formatCurrency(selectedLoan.loan_amount_requested)}
//           </div>
//           <div className="mt-1 text-sm text-gray-500">
//             <span className="inline-flex items-center">
//               <CreditCard className="mr-1 h-3 w-3" />
//               Trả/tháng: {formatCurrency(selectedLoan.monthly_installment)}
//             </span>
//           </div>
//           <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
//             <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//           </div>
//         </div>

//         {/* Enhanced Date Info */}
//         <div className="text-center lg:text-left">
//           <div className="mb-2 text-sm font-medium text-gray-500">Ngày tạo</div>
//           <div className="text-lg font-semibold text-gray-900">
//             {formatDate(selectedLoan.created_at)}
//           </div>
//           <div className="mt-2 flex items-center justify-center lg:justify-start">
//             <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
//               {loanPurposes[selectedLoan.loan_purpose]}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Enhanced Tab Navigation with indicators
// const EnhancedTabNavigation = ({ activeTab, setActiveTab, selectedLoan }) => {
//   const tabs = [
//     {
//       key: "overview",
//       label: "📋 Tổng quan",
//       icon: Eye,
//       count: null,
//     },
//     {
//       key: "rule-based",
//       label: "⚖️ Rule-based",
//       icon: Calculator,
//       count: selectedLoan.rule_based?.total_passed_count,
//     },
//     {
//       key: "agents",
//       label: "🤖 Agent Opinions",
//       icon: Bot,
//       count: 2,
//     },
//     {
//       key: "debate",
//       label: "🧠 Phản biện",
//       icon: MessageSquare,
//       count: Object.keys(selectedLoan.responses || {}).filter((key) =>
//         key.includes("critical"),
//       ).length,
//     },
//   ];

//   return (
//     <div className="mb-8">
//       <div className="flex justify-center">
//         <div className="flex flex-row gap-2 rounded-2xl border border-white/20 bg-white/90 p-2 shadow-xl backdrop-blur-sm">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`relative flex items-center rounded-xl px-6 py-4 text-sm font-medium transition-all duration-300 ${
//                 activeTab === tab.key
//                   ? "scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
//                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//               }`}
//             >
//               <tab.icon className="mr-2 h-5 w-5" />
//               <span>{tab.label}</span>
//               {tab.count && (
//                 <span
//                   className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${
//                     activeTab === tab.key
//                       ? "bg-white/20 text-white"
//                       : "bg-indigo-100 text-indigo-800"
//                   }`}
//                 >
//                   {tab.count}
//                 </span>
//               )}
//               {activeTab === tab.key && (
//                 <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-white"></div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Overview Section with interactive cards
// const EnhancedOverviewSection = ({ selectedLoan, formatCurrency }) => (
//   <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//     {/* Enhanced Student Info */}
//     <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg transition-all duration-300 hover:shadow-xl lg:col-span-2">
//       <h2 className="mb-6 flex items-center text-xl font-bold text-gray-900">
//         <div className="mr-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
//           <User className="h-5 w-5 text-white" />
//         </div>
//         Thông tin sinh viên
//       </h2>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         {[
//           {
//             label: "Họ tên",
//             value: selectedLoan.studentInfo?.name,
//             icon: User,
//             color: "from-blue-400 to-blue-600",
//           },
//           {
//             label: "Mã SV",
//             value: selectedLoan.student_id,
//             icon: Badge,
//             color: "from-green-400 to-green-600",
//           },
//           {
//             label: "GPA",
//             value: `${selectedLoan.studentInfo?.gpa}/4.0`,
//             icon: BarChart3,
//             color: "from-yellow-400 to-orange-600",
//           },
//           {
//             label: "Trường",
//             value: selectedLoan.studentInfo?.university,
//             icon: GraduationCap,
//             color: "from-purple-400 to-purple-600",
//           },
//           {
//             label: "Khoa",
//             value: selectedLoan.studentInfo?.faculty,
//             icon: Layers,
//             color: "from-indigo-400 to-indigo-600",
//           },
//           {
//             label: "Ngành",
//             value: selectedLoan.studentInfo?.major,
//             icon: Target,
//             color: "from-pink-400 to-pink-600",
//           },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center space-x-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
//           >
//             <div
//               className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}
//             >
//               <item.icon className="h-5 w-5 text-white" />
//             </div>
//             <div className="flex-1">
//               <div className="text-sm font-medium text-gray-500">
//                 {item.label}
//               </div>
//               <div className="font-semibold text-gray-900">{item.value}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Enhanced Final Decision */}
//     <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
//       <h2 className="mb-6 flex items-center text-xl font-bold text-gray-900">
//         <div className="mr-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 p-2">
//           <Zap className="h-5 w-5 text-white" />
//         </div>
//         Quyết định cuối cùng
//       </h2>

//       <div className="space-y-4">
//         <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4">
//           <div className="mb-2 text-sm font-medium text-gray-500">Lý do:</div>
//           <p className="text-sm leading-relaxed text-gray-900">
//             {selectedLoan.responses?.final_decision?.reason}
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
//             <div className="mb-1 text-sm font-medium text-green-600">
//               Rule-based
//             </div>
//             <div className="text-lg font-bold text-green-700">
//               {selectedLoan.responses?.final_decision?.final_result
//                 ?.rule_based_pass
//                 ? "✓ PASS"
//                 : "✗ FAIL"}
//             </div>
//           </div>
//           <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
//             <div className="mb-1 text-sm font-medium text-blue-600">
//               Agent Support
//             </div>
//             <div className="text-lg font-bold text-blue-700">
//               {selectedLoan.responses?.final_decision?.final_result
//                 ?.agent_support_available
//                 ? "✓ Có"
//                 : "✗ Không"}
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex items-center justify-between text-sm">
//             <span className="text-gray-500">Confidence Score</span>
//             <span className="font-bold text-indigo-600">87%</span>
//           </div>
//           <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
//             <div className="h-2 w-[87%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Enhanced Rule-based Section with animations
// const EnhancedRuleBasedSection = ({ selectedLoan }) => {
//   const ruleData = selectedLoan.rule_based;

//   return (
//     <div className="rounded-2xl border border-white/20 bg-white/90 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
//       <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900">
//         <div className="mr-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
//           <Calculator className="h-6 w-6 text-white" />
//         </div>
//         Phân tích Rule-based System
//       </h2>

//       {/* Enhanced Summary Cards */}
//       <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
//         <div className="rounded-xl bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
//           <div className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
//             {ruleData?.total_passed_count}/7
//           </div>
//           <div className="font-semibold text-blue-800">Tiêu chí đạt</div>
//           <div className="mt-2 h-2 w-full rounded-full bg-blue-200">
//             <div
//               className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
//               style={{ width: `${(ruleData?.total_passed_count / 7) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         <div className="rounded-xl bg-gradient-to-br from-red-50 via-red-100 to-rose-100 p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
//           <div className="mb-2 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-4xl font-bold text-transparent">
//             {ruleData?.special_violations_count}
//           </div>
//           <div className="font-semibold text-red-800">Vi phạm đặc biệt</div>
//           <div className="mt-2 flex justify-center">
//             {ruleData?.special_violations_count === 0 ? (
//               <CheckCircle className="h-6 w-6 text-green-500" />
//             ) : (
//               <XCircle className="h-6 w-6 text-red-500" />
//             )}
//           </div>
//         </div>

//         <div className="rounded-xl bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
//           <div className="mb-3">
//             <EnhancedFinalDecisionBadge
//               decision={ruleData?.rule_based_decision}
//             />
//           </div>
//           <div className="font-semibold text-green-800">Quyết định</div>
//           <div className="mt-2 flex justify-center">
//             <div className="rounded-full bg-green-200 p-2">
//               <Sparkles className="h-4 w-4 text-green-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Features Analysis */}
//       <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
//         <Target className="mr-2 h-5 w-5 text-indigo-600" />
//         Chi tiết các tiêu chí
//       </h3>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {Object.entries(ruleData?.features_analysis || {}).map(
//           ([key, passed], index) => (
//             <EnhancedFeatureCard
//               key={key}
//               featureKey={key}
//               passed={passed}
//               index={index}
//             />
//           ),
//         )}
//       </div>

//       {/* Rule Summary */}
//       <div className="mt-8 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
//         <h4 className="mb-3 flex items-center font-bold text-indigo-900">
//           <Info className="mr-2 h-5 w-5" />
//           Tóm tắt đánh giá
//         </h4>
//         <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
//           <div>
//             <span className="font-medium text-indigo-600">Tổng điểm:</span>
//             <span className="ml-2 font-bold text-indigo-900">
//               {ruleData?.total_passed_count}/7 (
//               {Math.round((ruleData?.total_passed_count / 7) * 100)}%)
//             </span>
//           </div>
//           <div>
//             <span className="font-medium text-indigo-600">Trạng thái:</span>
//             <span className="ml-2 font-bold text-indigo-900">
//               {ruleData?.rule_based_decision === "approve"
//                 ? "✅ Đạt yêu cầu"
//                 : "❌ Không đạt"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EnhancedFeatureCard = ({ featureKey, passed, index }) => {
//   const getFeatureInfo = (key) => {
//     const features = {
//       feature_1_thu_nhap: {
//         name: "Thu nhập",
//         icon: DollarSign,
//         description: "Đánh giá khả năng tài chính",
//         color: passed
//           ? "from-green-400 to-green-600"
//           : "from-red-400 to-red-600",
//       },
//       feature_2_hoc_luc: {
//         name: "Học lực",
//         icon: GraduationCap,
//         description: "Kết quả học tập",
//         color: passed ? "from-blue-400 to-blue-600" : "from-red-400 to-red-600",
//       },
//       feature_3_truong_hoc: {
//         name: "Trường học",
//         icon: Target,
//         description: "Uy tín trường đại học",
//         color: passed
//           ? "from-purple-400 to-purple-600"
//           : "from-red-400 to-red-600",
//       },
//       feature_4_nganh_uu_tien: {
//         name: "Ngành ưu tiên",
//         icon: Sparkles,
//         description: "Ngành nghề được ưu tiên",
//         color: passed
//           ? "from-yellow-400 to-orange-600"
//           : "from-red-400 to-red-600",
//       },
//       feature_5_bao_lanh: {
//         name: "Bảo lãnh",
//         icon: Shield,
//         description: "Có người bảo lãnh",
//         color: passed
//           ? "from-indigo-400 to-indigo-600"
//           : "from-red-400 to-red-600",
//       },
//       feature_6_khoan_vay: {
//         name: "Khoản vay",
//         icon: Calculator,
//         description: "Mức vay phù hợp",
//         color: passed ? "from-teal-400 to-teal-600" : "from-red-400 to-red-600",
//       },
//       feature_7_no_existing_debt: {
//         name: "Không nợ xấu",
//         icon: CheckCircle,
//         description: "Lịch sử tín dụng tốt",
//         color: passed
//           ? "from-green-400 to-emerald-600"
//           : "from-red-400 to-red-600",
//       },
//     };
//     return (
//       features[key] || {
//         name: key,
//         icon: AlertCircle,
//         description: "",
//         color: "from-gray-400 to-gray-600",
//       }
//     );
//   };

//   const feature = getFeatureInfo(featureKey);

//   return (
//     <div
//       className={`rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
//         passed
//           ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-green-100"
//           : "border-red-200 bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-red-100"
//       }`}
//       style={{ animationDelay: `${index * 100}ms` }}
//     >
//       <div className="mb-3 flex items-start justify-between">
//         <div
//           className={`rounded-lg bg-gradient-to-r p-2 ${feature.color} shadow-lg`}
//         >
//           <feature.icon className="h-5 w-5 text-white" />
//         </div>
//         <div
//           className={`rounded-full p-1 ${
//             passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
//           }`}
//         >
//           {passed ? (
//             <CheckCircle className="h-5 w-5" />
//           ) : (
//             <XCircle className="h-5 w-5" />
//           )}
//         </div>
//       </div>

//       <div>
//         <div
//           className={`mb-1 font-semibold ${passed ? "text-green-800" : "text-red-800"}`}
//         >
//           {feature.name}
//         </div>
//         <p className="text-xs text-gray-600">{feature.description}</p>
//       </div>
//     </div>
//   );
// };

// // Enhanced Agent Opinions Section
// const EnhancedAgentOpinionsSection = ({ selectedLoan }) => (
//   <div className="space-y-6">
//     <div className="rounded-2xl border border-white/20 bg-white/90 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
//       <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900">
//         <div className="mr-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
//           <Bot className="h-6 w-6 text-white" />
//         </div>
//         Ý kiến từ các AI Agent
//       </h2>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         {/* Enhanced Academic Agent */}
//         <EnhancedAgentCard
//           name="Academic Agent"
//           icon={Brain}
//           decision={selectedLoan.responses?.academic_repredict?.decision}
//           reason={selectedLoan.responses?.academic_repredict?.reason}
//           color="from-blue-500 via-indigo-500 to-purple-600"
//           status={selectedLoan.agent_status?.academic_approve}
//           specialty="Đánh giá học tập"
//           confidence={78}
//         />

//         {/* Enhanced Finance Agent */}
//         <EnhancedAgentCard
//           name="Finance Agent"
//           icon={TrendingUp}
//           decision={selectedLoan.responses?.finance_repredict?.decision}
//           reason={selectedLoan.responses?.finance_repredict?.reason}
//           color="from-green-500 via-emerald-500 to-teal-600"
//           status={selectedLoan.agent_status?.finance_approve}
//           specialty="Phân tích tài chính"
//           confidence={82}
//         />
//       </div>

//       {/* Enhanced Agent Status Summary */}
//       <div className="mt-8 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6">
//         <h3 className="mb-4 flex items-center font-bold text-gray-900">
//           <Activity className="mr-2 h-5 w-5 text-blue-600" />
//           Tóm tắt trạng thái Agent
//         </h3>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
//             <span className="font-medium text-gray-600">
//               Ít nhất 1 agent chấp thuận:
//             </span>
//             <span
//               className={`flex items-center font-bold ${selectedLoan.agent_status?.at_least_one_agent_approve ? "text-green-600" : "text-red-600"}`}
//             >
//               {selectedLoan.agent_status?.at_least_one_agent_approve ? (
//                 <>
//                   <CheckCircle className="mr-1 h-4 w-4" /> Có
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="mr-1 h-4 w-4" /> Không
//                 </>
//               )}
//             </span>
//           </div>
//           <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
//             <span className="font-medium text-gray-600">
//               Cả 2 điều kiện đạt:
//             </span>
//             <span
//               className={`flex items-center font-bold ${selectedLoan.agent_status?.both_conditions_met ? "text-green-600" : "text-red-600"}`}
//             >
//               {selectedLoan.agent_status?.both_conditions_met ? (
//                 <>
//                   <CheckCircle className="mr-1 h-4 w-4" /> Có
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="mr-1 h-4 w-4" /> Không
//                 </>
//               )}
//             </span>
//           </div>
//           <div className="flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white">
//             <span className="font-bold">Consensus Score: 80%</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const EnhancedAgentCard = ({
//   name,
//   icon: Icon,
//   decision,
//   reason,
//   color,
//   status,
//   specialty,
//   confidence,
// }) => (
//   <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
//     <div className="mb-4 flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <div
//           className={`h-12 w-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}
//         >
//           <Icon className="h-6 w-6 text-white" />
//         </div>
//         <div>
//           <h3 className="font-bold text-gray-900">{name}</h3>
//           <div className="text-sm text-gray-500">{specialty}</div>
//           <div className="text-xs text-gray-400">
//             Trạng thái: {status ? "✅ Chấp thuận" : "❌ Từ chối"}
//           </div>
//         </div>
//       </div>
//       <div className="text-right">
//         <EnhancedDecisionBadge decision={decision} />
//         <div className="mt-2 text-xs text-gray-500">
//           Confidence: {confidence}%
//         </div>
//       </div>
//     </div>

//     <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4">
//       <p className="text-sm leading-relaxed text-gray-700">{reason}</p>
//     </div>

//     {/* Confidence bar */}
//     <div className="mt-3">
//       <div className="mb-1 flex justify-between text-xs text-gray-500">
//         <span>Confidence Level</span>
//         <span>{confidence}%</span>
//       </div>
//       <div className="h-2 w-full rounded-full bg-gray-200">
//         <div
//           className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-1000`}
//           style={{ width: `${confidence}%` }}
//         ></div>
//       </div>
//     </div>
//   </div>
// );

// // Enhanced Debate Section with more interactive features
// const EnhancedDebateSection = ({
//   selectedLoan,
//   expandedAgent,
//   setExpandedAgent,
// }) => {
//   const [sortBy, setSortBy] = useState("severity");
//   const [filterBy, setFilterBy] = useState("all");

//   const criticalAgents = [
//     {
//       key: "critical_academic",
//       name: "Critical Academic Agent",
//       avatar: "🎓",
//       color: "from-orange-500 via-red-500 to-pink-500",
//       data: selectedLoan.responses?.critical_academic,
//       severity: "high",
//       category: "academic",
//     },
//     {
//       key: "critical_finance",
//       name: "Critical Finance Agent",
//       avatar: "💰",
//       color: "from-purple-500 via-pink-500 to-red-500",
//       data: selectedLoan.responses?.critical_finance,
//       severity: "medium",
//       category: "finance",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="rounded-2xl border border-white/20 bg-white/90 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
//         <div className="mb-8 flex items-center justify-between">
//           <h2 className="flex items-center text-2xl font-bold text-gray-900">
//             <div className="mr-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 p-2">
//               <MessageSquare className="h-6 w-6 text-white" />
//             </div>
//             🧠 Phản biện từ Critical Agents
//           </h2>

//           {/* Filter and Sort Controls */}
//           <div className="flex items-center space-x-3">
//             <select
//               value={filterBy}
//               onChange={(e) => setFilterBy(e.target.value)}
//               className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="all">All Categories</option>
//               <option value="academic">Academic</option>
//               <option value="finance">Finance</option>
//             </select>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="severity">By Severity</option>
//               <option value="name">By Name</option>
//             </select>
//           </div>
//         </div>

//         <p className="mb-8 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-lg text-gray-600">
//           Dưới đây là các ý kiến phản biện từ các AI agent chuyên phụ trách đánh
//           giá rủi ro và thách thức quyết định ban đầu:
//         </p>

//         {/* Enhanced Chat-like interface */}
//         <div className="space-y-6">
//           {criticalAgents
//             .filter(
//               (agent) => filterBy === "all" || agent.category === filterBy,
//             )
//             .sort((a, b) => {
//               if (sortBy === "severity") {
//                 const severityOrder = { high: 3, medium: 2, low: 1 };
//                 return severityOrder[b.severity] - severityOrder[a.severity];
//               }
//               return a.name.localeCompare(b.name);
//             })
//             .map((agent) => (
//               <EnhancedCriticalAgentCard
//                 key={agent.key}
//                 agent={agent}
//                 isExpanded={expandedAgent === agent.key}
//                 onToggleExpand={() =>
//                   setExpandedAgent(
//                     expandedAgent === agent.key ? null : agent.key,
//                   )
//                 }
//               />
//             ))}
//         </div>

//         {/* Enhanced Conclusion */}
//         <div className="mt-8 rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 p-6 transition-all duration-300 hover:shadow-lg">
//           <h3 className="mb-4 flex items-center font-bold text-gray-900">
//             <div className="mr-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
//               <Target className="h-4 w-4 text-white" />
//             </div>
//             Kết luận sau phản biện
//           </h3>
//           <p className="mb-4 leading-relaxed text-gray-700">
//             Mặc dù có sự phản đối từ các Critical Agent về các rủi ro tiềm ẩn,
//             hệ thống cuối cùng vẫn{" "}
//             <strong className="text-green-600">CHẤP THUẬN</strong> khoản vay dựa
//             trên:
//           </p>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
//               <div className="text-sm font-medium text-blue-600">
//                 Rule-based system
//               </div>
//               <div className="text-lg font-bold text-blue-800">
//                 6/7 tiêu chí đạt
//               </div>
//             </div>
//             <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm">
//               <div className="text-sm font-medium text-green-600">
//                 Vi phạm đặc biệt
//               </div>
//               <div className="text-lg font-bold text-green-800">0 vi phạm</div>
//             </div>
//             <div className="rounded-lg border border-purple-200 bg-white p-4 shadow-sm">
//               <div className="text-sm font-medium text-purple-600">
//                 Approach
//               </div>
//               <div className="text-sm font-bold text-purple-800">
//                 Hybrid Decision
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EnhancedCriticalAgentCard = ({ agent, isExpanded, onToggleExpand }) => (
//   <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
//     {/* Enhanced Agent Header */}
//     <div
//       className={`bg-gradient-to-r ${agent.color} relative overflow-hidden p-6`}
//     >
//       <div className="absolute inset-0 bg-black/10"></div>
//       <div className="relative flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-2xl backdrop-blur-sm">
//             {agent.avatar}
//           </div>
//           <div>
//             <h3 className="text-lg font-bold text-white">{agent.name}</h3>
//             <div className="flex items-center text-sm text-white/90">
//               <Shield className="mr-1 h-4 w-4" />
//               Vai trò: Phản biện & Đánh giá rủi ro
//             </div>
//             <div className="mt-1 flex items-center space-x-2">
//               <span
//                 className={`rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white`}
//               >
//                 {agent.severity === "high" ? "🔴 High Risk" : "🟡 Medium Risk"}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center space-x-3">
//           <EnhancedDecisionBadge decision={agent.data?.recommended_decision} />
//           <button
//             onClick={onToggleExpand}
//             className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30"
//           >
//             <ChevronDown
//               className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
//             />
//           </button>
//         </div>
//       </div>
//     </div>

//     {/* Enhanced Agent Content */}
//     <div className="p-6">
//       {/* Critical Response */}
//       <div className="mb-6">
//         <h4 className="mb-3 flex items-center font-semibold text-gray-900">
//           <div className="mr-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-1">
//             <MessageCircle className="h-4 w-4 text-white" />
//           </div>
//           Phản biện chính
//         </h4>
//         <div className="rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-4 transition-all duration-300 hover:shadow-md">
//           <p className="leading-relaxed font-medium text-red-800">
//             {agent.data?.critical_response}
//           </p>
//         </div>
//       </div>

//       {/* Impact Assessment */}
//       <div className="mb-4">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="rounded-lg bg-gray-50 p-3 text-center">
//             <div className="text-sm text-gray-500">Impact Level</div>
//             <div className="font-bold text-red-600">
//               {agent.severity === "high" ? "HIGH" : "MEDIUM"}
//             </div>
//           </div>
//           <div className="rounded-lg bg-gray-50 p-3 text-center">
//             <div className="text-sm text-gray-500">Category</div>
//             <div className="font-bold text-blue-600 capitalize">
//               {agent.category}
//             </div>
//           </div>
//           <div className="rounded-lg bg-gray-50 p-3 text-center">
//             <div className="text-sm text-gray-500">Urgency</div>
//             <div className="font-bold text-orange-600">REVIEW</div>
//           </div>
//         </div>
//       </div>

//       {/* Expanded Content */}
//       {isExpanded && (
//         <div className="animate-slide-down space-y-6">
//           {/* Raw Response */}
//           <div>
//             <h4 className="mb-3 flex items-center font-semibold text-gray-900">
//               <FileText className="mr-2 h-4 w-4 text-gray-600" />
//               Chi tiết phản biện
//             </h4>
//             <div className="rounded-xl bg-gray-900 p-4 shadow-inner">
//               <pre className="font-mono text-sm whitespace-pre-wrap text-green-400">
//                 {agent.data?.raw_response}
//               </pre>
//             </div>
//           </div>

//           {/* Risk Factors */}
//           <div>
//             <h4 className="mb-3 flex items-center font-semibold text-gray-900">
//               <AlertCircle className="mr-2 h-4 w-4 text-orange-600" />
//               Các yếu tố rủi ro được xác định
//             </h4>
//             <div className="space-y-2">
//               {agent.category === "academic"
//                 ? [
//                     "Khả năng duy trì GPA trong tương lai",
//                     "Áp lực học tập gia tăng",
//                     "Rủi ro thay đổi chuyên ngành",
//                   ]
//                 : [
//                     "Biến động thu nhập không lường trước",
//                     "Khả năng mất việc làm",
//                     "Rủi ro kinh tế vĩ mô",
//                   ].map((risk, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center space-x-3 rounded-lg border border-orange-200 bg-orange-50 p-3"
//                     >
//                       <AlertCircle className="h-4 w-4 flex-shrink-0 text-orange-600" />
//                       <span className="text-sm text-orange-800">{risk}</span>
//                     </div>
//                   ))}
//             </div>
//           </div>

//           {/* Enhanced Admin Comment Section */}
//           <EnhancedAdminCommentSection agentKey={agent.key} />
//         </div>
//       )}
//     </div>
//   </div>
// );

// // Enhanced Admin Comment Component with better UX
// const EnhancedAdminCommentSection = ({ agentKey }) => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       text: "Cần xem xét thêm về khả năng sinh viên duy trì GPA trong năm cuối",
//       timestamp: "2025-08-07 12:30",
//       author: "Admin Nguyễn Minh",
//       type: "warning",
//     },
//     {
//       id: 2,
//       text: "Đã xác nhận thông tin bảo lãnh, có thể giảm thiểu rủi ro",
//       timestamp: "2025-08-07 12:45",
//       author: "Admin Trần Hoa",
//       type: "info",
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleAddComment = () => {
//     if (comment.trim()) {
//       const newComment = {
//         id: Date.now(),
//         text: comment,
//         timestamp: new Date().toLocaleString("vi-VN"),
//         author: "Admin Current User",
//         type: "info",
//       };
//       setComments([...comments, newComment]);
//       setComment("");
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="border-t pt-6">
//       <h4 className="mb-4 flex items-center font-semibold text-gray-900">
//         <div className="mr-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-1">
//           <MessageSquare className="h-4 w-4 text-white" />
//         </div>
//         Phản hồi của Admin ({comments.length})
//       </h4>

//       {/* Enhanced Comments Display */}
//       <div className="mb-6 max-h-60 space-y-3 overflow-y-auto">
//         {comments.map((commentItem) => (
//           <div
//             key={commentItem.id}
//             className={`rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
//               commentItem.type === "warning"
//                 ? "border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50"
//                 : "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50"
//             }`}
//           >
//             <div className="flex items-start space-x-3">
//               <div
//                 className={`rounded-full p-1 ${
//                   commentItem.type === "warning"
//                     ? "bg-yellow-200"
//                     : "bg-blue-200"
//                 }`}
//               >
//                 {commentItem.type === "warning" ? (
//                   <AlertCircle className="h-3 w-3 text-yellow-600" />
//                 ) : (
//                   <Info className="h-3 w-3 text-blue-600" />
//                 )}
//               </div>
//               <div className="flex-1">
//                 <p
//                   className={`text-sm leading-relaxed ${
//                     commentItem.type === "warning"
//                       ? "text-yellow-800"
//                       : "text-blue-800"
//                   }`}
//                 >
//                   {commentItem.text}
//                 </p>
//                 <div className="mt-2 flex items-center justify-between text-xs">
//                   <span
//                     className={`font-medium ${
//                       commentItem.type === "warning"
//                         ? "text-yellow-700"
//                         : "text-blue-700"
//                     }`}
//                   >
//                     {commentItem.author}
//                   </span>
//                   <span
//                     className={`${
//                       commentItem.type === "warning"
//                         ? "text-yellow-600"
//                         : "text-blue-600"
//                     }`}
//                   >
//                     {commentItem.timestamp}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Enhanced Comment Input */}
//       <div className="space-y-3">
//         <div className="flex space-x-3">
//           <div className="relative flex-1">
//             <textarea
//               value={comment}
//               onChange={(e) => {
//                 setComment(e.target.value);
//                 setIsTyping(e.target.value.length > 0);
//               }}
//               placeholder="Nhập phản hồi của bạn..."
//               className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
//               rows="3"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleAddComment();
//                 }
//               }}
//             />
//             {isTyping && (
//               <div className="absolute right-2 bottom-2 text-xs text-gray-400">
//                 Press Enter to send, Shift+Enter for new line
//               </div>
//             )}
//           </div>
//           <button
//             onClick={handleAddComment}
//             disabled={!comment.trim()}
//             className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <div className="flex items-center space-x-2">
//               <span>Gửi</span>
//               <ChevronRight className="h-4 w-4" />
//             </div>
//           </button>
//         </div>

//         {/* Quick Actions */}
//         <div className="flex items-center space-x-2">
//           <span className="text-xs text-gray-500">Quick actions:</span>
//           {[
//             "✅ Approved",
//             "⚠️ Needs Review",
//             "❌ Rejected",
//             "📝 Additional Info Needed",
//           ].map((action) => (
//             <button
//               key={action}
//               onClick={() => setComment(action)}
//               className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
//             >
//               {action}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Decision Matrix with better visualization
// const EnhancedDecisionMatrix = ({ selectedLoan }) => (
//   <div className="mt-8 rounded-2xl border border-white/20 bg-white/90 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
//     <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900">
//       <div className="mr-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
//         <Activity className="h-6 w-6 text-white" />
//       </div>
//       🔄 Ma trận So sánh Quyết định
//     </h2>

//     {/* Summary Cards */}
//     <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
//       <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
//         <div className="text-sm font-medium text-blue-600">Total Agents</div>
//         <div className="text-2xl font-bold text-blue-800">4</div>
//       </div>
//       <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
//         <div className="text-sm font-medium text-green-600">Approvals</div>
//         <div className="text-2xl font-bold text-green-800">2</div>
//       </div>
//       <div className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-4">
//         <div className="text-sm font-medium text-red-600">Rejections</div>
//         <div className="text-2xl font-bold text-red-800">2</div>
//       </div>
//       <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
//         <div className="text-sm font-medium text-yellow-600">Conflicts</div>
//         <div className="text-2xl font-bold text-yellow-800">2</div>
//       </div>
//     </div>

//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse overflow-hidden rounded-xl bg-white shadow-lg">
//         <thead>
//           <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
//             <th className="p-4 text-left font-bold">Agent</th>
//             <th className="p-4 text-center font-bold">Quyết định</th>
//             <th className="p-4 text-left font-bold">Lý do chính</th>
//             <th className="p-4 text-center font-bold">Confidence</th>
//             <th className="p-4 text-center font-bold">Conflict</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Academic Agent */}
//           <tr className="border-b border-gray-100 transition-colors hover:bg-blue-50">
//             <td className="p-4">
//               <div className="flex items-center space-x-3">
//                 <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
//                   <Brain className="h-5 w-5 text-white" />
//                 </div>
//                 <div>
//                   <span className="font-medium">Academic Agent</span>
//                   <div className="text-xs text-gray-500">
//                     Learning Assessment
//                   </div>
//                 </div>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <EnhancedDecisionBadge
//                 decision={selectedLoan.responses?.academic_repredict?.decision}
//               />
//             </td>
//             <td className="max-w-xs p-4 text-sm text-gray-700">
//               <div
//                 className="truncate"
//                 title={selectedLoan.responses?.academic_repredict?.reason}
//               >
//                 {selectedLoan.responses?.academic_repredict?.reason}
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <div className="flex items-center justify-center">
//                 <div className="mr-2 h-2 w-16 rounded-full bg-gray-200">
//                   <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
//                 </div>
//                 <span className="text-sm font-medium">78%</span>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <EnhancedConflictIndicator
//                 agentDecision={
//                   selectedLoan.responses?.academic_repredict?.decision
//                 }
//                 criticalDecision={
//                   selectedLoan.responses?.critical_academic
//                     ?.recommended_decision
//                 }
//               />
//             </td>
//           </tr>

//           {/* Finance Agent */}
//           <tr className="border-b border-gray-100 transition-colors hover:bg-green-50">
//             <td className="p-4">
//               <div className="flex items-center space-x-3">
//                 <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-2">
//                   <TrendingUp className="h-5 w-5 text-white" />
//                 </div>
//                 <div>
//                   <span className="font-medium">Finance Agent</span>
//                   <div className="text-xs text-gray-500">
//                     Financial Analysis
//                   </div>
//                 </div>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <EnhancedDecisionBadge
//                 decision={selectedLoan.responses?.finance_repredict?.decision}
//               />
//             </td>
//             <td className="max-w-xs p-4 text-sm text-gray-700">
//               <div
//                 className="truncate"
//                 title={selectedLoan.responses?.finance_repredict?.reason}
//               >
//                 {selectedLoan.responses?.finance_repredict?.reason}
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <div className="flex items-center justify-center">
//                 <div className="mr-2 h-2 w-16 rounded-full bg-gray-200">
//                   <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
//                 </div>
//                 <span className="text-sm font-medium">82%</span>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <EnhancedConflictIndicator
//                 agentDecision={
//                   selectedLoan.responses?.finance_repredict?.decision
//                 }
//                 criticalDecision={
//                   selectedLoan.responses?.critical_finance?.recommended_decision
//                 }
//               />
//             </td>
//           </tr>

//           {/* Critical Academic */}
//           <tr className="border-b border-red-200 bg-gradient-to-r from-red-50 to-rose-50 transition-colors hover:from-red-100 hover:to-rose-100">
//             <td className="p-4">
//               <div className="flex items-center space-x-3">
//                 <div className="rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-2">
//                   <Shield className="h-5 w-5 text-white" />
//                 </div>
//                 <div>
//                   <span className="font-medium text-red-800">
//                     Critical Academic
//                   </span>
//                   <div className="text-xs text-red-600">Risk Assessment</div>
//                 </div>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <EnhancedDecisionBadge
//                 decision={
//                   selectedLoan.responses?.critical_academic
//                     ?.recommended_decision
//                 }
//               />
//             </td>
//             <td className="max-w-xs p-4 text-sm text-red-700">
//               <div
//                 className="truncate"
//                 title={
//                   selectedLoan.responses?.critical_academic?.critical_response
//                 }
//               >
//                 {selectedLoan.responses?.critical_academic?.critical_response}
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <div className="flex items-center justify-center">
//                 <div className="mr-2 h-2 w-16 rounded-full bg-red-200">
//                   <div className="h-2 w-5/6 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
//                 </div>
//                 <span className="text-sm font-medium text-red-700">85%</span>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <div className="rounded-full bg-red-100 p-2">
//                 <AlertCircle className="h-4 w-4 text-red-600" />
//               </div>
//             </td>
//           </tr>

//           {/* Critical Finance */}
//           <tr className="bg-gradient-to-r from-red-50 to-rose-50 transition-colors hover:from-red-100 hover:to-rose-100">
//             <td className="p-4">
//               <div className="flex items-center space-x-3">
//                 <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2">
//                   <Calculator className="h-5 w-5 text-white" />
//                 </div>
//                 <div>
//                   <span className="font-medium text-red-800">
//                     Critical Finance
//                   </span>
//                   <div className="text-xs text-red-600">Financial Risk</div>
//                 </div>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <EnhancedDecisionBadge
//                 decision={
//                   selectedLoan.responses?.critical_finance?.recommended_decision
//                 }
//               />
//             </td>
//             <td className="max-w-xs p-4 text-sm text-red-700">
//               <div
//                 className="truncate"
//                 title={
//                   selectedLoan.responses?.critical_finance?.critical_response
//                 }
//               >
//                 {selectedLoan.responses?.critical_finance?.critical_response}
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <div className="flex items-center justify-center">
//                 <div className="mr-2 h-2 w-16 rounded-full bg-red-200">
//                   <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
//                 </div>
//                 <span className="text-sm font-medium text-red-700">80%</span>
//               </div>
//             </td>
//             <td className="p-4 text-center">
//               <div className="rounded-full bg-red-100 p-2">
//                 <AlertCircle className="h-4 w-4 text-red-600" />
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     {/* Enhanced Conflict Summary */}
//     <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
//       <div className="rounded-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
//         <div className="mb-3 flex items-center">
//           <AlertCircle className="mr-2 h-6 w-6 text-yellow-600" />
//           <h4 className="font-bold text-yellow-800">Phát hiện Xung đột</h4>
//         </div>
//         <p className="mb-4 text-sm text-yellow-700">
//           Có <strong>2 điểm xung đột</strong> giữa các agent chính và agent phản
//           biện. Hệ thống đã áp dụng <strong>hybrid approach</strong> để ra quyết
//           định cuối cùng.
//         </p>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className="h-3 w-3 rounded-full bg-red-500"></div>
//             <span className="text-xs text-gray-600">High Conflict</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
//             <span className="text-xs text-gray-600">Medium Conflict</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="h-3 w-3 rounded-full bg-green-500"></div>
//             <span className="text-xs text-gray-600">No Conflict</span>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
//         <div className="mb-3 flex items-center">
//           <Target className="mr-2 h-6 w-6 text-indigo-600" />
//           <h4 className="font-bold text-indigo-800">Resolution Strategy</h4>
//         </div>
//         <p className="mb-4 text-sm text-indigo-700">
//           Hybrid Decision Framework được áp dụng để cân bằng giữa ý kiến chủ
//           quan của các agent và các quy tắc khách quan của hệ thống.
//         </p>
//         <div className="space-y-2">
//           <div className="flex justify-between text-sm">
//             <span className="text-indigo-600">Rule Weight:</span>
//             <span className="font-medium text-indigo-800">60%</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-indigo-600">Agent Weight:</span>
//             <span className="font-medium text-indigo-800">40%</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Enhanced Conflict Indicator
// const EnhancedConflictIndicator = ({ agentDecision, criticalDecision }) => {
//   const hasConflict = agentDecision !== criticalDecision;

//   if (hasConflict) {
//     return (
//       <div className="flex flex-col items-center">
//         <div className="mb-1 rounded-full bg-red-100 p-2 text-red-600">
//           <AlertCircle className="h-4 w-4" />
//         </div>
//         <span className="text-xs font-medium text-red-600">Conflict</span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div className="mb-1 rounded-full bg-green-100 p-2 text-green-600">
//         <CheckCircle className="h-4 w-4" />
//       </div>
//       <span className="text-xs font-medium text-green-600">Aligned</span>
//     </div>
//   );
// };

// // Enhanced Risk Assessment Chart with interactive features
// const EnhancedRiskAssessmentChart = ({ selectedLoan }) => {
//   const [selectedRisk, setSelectedRisk] = useState(null);
//   const [chartView, setChartView] = useState("detailed");

//   const riskFactors = [
//     {
//       name: "Thu nhập",
//       score: selectedLoan.rule_based?.features_analysis?.feature_1_thu_nhap
//         ? 85
//         : 35,
//       status: selectedLoan.rule_based?.features_analysis?.feature_1_thu_nhap,
//       concern: "Không đạt tiêu chí thu nhập tối thiểu",
//       category: "financial",
//       impact: "high",
//       icon: DollarSign,
//       color: "from-red-400 to-red-600",
//     },
//     {
//       name: "Học lực",
//       score: selectedLoan.rule_based?.features_analysis?.feature_2_hoc_luc
//         ? 75
//         : 25,
//       status: selectedLoan.rule_based?.features_analysis?.feature_2_hoc_luc,
//       concern: "",
//       category: "academic",
//       impact: "medium",
//       icon: GraduationCap,
//       color: "from-green-400 to-green-600",
//     },
//     {
//       name: "Trường học",
//       score: selectedLoan.rule_based?.features_analysis?.feature_3_truong_hoc
//         ? 90
//         : 30,
//       status: selectedLoan.rule_based?.features_analysis?.feature_3_truong_hoc,
//       concern: "",
//       category: "academic",
//       impact: "low",
//       icon: Target,
//       color: "from-blue-400 to-blue-600",
//     },
//     {
//       name: "Bảo lãnh",
//       score: selectedLoan.rule_based?.features_analysis?.feature_5_bao_lanh
//         ? 95
//         : 20,
//       status: selectedLoan.rule_based?.features_analysis?.feature_5_bao_lanh,
//       concern: "",
//       category: "financial",
//       impact: "high",
//       icon: Shield,
//       color: "from-indigo-400 to-indigo-600",
//     },
//     {
//       name: "Duy trì GPA",
//       score: 40,
//       status: false,
//       concern: "Critical agent lo ngại về khả năng duy trì thành tích",
//       category: "academic",
//       impact: "high",
//       icon: TrendingUp,
//       color: "from-orange-400 to-red-600",
//     },
//     {
//       name: "Rủi ro tài chính",
//       score: 45,
//       status: false,
//       concern: "Chưa xem xét biến động thu nhập tương lai",
//       category: "financial",
//       impact: "high",
//       icon: AlertCircle,
//       color: "from-purple-400 to-red-600",
//     },
//   ];

//   const overallScore = Math.round(
//     riskFactors.reduce((acc, factor) => acc + factor.score, 0) /
//       riskFactors.length,
//   );

//   return (
//     <div className="mt-8 rounded-2xl border border-white/20 bg-white/90 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
//       <div className="mb-8 flex items-center justify-between">
//         <h2 className="flex items-center text-2xl font-bold text-gray-900">
//           <div className="mr-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
//             <BarChart3 className="h-6 w-6 text-white" />
//           </div>
//           📊 Phân tích Rủi ro Chi tiết
//         </h2>

//         {/* View Toggle */}
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => setChartView("detailed")}
//             className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
//               chartView === "detailed"
//                 ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Detailed View
//           </button>
//           <button
//             onClick={() => setChartView("summary")}
//             className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
//               chartView === "summary"
//                 ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Summary View
//           </button>
//         </div>
//       </div>

//       {chartView === "detailed" ? (
//         <div className="space-y-4">
//           {riskFactors.map((factor, index) => (
//             <EnhancedRiskFactorCard
//               key={index}
//               factor={factor}
//               index={index}
//               isSelected={selectedRisk === index}
//               onSelect={() =>
//                 setSelectedRisk(selectedRisk === index ? null : index)
//               }
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-gray-900">Risk Categories</h3>
//             {["financial", "academic"].map((category) => {
//               const categoryFactors = riskFactors.filter(
//                 (f) => f.category === category,
//               );
//               const avgScore = Math.round(
//                 categoryFactors.reduce((acc, f) => acc + f.score, 0) /
//                   categoryFactors.length,
//               );

//               return (
//                 <div
//                   key={category}
//                   className="rounded-xl border border-gray-200 bg-gray-50 p-4"
//                 >
//                   <div className="mb-2 flex items-center justify-between">
//                     <span className="font-medium text-gray-900 capitalize">
//                       {category}
//                     </span>
//                     <span
//                       className={`font-bold ${
//                         avgScore >= 70
//                           ? "text-green-600"
//                           : avgScore >= 50
//                             ? "text-yellow-600"
//                             : "text-red-600"
//                       }`}
//                     >
//                       {avgScore}%
//                     </span>
//                   </div>
//                   <div className="h-2 w-full rounded-full bg-gray-200">
//                     <div
//                       className={`h-2 rounded-full transition-all duration-1000 ${
//                         avgScore >= 70
//                           ? "bg-gradient-to-r from-green-400 to-green-600"
//                           : avgScore >= 50
//                             ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
//                             : "bg-gradient-to-r from-red-400 to-red-600"
//                       }`}
//                       style={{ width: `${avgScore}%` }}
//                     />
//                   </div>
//                   <div className="mt-2 text-sm text-gray-600">
//                     {categoryFactors.length} factors analyzed
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-gray-900">Impact Analysis</h3>
//             {["high", "medium", "low"].map((impact) => {
//               const impactFactors = riskFactors.filter(
//                 (f) => f.impact === impact,
//               );
//               const count = impactFactors.length;

//               return (
//                 <div
//                   key={impact}
//                   className={`rounded-xl border-2 p-4 ${
//                     impact === "high"
//                       ? "border-red-200 bg-red-50"
//                       : impact === "medium"
//                         ? "border-yellow-200 bg-yellow-50"
//                         : "border-green-200 bg-green-50"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`font-medium capitalize ${
//                         impact === "high"
//                           ? "text-red-800"
//                           : impact === "medium"
//                             ? "text-yellow-800"
//                             : "text-green-800"
//                       }`}
//                     >
//                       {impact} Impact
//                     </span>
//                     <span
//                       className={`text-lg font-bold ${
//                         impact === "high"
//                           ? "text-red-600"
//                           : impact === "medium"
//                             ? "text-yellow-600"
//                             : "text-green-600"
//                       }`}
//                     >
//                       {count}
//                     </span>
//                   </div>
//                   <div className="mt-2 text-sm text-gray-600">
//                     {impactFactors.map((f) => f.name).join(", ")}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Enhanced Overall Risk Score */}
//       <div className="mt-8 rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 p-8">
//         <div className="text-center">
//           <div
//             className={`mb-4 text-5xl font-bold ${
//               overallScore >= 70
//                 ? "text-green-600"
//                 : overallScore >= 50
//                   ? "text-yellow-600"
//                   : "text-red-600"
//             }`}
//           >
//             {overallScore}%
//           </div>
//           <div className="mb-2 text-xl font-bold text-gray-900">
//             Điểm Rủi ro Tổng thể
//           </div>
//           <p
//             className={`text-lg font-medium ${
//               overallScore >= 70
//                 ? "text-green-700"
//                 : overallScore >= 50
//                   ? "text-yellow-700"
//                   : "text-red-700"
//             }`}
//           >
//             {overallScore >= 70
//               ? "✅ Rủi ro thấp - An toàn"
//               : overallScore >= 50
//                 ? "⚠️ Rủi ro trung bình - Cần theo dõi"
//                 : "🚨 Rủi ro cao - Cần xem xét kỹ"}
//           </p>

//           {/* Risk Distribution */}
//           <div className="mt-6 grid grid-cols-3 gap-4">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-red-600">
//                 {riskFactors.filter((f) => f.score < 50).length}
//               </div>
//               <div className="text-sm text-red-700">High Risk</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-yellow-600">
//                 {
//                   riskFactors.filter((f) => f.score >= 50 && f.score < 70)
//                     .length
//                 }
//               </div>
//               <div className="text-sm text-yellow-700">Medium Risk</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600">
//                 {riskFactors.filter((f) => f.score >= 70).length}
//               </div>
//               <div className="text-sm text-green-700">Low Risk</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EnhancedRiskFactorCard = ({ factor, index, isSelected, onSelect }) => (
//   <div
//     className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
//       isSelected
//         ? "scale-[1.02] border-indigo-300 bg-indigo-50 shadow-lg"
//         : factor.score >= 70
//           ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-300 hover:shadow-md"
//           : factor.score >= 50
//             ? "border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 hover:border-yellow-300 hover:shadow-md"
//             : "border-red-200 bg-gradient-to-r from-red-50 to-rose-50 hover:border-red-300 hover:shadow-md"
//     }`}
//     style={{ animationDelay: `${index * 100}ms` }}
//     onClick={onSelect}
//   >
//     <div className="mb-3 flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <div
//           className={`rounded-lg bg-gradient-to-r p-2 ${factor.color} shadow-lg`}
//         >
//           <factor.icon className="h-5 w-5 text-white" />
//         </div>
//         <div>
//           <span className="font-semibold text-gray-900">{factor.name}</span>
//           <div className="mt-1 flex items-center space-x-2">
//             <span
//               className={`rounded-full px-2 py-1 text-xs font-medium ${
//                 factor.impact === "high"
//                   ? "bg-red-100 text-red-700"
//                   : factor.impact === "medium"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-green-100 text-green-700"
//               }`}
//             >
//               {factor.impact.toUpperCase()}
//             </span>
//             <span
//               className={`rounded-full px-2 py-1 text-xs font-medium ${
//                 factor.category === "financial"
//                   ? "bg-blue-100 text-blue-700"
//                   : "bg-purple-100 text-purple-700"
//               }`}
//             >
//               {factor.category.toUpperCase()}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center space-x-3">
//         <div className="text-right">
//           <span
//             className={`text-lg font-bold ${
//               factor.score >= 70
//                 ? "text-green-600"
//                 : factor.score >= 50
//                   ? "text-yellow-600"
//                   : "text-red-600"
//             }`}
//           >
//             {factor.score}%
//           </span>
//         </div>
//         {factor.status ? (
//           <CheckCircle className="h-5 w-5 text-green-500" />
//         ) : (
//           <XCircle className="h-5 w-5 text-red-500" />
//         )}
//       </div>
//     </div>

//     {/* Progress Bar */}
//     <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-gray-200">
//       <div
//         className={`h-3 rounded-full transition-all duration-1000 ${
//           factor.score >= 70
//             ? "bg-gradient-to-r from-green-400 to-green-600"
//             : factor.score >= 50
//               ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
//               : "bg-gradient-to-r from-red-400 to-red-600"
//         }`}
//         style={{ width: `${factor.score}%` }}
//       ></div>
//     </div>

//     {factor.concern && (
//       <div className="mt-2 rounded-lg border border-red-200 bg-red-100 p-3">
//         <p className="flex items-start text-sm text-red-700">
//           <AlertCircle className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-red-600" />
//           {factor.concern}
//         </p>
//       </div>
//     )}

//     {/* Expanded Details */}
//     {isSelected && (
//       <div className="animate-slide-down mt-4 rounded-lg border border-indigo-200 bg-white p-4">
//         <h4 className="mb-2 font-semibold text-indigo-900">
//           Risk Analysis Details
//         </h4>
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div>
//             <span className="text-gray-500">Current Status:</span>
//             <div
//               className={`font-medium ${factor.status ? "text-green-600" : "text-red-600"}`}
//             >
//               {factor.status ? "Passed" : "Failed"}
//             </div>
//           </div>
//           <div>
//             <span className="text-gray-500">Risk Level:</span>
//             <div
//               className={`font-medium ${
//                 factor.score >= 70
//                   ? "text-green-600"
//                   : factor.score >= 50
//                     ? "text-yellow-600"
//                     : "text-red-600"
//               }`}
//             >
//               {factor.score >= 70
//                 ? "Low"
//                 : factor.score >= 50
//                   ? "Medium"
//                   : "High"}
//             </div>
//           </div>
//           <div>
//             <span className="text-gray-500">Impact:</span>
//             <div
//               className={`font-medium ${
//                 factor.impact === "high"
//                   ? "text-red-600"
//                   : factor.impact === "medium"
//                     ? "text-yellow-600"
//                     : "text-green-600"
//               }`}
//             >
//               {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)}
//             </div>
//           </div>
//           <div>
//             <span className="text-gray-500">Category:</span>
//             <div className="font-medium text-indigo-600 capitalize">
//               {factor.category}
//             </div>
//           </div>
//         </div>

//         {/* Recommendations */}
//         <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
//           <h5 className="mb-2 font-medium text-blue-900">Recommendations:</h5>
//           <ul className="space-y-1 text-sm text-blue-800">
//             {factor.score < 50 && (
//               <>
//                 <li>• Require additional documentation</li>
//                 <li>• Consider co-signer or guarantor</li>
//                 <li>• Implement enhanced monitoring</li>
//               </>
//             )}
//             {factor.score >= 50 && factor.score < 70 && (
//               <>
//                 <li>• Regular progress reviews</li>
//                 <li>• Monthly check-ins</li>
//                 <li>• Financial counseling support</li>
//               </>
//             )}
//             {factor.score >= 70 && (
//               <>
//                 <li>• Standard monitoring procedures</li>
//                 <li>• Quarterly reviews sufficient</li>
//                 <li>• Low intervention required</li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     )}
//   </div>
// );

// // Enhanced Badge Components with better styling
// const EnhancedFinalDecisionBadge = ({ decision }) => {
//   const isApprove = decision === "approve";
//   return (
//     <div
//       className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all hover:scale-105 ${
//         isApprove
//           ? "border-2 border-green-300 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:shadow-green-200"
//           : "border-2 border-red-300 bg-gradient-to-r from-red-100 to-rose-100 text-red-800 hover:shadow-red-200"
//       }`}
//     >
//       {isApprove ? (
//         <>
//           <div className="mr-2 rounded-full bg-green-200 p-1">
//             <CheckCircle className="h-4 w-4 text-green-600" />
//           </div>
//           CHẤP THUẬN
//         </>
//       ) : (
//         <>
//           <div className="mr-2 rounded-full bg-red-200 p-1">
//             <XCircle className="h-4 w-4 text-red-600" />
//           </div>
//           TỪ CHỐI
//         </>
//       )}
//     </div>
//   );
// };

// const EnhancedDecisionBadge = ({ decision }) => {
//   const isApprove = decision === "approve";
//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-all hover:scale-105 ${
//         isApprove
//           ? "border border-green-300 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
//           : "border border-red-300 bg-gradient-to-r from-red-100 to-rose-100 text-red-800"
//       }`}
//     >
//       {isApprove ? (
//         <>
//           <ThumbsUp className="mr-1 h-3 w-3" />
//           Chấp thuận
//         </>
//       ) : (
//         <>
//           <ThumbsDown className="mr-1 h-3 w-3" />
//           Từ chối
//         </>
//       )}
//     </span>
//   );
// };

// // Add custom CSS animations via style tag
// const customStyles = `
//   .animate-slide-in-right {
//     animation: slideInRight 0.5s ease-out;
//   }

//   .animate-slide-down {
//     animation: slideDown 0.3s ease-out;
//   }

//   @keyframes slideInRight {
//     from {
//       transform: translateX(100%);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }

//   @keyframes slideDown {
//     from {
//       transform: translateY(-10px);
//       opacity: 0;
//     }
//     to {
//       transform: translateY(0);
//       opacity: 1;
//     }
//   }

//   .hover\\:scale-105:hover {
//     transform: scale(1.05);
//   }

//   .hover\\:scale-\\[1\\.02\\]:hover {
//     transform: scale(1.02);
//   }
// `;

// // Add styles to document head
// if (typeof document !== "undefined") {
//   const styleSheet = document.createElement("style");
//   styleSheet.textContent = customStyles;
//   document.head.appendChild(styleSheet);
// }

// export default LoanDetailDashboard;

import React, { useState, useEffect } from "react";
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
  Download,
  Share,
  Filter,
  Search,
  Bell,
  Settings,
  Maximize2,
  Copy,
  RefreshCw,
  Star,
  Globe,
  Wifi,
  Lock,
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

const loanPurposes = {
  1: "Học phí",
  2: "Sinh hoạt phí",
  3: "Mua sách/thiết bị",
  4: "Khác",
};

const DarkLoanDashboard = () => {
  const [selectedLoan] = useState(sampleLoanData);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    const data = JSON.stringify(selectedLoan, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `loan-${selectedLoan.loan_id.slice(-8)}.json`;
    a.click();
  };

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

      <div className="mx-auto max-w-7xl p-4">
        {/* Dark Header */}
        <DarkHeader
          selectedLoan={selectedLoan}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          onCopyLoanId={handleCopyLoanId}
          onExport={handleExport}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        {/* Dark Tab Navigation */}
        <DarkTabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedLoan={selectedLoan}
        />

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <DarkOverviewSection
              selectedLoan={selectedLoan}
              formatCurrency={formatCurrency}
            />
          )}

          {activeTab === "rule-based" && (
            <DarkRuleBasedSection selectedLoan={selectedLoan} />
          )}

          {activeTab === "agents" && (
            <DarkAgentOpinionsSection selectedLoan={selectedLoan} />
          )}

          {activeTab === "debate" && (
            <div className="space-y-8">
              <DarkDebateSection
                selectedLoan={selectedLoan}
                expandedAgent={expandedAgent}
                setExpandedAgent={setExpandedAgent}
              />
              <DarkDecisionMatrix selectedLoan={selectedLoan} />
              <DarkRiskAssessmentChart selectedLoan={selectedLoan} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Dark Header Component
const DarkHeader = ({
  selectedLoan,
  formatCurrency,
  formatDate,
  onCopyLoanId,
  onExport,
  isFullscreen,
  onToggleFullscreen,
}) => (
  <div className="mb-8">
    {/* Top Bar */}
    <div className="mb-6 flex items-center justify-between">
      <button className="group flex items-center text-blue-400 transition-all hover:translate-x-1 hover:text-blue-300">
        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">← Quay lại danh sách</span>
      </button>

      {/* Action buttons */}
      <div className="flex items-center space-x-3">
        {[
          { icon: Maximize2, action: onToggleFullscreen },
          { icon: Download, action: onExport },
          { icon: Share, action: () => {} },
          { icon: Bell, action: () => {} },
        ].map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className="group rounded-xl border border-slate-700 bg-slate-800/70 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:border-slate-600 hover:bg-slate-700/70"
          >
            <btn.icon className="h-5 w-5 text-slate-300 transition-colors group-hover:text-white" />
          </button>
        ))}
      </div>
    </div>

    {/* Main Header Card */}
    <div className="rounded-3xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Loan ID & Status */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-bold text-transparent">
                  Hợp đồng #{selectedLoan.loan_id.slice(-8)}
                </h1>
                <button
                  onClick={onCopyLoanId}
                  className="rounded-lg p-1.5 transition-colors hover:bg-slate-700"
                >
                  <Copy className="h-4 w-4 text-slate-400 hover:text-white" />
                </button>
              </div>
              <p className="mt-1 font-medium text-slate-300">
                Sinh viên: {selectedLoan.studentInfo?.name}
              </p>
              <div className="mt-1 flex items-center space-x-2 text-sm text-slate-400">
                <GraduationCap className="h-4 w-4" />
                <span>{selectedLoan.studentInfo?.university}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DarkDecisionBadge decision={selectedLoan.decision} size="large" />
            <div className="flex items-center rounded-full border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-sm text-slate-300">
              <Timer className="mr-2 h-4 w-4" />
              <span className="font-medium">
                {selectedLoan.processing_time}s
              </span>
            </div>
            <div className="flex items-center rounded-full border border-emerald-700/50 bg-emerald-900/30 px-3 py-1.5 text-sm text-emerald-400">
              <Activity className="mr-2 h-4 w-4" />
              <span className="font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Amount Display */}
        <div className="text-center lg:text-left">
          <div className="mb-2 text-sm font-medium text-slate-400">
            Số tiền vay
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
            {formatCurrency(selectedLoan.loan_amount_requested)}
          </div>
          <div className="mt-2 text-sm text-slate-400">
            <span className="inline-flex items-center">
              <CreditCard className="mr-1 h-3 w-3" />
              Trả/tháng: {formatCurrency(selectedLoan.monthly_installment)}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-700">
            <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
        </div>

        {/* Date Info */}
        <div className="text-center lg:text-left">
          <div className="mb-2 text-sm font-medium text-slate-400">
            Ngày tạo
          </div>
          <div className="text-lg font-semibold text-white">
            {formatDate(selectedLoan.created_at)}
          </div>
          <div className="mt-3 flex items-center justify-center lg:justify-start">
            <span className="rounded-full border border-blue-700/50 bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-300">
              {loanPurposes[selectedLoan.loan_purpose]}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Dark Tab Navigation
const DarkTabNavigation = ({ activeTab, setActiveTab, selectedLoan }) => {
  const tabs = [
    { key: "overview", label: "📋 Tổng quan", icon: Eye, count: null },
    {
      key: "rule-based",
      label: "⚖️ Rule-based",
      icon: Calculator,
      count: selectedLoan.rule_based?.total_passed_count,
    },
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

// Dark Overview Section
const DarkOverviewSection = ({ selectedLoan, formatCurrency }) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {/* Student Info */}
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 shadow-xl backdrop-blur-xl lg:col-span-2">
      <h2 className="mb-6 flex items-center text-xl font-bold text-white">
        <div className="mr-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
          <User className="h-5 w-5 text-white" />
        </div>
        Thông tin sinh viên
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            label: "Họ tên",
            value: selectedLoan.studentInfo?.name,
            icon: User,
            color: "from-blue-400 to-blue-600",
          },
          {
            label: "Mã SV",
            value: selectedLoan.student_id,
            icon: Badge,
            color: "from-green-400 to-green-600",
          },
          {
            label: "GPA",
            value: `${selectedLoan.studentInfo?.gpa}/4.0`,
            icon: BarChart3,
            color: "from-yellow-400 to-orange-600",
          },
          {
            label: "Trường",
            value: selectedLoan.studentInfo?.university,
            icon: GraduationCap,
            color: "from-purple-400 to-purple-600",
          },
          {
            label: "Khoa",
            value: selectedLoan.studentInfo?.faculty,
            icon: Layers,
            color: "from-indigo-400 to-indigo-600",
          },
          {
            label: "Ngành",
            value: selectedLoan.studentInfo?.major,
            icon: Target,
            color: "from-pink-400 to-pink-600",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-xl border border-transparent p-3 transition-all hover:border-slate-600/50 hover:bg-slate-700/30"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}
            >
              <item.icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-400">
                {item.label}
              </div>
              <div className="font-semibold text-white">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Final Decision */}
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 shadow-xl backdrop-blur-xl">
      <h2 className="mb-6 flex items-center text-xl font-bold text-white">
        <div className="mr-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 p-2">
          <Zap className="h-5 w-5 text-white" />
        </div>
        Quyết định cuối cùng
      </h2>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-600 bg-slate-700/50 p-4">
          <div className="mb-2 text-sm font-medium text-slate-400">Lý do:</div>
          <p className="text-sm leading-relaxed text-slate-200">
            {selectedLoan.responses?.final_decision?.reason}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-700/50 bg-green-900/20 p-4 text-center">
            <div className="mb-1 text-sm font-medium text-green-400">
              Rule-based
            </div>
            <div className="text-lg font-bold text-green-300">
              {selectedLoan.responses?.final_decision?.final_result
                ?.rule_based_pass
                ? "✓ PASS"
                : "✗ FAIL"}
            </div>
          </div>
          <div className="rounded-xl border border-blue-700/50 bg-blue-900/20 p-4 text-center">
            <div className="mb-1 text-sm font-medium text-blue-400">
              Agent Support
            </div>
            <div className="text-lg font-bold text-blue-300">
              {selectedLoan.responses?.final_decision?.final_result
                ?.agent_support_available
                ? "✓ Có"
                : "✗ Không"}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-600 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Confidence Score</span>
            <span className="font-bold text-purple-400">87%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-700">
            <div className="h-2 w-[87%] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Dark Rule-based Section
const DarkRuleBasedSection = ({ selectedLoan }) => {
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
            <DarkDecisionBadge decision={ruleData?.rule_based_decision} />
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
            <DarkFeatureCard
              key={key}
              featureKey={key}
              passed={passed}
              index={index}
            />
          ),
        )}
      </div>
    </div>
  );
};

// Dark Feature Card
const DarkFeatureCard = ({ featureKey, passed, index }) => {
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

// Dark Agent Opinions Section
const DarkAgentOpinionsSection = ({ selectedLoan }) => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-8 flex items-center text-2xl font-bold text-white">
        <div className="mr-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
          <Bot className="h-6 w-6 text-white" />
        </div>
        Ý kiến từ các AI Agent
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Academic Agent */}
        <DarkAgentCard
          name="Academic Agent"
          icon={Brain}
          decision={selectedLoan.responses?.academic_repredict?.decision}
          reason={selectedLoan.responses?.academic_repredict?.reason}
          color="from-blue-500 via-indigo-500 to-purple-600"
          status={selectedLoan.agent_status?.academic_approve}
          specialty="Đánh giá học tập"
          confidence={78}
        />

        {/* Finance Agent */}
        <DarkAgentCard
          name="Finance Agent"
          icon={TrendingUp}
          decision={selectedLoan.responses?.finance_repredict?.decision}
          reason={selectedLoan.responses?.finance_repredict?.reason}
          color="from-green-500 via-emerald-500 to-teal-600"
          status={selectedLoan.agent_status?.finance_approve}
          specialty="Phân tích tài chính"
          confidence={82}
        />
      </div>

      {/* Agent Status Summary */}
      <div className="mt-8 rounded-xl border border-slate-600 bg-slate-700/30 p-6">
        <h3 className="mb-4 flex items-center font-bold text-white">
          <Activity className="mr-2 h-5 w-5 text-blue-400" />
          Tóm tắt trạng thái Agent
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-800/50 p-3">
            <span className="font-medium text-slate-300">
              Ít nhất 1 agent chấp thuận:
            </span>
            <span
              className={`flex items-center font-bold ${
                selectedLoan.agent_status?.at_least_one_agent_approve
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {selectedLoan.agent_status?.at_least_one_agent_approve ? (
                <>
                  <CheckCircle className="mr-1 h-4 w-4" /> Có
                </>
              ) : (
                <>
                  <XCircle className="mr-1 h-4 w-4" /> Không
                </>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-800/50 p-3">
            <span className="font-medium text-slate-300">
              Cả 2 điều kiện đạt:
            </span>
            <span
              className={`flex items-center font-bold ${
                selectedLoan.agent_status?.both_conditions_met
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {selectedLoan.agent_status?.both_conditions_met ? (
                <>
                  <CheckCircle className="mr-1 h-4 w-4" /> Có
                </>
              ) : (
                <>
                  <XCircle className="mr-1 h-4 w-4" /> Không
                </>
              )}
            </span>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-purple-500 bg-gradient-to-r from-purple-600 to-pink-600 p-3 text-white">
            <span className="font-bold">Consensus Score: 80%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Dark Agent Card
const DarkAgentCard = ({
  name,
  icon: Icon,
  decision,
  reason,
  color,
  status,
  specialty,
  confidence,
}) => (
  <div className="rounded-xl border border-slate-600 bg-slate-800/50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-slate-500 hover:shadow-2xl">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className={`h-12 w-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">{name}</h3>
          <div className="text-sm text-slate-400">{specialty}</div>
          <div className="text-xs text-slate-500">
            Trạng thái: {status ? "✅ Chấp thuận" : "❌ Từ chối"}
          </div>
        </div>
      </div>
      <div className="text-right">
        <DarkDecisionBadge decision={decision} />
        <div className="mt-2 text-xs text-slate-400">
          Confidence: {confidence}%
        </div>
      </div>
    </div>

    <div className="rounded-lg border border-slate-600 bg-slate-700/50 p-4">
      <p className="text-sm leading-relaxed text-slate-200">{reason}</p>
    </div>

    {/* Confidence bar */}
    <div className="mt-3">
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>Confidence Level</span>
        <span>{confidence}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-700">
        <div
          className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-1000`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  </div>
);

// Dark Debate Section
const DarkDebateSection = ({
  selectedLoan,
  expandedAgent,
  setExpandedAgent,
}) => {
  const criticalAgents = [
    {
      key: "critical_academic",
      name: "Critical Academic Agent",
      avatar: "🎓",
      color: "from-orange-500 via-red-500 to-pink-500",
      data: selectedLoan.responses?.critical_academic,
      severity: "high",
      category: "academic",
    },
    {
      key: "critical_finance",
      name: "Critical Finance Agent",
      avatar: "💰",
      color: "from-purple-500 via-pink-500 to-red-500",
      data: selectedLoan.responses?.critical_finance,
      severity: "medium",
      category: "finance",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
        <h2 className="mb-8 flex items-center text-2xl font-bold text-white">
          <div className="mr-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 p-2">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          🧠 Phản biện từ Critical Agents
        </h2>

        <p className="mb-8 rounded-xl border border-blue-700/50 bg-blue-900/20 p-4 text-lg text-blue-200">
          Dưới đây là các ý kiến phản biện từ các AI agent chuyên phụ trách đánh
          giá rủi ro và thách thức quyết định ban đầu:
        </p>

        {/* Chat-like interface */}
        <div className="space-y-6">
          {criticalAgents.map((agent) => (
            <DarkCriticalAgentCard
              key={agent.key}
              agent={agent}
              isExpanded={expandedAgent === agent.key}
              onToggleExpand={() =>
                setExpandedAgent(expandedAgent === agent.key ? null : agent.key)
              }
            />
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-8 rounded-xl border-2 border-purple-700/50 bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-indigo-900/30 p-6">
          <h3 className="mb-4 flex items-center font-bold text-white">
            <div className="mr-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <Target className="h-4 w-4 text-white" />
            </div>
            Kết luận sau phản biện
          </h3>
          <p className="mb-4 leading-relaxed text-slate-300">
            Mặc dù có sự phản đối từ các Critical Agent về các rủi ro tiềm ẩn,
            hệ thống cuối cùng vẫn{" "}
            <strong className="text-green-400">CHẤP THUẬN</strong> khoản vay dựa
            trên:
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-blue-600/50 bg-blue-900/30 p-4">
              <div className="text-sm font-medium text-blue-400">
                Rule-based system
              </div>
              <div className="text-lg font-bold text-blue-300">
                6/7 tiêu chí đạt
              </div>
            </div>
            <div className="rounded-lg border border-green-600/50 bg-green-900/30 p-4">
              <div className="text-sm font-medium text-green-400">
                Vi phạm đặc biệt
              </div>
              <div className="text-lg font-bold text-green-300">0 vi phạm</div>
            </div>
            <div className="rounded-lg border border-purple-600/50 bg-purple-900/30 p-4">
              <div className="text-sm font-medium text-purple-400">
                Approach
              </div>
              <div className="text-sm font-bold text-purple-300">
                Hybrid Decision
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dark Critical Agent Card
const DarkCriticalAgentCard = ({ agent, isExpanded, onToggleExpand }) => (
  <div className="overflow-hidden rounded-xl border border-red-700/50 bg-slate-800/70 shadow-xl">
    {/* Agent Header */}
    <div
      className={`bg-gradient-to-r ${agent.color} relative overflow-hidden p-6`}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-2xl backdrop-blur-sm">
            {agent.avatar}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{agent.name}</h3>
            <div className="flex items-center text-sm text-white/90">
              <Shield className="mr-1 h-4 w-4" />
              Vai trò: Phản biện & Đánh giá rủi ro
            </div>
            <div className="mt-1 flex items-center space-x-2">
              <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white">
                {agent.severity === "high" ? "🔴 High Risk" : "🟡 Medium Risk"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <DarkDecisionBadge decision={agent.data?.recommended_decision} />
          <button
            onClick={onToggleExpand}
            className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>

    {/* Agent Content */}
    <div className="p-6">
      <div className="mb-6">
        <h4 className="mb-3 flex items-center font-semibold text-white">
          <div className="mr-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-1">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
          Phản biện chính
        </h4>
        <div className="rounded-xl border-2 border-red-700/50 bg-red-900/20 p-4">
          <p className="leading-relaxed font-medium text-red-200">
            {agent.data?.critical_response}
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="animate-slide-down space-y-6">
          <div>
            <h4 className="mb-3 flex items-center font-semibold text-white">
              <FileText className="mr-2 h-4 w-4 text-slate-400" />
              Chi tiết phản biện
            </h4>
            <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap text-green-400">
                {agent.data?.raw_response}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Dark Decision Matrix
const DarkDecisionMatrix = ({ selectedLoan }) => (
  <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
    <h2 className="mb-8 flex items-center text-2xl font-bold text-white">
      <div className="mr-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
        <Activity className="h-6 w-6 text-white" />
      </div>
      🔄 Ma trận So sánh Quyết định
    </h2>

    {/* Summary Cards */}
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-blue-700/50 bg-blue-900/20 p-4">
        <div className="text-sm font-medium text-blue-400">Total Agents</div>
        <div className="text-2xl font-bold text-blue-300">4</div>
      </div>
      <div className="rounded-xl border border-green-700/50 bg-green-900/20 p-4">
        <div className="text-sm font-medium text-green-400">Approvals</div>
        <div className="text-2xl font-bold text-green-300">2</div>
      </div>
      <div className="rounded-xl border border-red-700/50 bg-red-900/20 p-4">
        <div className="text-sm font-medium text-red-400">Rejections</div>
        <div className="text-2xl font-bold text-red-300">2</div>
      </div>
      <div className="rounded-xl border border-yellow-700/50 bg-yellow-900/20 p-4">
        <div className="text-sm font-medium text-yellow-400">Conflicts</div>
        <div className="text-2xl font-bold text-yellow-300">2</div>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse overflow-hidden rounded-xl bg-slate-800/50 shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <th className="p-4 text-left font-bold">Agent</th>
            <th className="p-4 text-center font-bold">Quyết định</th>
            <th className="p-4 text-left font-bold">Lý do chính</th>
            <th className="p-4 text-center font-bold">Confidence</th>
            <th className="p-4 text-center font-bold">Conflict</th>
          </tr>
        </thead>
        <tbody>
          {/* Academic Agent */}
          <tr className="border-b border-slate-600 transition-colors hover:bg-slate-700/30">
            <td className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-medium text-white">Academic Agent</span>
                  <div className="text-xs text-slate-400">
                    Learning Assessment
                  </div>
                </div>
              </div>
            </td>
            <td className="p-4 text-center">
              <DarkDecisionBadge
                decision={selectedLoan.responses?.academic_repredict?.decision}
              />
            </td>
            <td className="max-w-xs p-4 text-sm text-slate-300">
              <div
                className="truncate"
                title={selectedLoan.responses?.academic_repredict?.reason}
              >
                {selectedLoan.responses?.academic_repredict?.reason}
              </div>
            </td>
            <td className="p-4 text-center">
              <div className="flex items-center justify-center">
                <div className="mr-2 h-2 w-16 rounded-full bg-slate-700">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                </div>
                <span className="text-sm font-medium text-slate-300">78%</span>
              </div>
            </td>
            <td className="p-4 text-center">
              <DarkConflictIndicator
                agentDecision={
                  selectedLoan.responses?.academic_repredict?.decision
                }
                criticalDecision={
                  selectedLoan.responses?.critical_academic
                    ?.recommended_decision
                }
              />
            </td>
          </tr>

          {/* Finance Agent */}
          <tr className="border-b border-slate-600 transition-colors hover:bg-slate-700/30">
            <td className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-medium text-white">Finance Agent</span>
                  <div className="text-xs text-slate-400">
                    Financial Analysis
                  </div>
                </div>
              </div>
            </td>
            <td className="p-4 text-center">
              <DarkDecisionBadge
                decision={selectedLoan.responses?.finance_repredict?.decision}
              />
            </td>
            <td className="max-w-xs p-4 text-sm text-slate-300">
              <div
                className="truncate"
                title={selectedLoan.responses?.finance_repredict?.reason}
              >
                {selectedLoan.responses?.finance_repredict?.reason}
              </div>
            </td>
            <td className="p-4 text-center">
              <div className="flex items-center justify-center">
                <div className="mr-2 h-2 w-16 rounded-full bg-slate-700">
                  <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                </div>
                <span className="text-sm font-medium text-slate-300">82%</span>
              </div>
            </td>
            <td className="p-4 text-center">
              <DarkConflictIndicator
                agentDecision={
                  selectedLoan.responses?.finance_repredict?.decision
                }
                criticalDecision={
                  selectedLoan.responses?.critical_finance?.recommended_decision
                }
              />
            </td>
          </tr>

          {/* Critical Academic */}
          <tr className="border-b border-red-700/50 bg-red-900/10 transition-colors hover:bg-red-900/20">
            <td className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-medium text-red-300">
                    Critical Academic
                  </span>
                  <div className="text-xs text-red-400">Risk Assessment</div>
                </div>
              </div>
            </td>
            <td className="p-4 text-center">
              <DarkDecisionBadge
                decision={
                  selectedLoan.responses?.critical_academic
                    ?.recommended_decision
                }
              />
            </td>
            <td className="max-w-xs p-4 text-sm text-red-200">
              <div
                className="truncate"
                title={
                  selectedLoan.responses?.critical_academic?.critical_response
                }
              >
                {selectedLoan.responses?.critical_academic?.critical_response}
              </div>
            </td>
            <td className="p-4 text-center">
              <div className="flex items-center justify-center">
                <div className="mr-2 h-2 w-16 rounded-full bg-red-800">
                  <div className="h-2 w-5/6 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
                </div>
                <span className="text-sm font-medium text-red-200">85%</span>
              </div>
            </td>
            <td className="p-4 text-center">
              <div className="rounded-full bg-red-900/50 p-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
              </div>
            </td>
          </tr>

          {/* Critical Finance */}
          <tr className="bg-red-900/10 transition-colors hover:bg-red-900/20">
            <td className="p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-medium text-red-300">
                    Critical Finance
                  </span>
                  <div className="text-xs text-red-400">Financial Risk</div>
                </div>
              </div>
            </td>
            <td className="p-4 text-center">
              <DarkDecisionBadge
                decision={
                  selectedLoan.responses?.critical_finance?.recommended_decision
                }
              />
            </td>
            <td className="max-w-xs p-4 text-sm text-red-200">
              <div
                className="truncate"
                title={
                  selectedLoan.responses?.critical_finance?.critical_response
                }
              >
                {selectedLoan.responses?.critical_finance?.critical_response}
              </div>
            </td>
            <td className="p-4 text-center">
              <div className="flex items-center justify-center">
                <div className="mr-2 h-2 w-16 rounded-full bg-red-800">
                  <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </div>
                <span className="text-sm font-medium text-red-200">80%</span>
              </div>
            </td>
            <td className="p-4 text-center">
              <div className="rounded-full bg-red-900/50 p-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Dark Risk Assessment Chart
const DarkRiskAssessmentChart = ({ selectedLoan }) => {
  const [selectedRisk, setSelectedRisk] = useState(null);

  const riskFactors = [
    {
      name: "Thu nhập",
      score: selectedLoan.rule_based?.features_analysis?.feature_1_thu_nhap
        ? 85
        : 35,
      status: selectedLoan.rule_based?.features_analysis?.feature_1_thu_nhap,
      concern: "Không đạt tiêu chí thu nhập tối thiểu",
      category: "financial",
      impact: "high",
      icon: DollarSign,
      color: "from-red-400 to-red-600",
    },
    {
      name: "Học lực",
      score: selectedLoan.rule_based?.features_analysis?.feature_2_hoc_luc
        ? 75
        : 25,
      status: selectedLoan.rule_based?.features_analysis?.feature_2_hoc_luc,
      concern: "",
      category: "academic",
      impact: "medium",
      icon: GraduationCap,
      color: "from-green-400 to-green-600",
    },
    {
      name: "Trường học",
      score: selectedLoan.rule_based?.features_analysis?.feature_3_truong_hoc
        ? 90
        : 30,
      status: selectedLoan.rule_based?.features_analysis?.feature_3_truong_hoc,
      concern: "",
      category: "academic",
      impact: "low",
      icon: Target,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Bảo lãnh",
      score: selectedLoan.rule_based?.features_analysis?.feature_5_bao_lanh
        ? 95
        : 20,
      status: selectedLoan.rule_based?.features_analysis?.feature_5_bao_lanh,
      concern: "",
      category: "financial",
      impact: "high",
      icon: Shield,
      color: "from-indigo-400 to-indigo-600",
    },
    {
      name: "Duy trì GPA",
      score: 40,
      status: false,
      concern: "Critical agent lo ngại về khả năng duy trì thành tích",
      category: "academic",
      impact: "high",
      icon: TrendingUp,
      color: "from-orange-400 to-red-600",
    },
    {
      name: "Rủi ro tài chính",
      score: 45,
      status: false,
      concern: "Chưa xem xét biến động thu nhập tương lai",
      category: "financial",
      impact: "high",
      icon: AlertCircle,
      color: "from-purple-400 to-red-600",
    },
  ];

  const overallScore = Math.round(
    riskFactors.reduce((acc, factor) => acc + factor.score, 0) /
      riskFactors.length,
  );

  return (
    <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-8 flex items-center text-2xl font-bold text-white">
        <div className="mr-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-2">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        📊 Phân tích Rủi ro Chi tiết
      </h2>

      <div className="space-y-4">
        {riskFactors.map((factor, index) => (
          <DarkRiskFactorCard
            key={index}
            factor={factor}
            index={index}
            isSelected={selectedRisk === index}
            onSelect={() =>
              setSelectedRisk(selectedRisk === index ? null : index)
            }
          />
        ))}
      </div>

      {/* Overall Risk Score */}
      <div className="mt-8 rounded-2xl border-2 border-purple-700/50 bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-indigo-900/30 p-8">
        <div className="text-center">
          <div
            className={`mb-4 text-5xl font-bold ${
              overallScore >= 70
                ? "text-green-400"
                : overallScore >= 50
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          >
            {overallScore}%
          </div>
          <div className="mb-2 text-xl font-bold text-white">
            Điểm Rủi ro Tổng thể
          </div>
          <p
            className={`text-lg font-medium ${
              overallScore >= 70
                ? "text-green-300"
                : overallScore >= 50
                  ? "text-yellow-300"
                  : "text-red-300"
            }`}
          >
            {overallScore >= 70
              ? "✅ Rủi ro thấp - An toàn"
              : overallScore >= 50
                ? "⚠️ Rủi ro trung bình - Cần theo dõi"
                : "🚨 Rủi ro cao - Cần xem xét kỹ"}
          </p>

          {/* Risk Distribution */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {riskFactors.filter((f) => f.score < 50).length}
              </div>
              <div className="text-sm text-red-300">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {
                  riskFactors.filter((f) => f.score >= 50 && f.score < 70)
                    .length
                }
              </div>
              <div className="text-sm text-yellow-300">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {riskFactors.filter((f) => f.score >= 70).length}
              </div>
              <div className="text-sm text-green-300">Low Risk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dark Risk Factor Card
const DarkRiskFactorCard = ({ factor, index, isSelected, onSelect }) => (
  <div
    className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
      isSelected
        ? "scale-[1.02] border-purple-500/70 bg-purple-900/20 shadow-xl"
        : factor.score >= 70
          ? "border-green-700/50 bg-green-900/10 hover:border-green-600/70"
          : factor.score >= 50
            ? "border-yellow-700/50 bg-yellow-900/10 hover:border-yellow-600/70"
            : "border-red-700/50 bg-red-900/10 hover:border-red-600/70"
    }`}
    style={{ animationDelay: `${index * 100}ms` }}
    onClick={onSelect}
  >
    <div className="mb-3 flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div
          className={`rounded-lg bg-gradient-to-r p-2 ${factor.color} shadow-lg`}
        >
          <factor.icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="font-semibold text-white">{factor.name}</span>
          <div className="mt-1 flex items-center space-x-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                factor.impact === "high"
                  ? "bg-red-900/50 text-red-300"
                  : factor.impact === "medium"
                    ? "bg-yellow-900/50 text-yellow-300"
                    : "bg-green-900/50 text-green-300"
              }`}
            >
              {factor.impact.toUpperCase()}
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                factor.category === "financial"
                  ? "bg-blue-900/50 text-blue-300"
                  : "bg-purple-900/50 text-purple-300"
              }`}
            >
              {factor.category.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <span
            className={`text-lg font-bold ${
              factor.score >= 70
                ? "text-green-400"
                : factor.score >= 50
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          >
            {factor.score}%
          </span>
        </div>
        {factor.status ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <XCircle className="h-5 w-5 text-red-400" />
        )}
      </div>
    </div>

    {/* Progress Bar */}
    <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-slate-700">
      <div
        className={`h-3 rounded-full transition-all duration-1000 ${
          factor.score >= 70
            ? "bg-gradient-to-r from-green-400 to-green-600"
            : factor.score >= 50
              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
              : "bg-gradient-to-r from-red-400 to-red-600"
        }`}
        style={{ width: `${factor.score}%` }}
      />
    </div>

    {factor.concern && (
      <div className="mt-2 rounded-lg border border-red-700/50 bg-red-900/20 p-3">
        <p className="flex items-start text-sm text-red-200">
          <AlertCircle className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-red-400" />
          {factor.concern}
        </p>
      </div>
    )}

    {/* Expanded Details */}
    {isSelected && (
      <div className="animate-slide-down mt-4 rounded-lg border border-purple-600/50 bg-slate-800/50 p-4">
        <h4 className="mb-2 font-semibold text-purple-300">
          Risk Analysis Details
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Current Status:</span>
            <div
              className={`font-medium ${factor.status ? "text-green-400" : "text-red-400"}`}
            >
              {factor.status ? "Passed" : "Failed"}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Risk Level:</span>
            <div
              className={`font-medium ${
                factor.score >= 70
                  ? "text-green-400"
                  : factor.score >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            >
              {factor.score >= 70
                ? "Low"
                : factor.score >= 50
                  ? "Medium"
                  : "High"}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Impact:</span>
            <div
              className={`font-medium ${
                factor.impact === "high"
                  ? "text-red-400"
                  : factor.impact === "medium"
                    ? "text-yellow-400"
                    : "text-green-400"
              }`}
            >
              {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Category:</span>
            <div className="font-medium text-purple-400 capitalize">
              {factor.category}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Dark Decision Badge
const DarkDecisionBadge = ({ decision, size = "normal" }) => {
  const isApprove = decision === "approve";
  const sizeClasses =
    size === "large" ? "px-6 py-3 text-base" : "px-4 py-2 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold shadow-lg transition-all hover:scale-105 ${sizeClasses} ${
        isApprove
          ? "border border-green-600/50 bg-green-900/30 text-green-300"
          : "border border-red-600/50 bg-red-900/30 text-red-300"
      }`}
    >
      {isApprove ? (
        <>
          <div className="mr-2 rounded-full bg-green-800/50 p-1">
            <CheckCircle className="h-4 w-4 text-green-400" />
          </div>
          {size === "large" ? "CHẤP THUẬN" : "Chấp thuận"}
        </>
      ) : (
        <>
          <div className="mr-2 rounded-full bg-red-800/50 p-1">
            <XCircle className="h-4 w-4 text-red-400" />
          </div>
          {size === "large" ? "TỪ CHỐI" : "Từ chối"}
        </>
      )}
    </span>
  );
};

// Dark Conflict Indicator
const DarkConflictIndicator = ({ agentDecision, criticalDecision }) => {
  const hasConflict = agentDecision !== criticalDecision;

  if (hasConflict) {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-1 rounded-full bg-red-900/50 p-2 text-red-400">
          <AlertCircle className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium text-red-300">Conflict</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-1 rounded-full bg-green-900/50 p-2 text-green-400">
        <CheckCircle className="h-4 w-4" />
      </div>
      <span className="text-xs font-medium text-green-300">Aligned</span>
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

export default DarkLoanDashboard;
