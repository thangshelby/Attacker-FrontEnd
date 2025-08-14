import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  DollarSign,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Users,
  TrendingUp,
  Brain,
  Search,
} from "lucide-react";

// Mock data từ file của bạn
const mockLoan = {
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
      raw_response: "QUYẾT ĐỊNH: APPROVE - GPA cao, hoạt động tốt",
    },
    finance_repredict: {
      decision: "approve",
      reason: "Thu nhập ổn định 30 triệu/tháng, khả năng trả nợ tốt",
      raw_response: "QUYẾT ĐỊNH: APPROVE - Thu nhập ổn định",
    },
    critical_academic: {
      critical_response: "Cần xem xét thêm về khả năng học tập dài hạn",
      recommended_decision: "approve",
      raw_response: "PHẢN BIỆN: Cần theo dõi thêm nhưng chấp nhận",
    },
    critical_finance: {
      critical_response: "Tỷ lệ vay/thu nhập hợp lý ở mức 83%",
      recommended_decision: "approve",
      raw_response: "PHẢN BIỆN: Tỷ lệ hợp lý",
    },
    final_decision: {
      final_result: {
        decision: "approve",
        reason:
          "Đạt tiêu chí học thuật và tài chính với điểm GPA cao và thu nhập ổn định",
        rule_based_pass: true,
        agent_support_available: true,
        hybrid_approach: "objective_rules_with_agent_support",
      },
      error: null,
    },
  },
};

const MultiAgentDebateSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [debateMessages, setDebateMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentStates, setAgentStates] = useState({});
  const [activeAgent, setActiveAgent] = useState(null);

  // Định nghĩa các agent với thông tin chi tiết và trạng thái cảm xúc
  const agents = [
    {
      id: "academic",
      name: "Academic Agent",
      role: "Chuyên gia Học thuật",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500",
      icon: GraduationCap,
      avatar: "🎓",
      decision: mockLoan.responses.academic_repredict.decision,
      reason: mockLoan.responses.academic_repredict.reason,
      confidence: "85%",
      processingTime: 3.2,
      emotions: {
        thinking: "🤔",
        approving: "😊",
        rejecting: "😔",
        analyzing: "🔍",
      },
    },
    {
      id: "finance",
      name: "Finance Agent",
      role: "Chuyên gia Tài chính",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500",
      icon: DollarSign,
      avatar: "💰",
      decision: mockLoan.responses.finance_repredict.decision,
      reason: mockLoan.responses.finance_repredict.reason,
      confidence: "92%",
      processingTime: 2.8,
      emotions: {
        thinking: "💭",
        approving: "🤑",
        rejecting: "😰",
        analyzing: "📊",
      },
    },
    {
      id: "critical_academic",
      name: "Critical Academic",
      role: "Phản biện Học thuật",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500",
      icon: Brain,
      avatar: "🧠",
      decision: mockLoan.responses.critical_academic.recommended_decision,
      reason: mockLoan.responses.critical_academic.critical_response,
      confidence: "78%",
      processingTime: 4.1,
      emotions: {
        thinking: "🤨",
        approving: "😌",
        rejecting: "😠",
        analyzing: "🔬",
      },
    },
    {
      id: "critical_finance",
      name: "Critical Finance",
      role: "Phản biện Tài chính",
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500",
      icon: Search,
      avatar: "🔍",
      decision: mockLoan.responses.critical_finance.recommended_decision,
      reason: mockLoan.responses.critical_finance.critical_response,
      confidence: "81%",
      processingTime: 3.7,
      emotions: {
        thinking: "🧐",
        approving: "😎",
        rejecting: "😡",
        analyzing: "⚖️",
      },
    },
  ];

  // Mô phỏng cuộc tranh luận với trạng thái cảm xúc
  const debateFlow = [
    {
      agent: "academic",
      message: "Đang phân tích hồ sơ học thuật...",
      processingMessage: "Đang đánh giá GPA, hoạt động ngoại khóa...",
      finalMessage:
        "GPA 3.8/4.0 rất ấn tượng! Sinh viên có tiềm năng cao. QUYẾT ĐỊNH: ✅ APPROVE",
      type: "initial",
      emotion: "approving",
      processingTime: 3200,
    },
    {
      agent: "finance",
      message: "Đang tính toán khả năng tài chính...",
      processingMessage: "Phân tích thu nhập, tỷ lệ debt-to-income...",
      finalMessage:
        "Thu nhập 30 triệu/tháng ổn định, tỷ lệ vay hợp lý. Rủi ro thấp. QUYẾT ĐỊNH: ✅ APPROVE",
      type: "initial",
      emotion: "approving",
      processingTime: 2800,
    },
    {
      agent: "critical_academic",
      message: "Hmm, để tôi xem xét kỹ hơn...",
      processingMessage: "Phản biện: Đánh giá rủi ro học tập dài hạn...",
      finalMessage:
        "🤔 Ngành FINTECH khó, nhưng với GPA này... Tôi vẫn ĐỒNG Ý nhưng cần theo dõi.",
      type: "critical",
      emotion: "thinking",
      processingTime: 4100,
    },
    {
      agent: "critical_finance",
      message: "Chờ chút, có vấn đề cần làm rõ...",
      processingMessage: "Kiểm tra lại tỷ lệ vay/thu nhập...",
      finalMessage:
        "⚠️ Tỷ lệ 83% gần giới hạn, nhưng thu nhập đủ tin cậy. Tôi CHẤP NHẬN.",
      type: "critical",
      emotion: "analyzing",
      processingTime: 3700,
    },
    {
      agent: "final",
      message: "Tổng hợp ý kiến từ tất cả agents...",
      processingMessage: "Đạt consensus, tạo báo cáo cuối cùng...",
      finalMessage:
        "🏆 CONSENSUS ĐẠT ĐƯỢC! Tất cả agents đồng thuận: APPROVED với điều kiện theo dõi!",
      type: "final",
      emotion: "approving",
      processingTime: 2000,
    },
  ];

  // Agent Avatar Component với animation
  const AgentAvatar = ({ agent, state, size = "w-16 h-16" }) => {
    const currentEmotion =
      state === "processing"
        ? agent.emotions?.analyzing
        : state === "thinking"
          ? agent.emotions?.thinking
          : state === "approving"
            ? agent.emotions?.approving
            : state === "rejecting"
              ? agent.emotions?.rejecting
              : agent.avatar;

    return (
      <div className={`${size} relative`}>
        <div
          className={`h-full w-full bg-gradient-to-br ${agent.color} flex items-center justify-center rounded-xl border-2 ${agent.borderColor} shadow-lg transition-all duration-300 ${
            state === "processing"
              ? "scale-110 animate-pulse"
              : state === "active"
                ? "scale-105 shadow-xl"
                : ""
          }`}
        >
          <span className="animate-bounce-slow text-2xl">{currentEmotion}</span>
        </div>

        {/* Status indicator */}
        <div
          className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 transition-all duration-300 ${
            state === "processing"
              ? "animate-pulse bg-yellow-500"
              : state === "completed"
                ? "bg-green-500"
                : state === "thinking"
                  ? "animate-ping bg-blue-500"
                  : "bg-slate-600"
          }`}
        ></div>

        {/* Processing ring */}
        {state === "processing" && (
          <div className="absolute inset-0 animate-spin rounded-xl border-4 border-transparent border-t-white opacity-70"></div>
        )}
      </div>
    );
  };

  // Progress bar cho processing time
  const ProcessingProgress = ({ duration, isActive }) => {
    return (
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
            isActive ? "animate-pulse" : ""
          }`}
          style={{
            width: isActive ? "100%" : "0%",
            transition: `width ${duration}ms linear`,
          }}
        ></div>
      </div>
    );
  };

  useEffect(() => {
    if (currentStep < debateFlow.length && isProcessing) {
      const currentFlow = debateFlow[currentStep];

      // Set active agent
      setActiveAgent(currentFlow.agent);

      // Set agent to processing state
      setAgentStates((prev) => ({
        ...prev,
        [currentFlow.agent]: "processing",
      }));

      // Add processing message first
      setDebateMessages((prev) => [
        ...prev,
        {
          ...currentFlow,
          message: currentFlow.processingMessage,
          isProcessing: true,
        },
      ]);

      // After processing time, show final message
      const timer = setTimeout(() => {
        // Update to final message
        setDebateMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...currentFlow,
            message: currentFlow.finalMessage,
            isProcessing: false,
          };
          return updated;
        });

        // Set agent to completed state
        setAgentStates((prev) => ({
          ...prev,
          [currentFlow.agent]: "completed",
        }));

        setCurrentStep(currentStep + 1);
        setActiveAgent(null);
      }, currentFlow.processingTime);

      return () => clearTimeout(timer);
    } else if (currentStep >= debateFlow.length && isProcessing) {
      setIsProcessing(false);
    }
  }, [currentStep, isProcessing]);

  const startDebate = () => {
    setIsProcessing(true);
    setDebateMessages([]);
    setCurrentStep(0);
    setAgentStates({});
    setActiveAgent(null);
  };

  const getAgentInfo = (agentId) => {
    if (agentId === "final") {
      return {
        name: "Final Decision",
        color: "from-indigo-600 to-purple-600",
        borderColor: "border-indigo-500",
        avatar: "🏆",
        role: "Quyết định cuối cùng",
        icon: Shield,
      };
    }
    return agents.find((a) => a.id === agentId);
  };

  const getDecisionIcon = (decision) => {
    switch (decision) {
      case "approve":
        return <CheckCircle className="text-green-400" size={20} />;
      case "reject":
        return <XCircle className="text-red-400" size={20} />;
      default:
        return <Clock className="text-yellow-400" size={20} />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <Users className="text-purple-400" size={32} />
            <h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
              AI Council Live Debate
            </h1>
          </div>
          <p className="text-slate-300">
            Hội đồng AI đa chiều đang suy nghĩ & tương tác thời gian thực
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Agent Status Panel */}
          <div className="lg:col-span-1">
            {/* Student Info */}
            <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <GraduationCap className="text-blue-400" size={20} />
                Hồ sơ đánh giá
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-400">Sinh viên:</p>
                  <p className="font-semibold text-white">
                    {mockLoan.studentInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">GPA:</p>
                  <p className="text-lg font-bold text-green-400">
                    {mockLoan.studentInfo.gpa}/4.0
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Số tiền:</p>
                  <p className="font-bold text-red-400">
                    {formatCurrency(mockLoan.loan_amount_requested)}
                  </p>
                </div>
              </div>
            </div>

            {/* Live Agent Status */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Brain className="text-purple-400" size={20} />
                AI Council Status
              </h3>

              <div className="space-y-4">
                {agents.map((agent) => {
                  const state = agentStates[agent.id] || "idle";
                  const isActive = activeAgent === agent.id;

                  return (
                    <div
                      key={agent.id}
                      className={`rounded-lg border p-4 transition-all duration-300 ${
                        isActive
                          ? `border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20`
                          : state === "completed"
                            ? "border-green-500/30 bg-green-900/10"
                            : "border-slate-600 bg-slate-800/30"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <AgentAvatar
                          agent={agent}
                          state={state}
                          size="w-10 h-10"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {agent.name}
                          </p>
                          <p className="text-xs text-slate-400">{agent.role}</p>
                        </div>
                        <div className="text-right">
                          {getDecisionIcon(agent.decision)}
                          <p className="text-xs text-slate-400">
                            {agent.confidence}
                          </p>
                        </div>
                      </div>

                      {/* Processing time và progress */}
                      {state === "processing" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Đang phân tích...</span>
                            <span>
                              {(agent.processingTime / 1000).toFixed(1)}s
                            </span>
                          </div>
                          <ProcessingProgress
                            duration={agent.processingTime}
                            isActive={true}
                          />
                        </div>
                      )}

                      {state === "completed" && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle size={12} />
                          <span>Hoàn thành phân tích</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Debate Arena */}
          <div className="lg:col-span-3">
            <div className="h-full rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <MessageSquare className="text-purple-400" size={24} />
                  Arena Tranh Luận AI
                </h3>
                <button
                  onClick={startDebate}
                  disabled={isProcessing}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Hội đồng đang họp...
                    </>
                  ) : (
                    <>
                      <TrendingUp size={16} />
                      Triệu tập hội đồng AI
                    </>
                  )}
                </button>
              </div>

              <div className="max-h-96 space-y-6 overflow-y-auto">
                {debateMessages.length === 0 && (
                  <div className="py-12 text-center text-slate-400">
                    <Users size={64} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Hội đồng AI đã sẵn sàng</p>
                    <p className="text-sm">
                      Nhấn "Triệu tập hội đồng AI" để bắt đầu phiên họp
                    </p>
                  </div>
                )}

                {debateMessages.map((msg, index) => {
                  const agent = getAgentInfo(msg.agent);
                  const isActive = activeAgent === msg.agent;

                  return (
                    <div
                      key={index}
                      className={`flex gap-4 rounded-lg p-4 transition-all duration-500 ${
                        msg.type === "final"
                          ? "border border-indigo-500/50 bg-gradient-to-r from-indigo-900/30 to-purple-900/30"
                          : isActive
                            ? "border border-purple-500/30 bg-purple-900/20"
                            : "bg-slate-800/30"
                      } ${index === debateMessages.length - 1 ? "animate-slide-in" : ""}`}
                    >
                      <AgentAvatar
                        agent={agent}
                        state={
                          msg.isProcessing
                            ? "processing"
                            : agentStates[msg.agent]
                        }
                      />

                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <p className="font-semibold text-white">
                            {agent.name}
                          </p>
                          <span className="text-xs text-slate-400">
                            {agent.role}
                          </span>

                          {msg.type === "critical" && (
                            <span className="rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-2 py-1 text-xs text-orange-300">
                              🔥 Phản biện
                            </span>
                          )}

                          {msg.type === "final" && (
                            <span className="rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 py-1 text-xs text-indigo-300">
                              ⚡ Quyết định
                            </span>
                          )}

                          {msg.isProcessing && (
                            <span className="animate-pulse rounded-full border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 text-xs text-yellow-300">
                              🧠 Đang suy nghĩ...
                            </span>
                          )}
                        </div>

                        <div
                          className={`rounded-lg border p-4 transition-all duration-300 ${
                            msg.isProcessing
                              ? "border-yellow-500/30 bg-yellow-900/10"
                              : msg.type === "final"
                                ? "border-indigo-500/30 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"
                                : "border-slate-600 bg-slate-700/50"
                          }`}
                        >
                          <p
                            className={`transition-all duration-300 ${
                              msg.isProcessing
                                ? "animate-pulse text-yellow-300"
                                : "text-slate-200"
                            }`}
                          >
                            {msg.message}
                          </p>

                          {msg.isProcessing && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                              <div className="h-2 w-2 animate-ping rounded-full bg-yellow-500"></div>
                              <span>AI đang phân tích dữ liệu...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final Consensus Result */}
              {debateMessages.length === debateFlow.length && !isProcessing && (
                <div className="mt-6 rounded-lg border border-green-500/50 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 p-6 shadow-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        CONSENSUS ĐẠT ĐƯỢC!
                      </h4>
                      <p className="text-green-300">
                        Tất cả agents đã hoàn thành phân tích
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                    <p className="mb-2 text-lg font-bold text-green-300">
                      ✅ CHẤP THUẬN KHOẢN VAY
                    </p>
                    <p className="text-slate-300">
                      {mockLoan.responses.final_decision.final_result.reason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-3 py-2 text-sm text-green-300">
                      <CheckCircle size={16} />
                      Rule-based: Passed
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-2 text-sm text-blue-300">
                      <Brain size={16} />
                      AI Support: Available
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-2 text-sm text-purple-300">
                      <Users size={16} />
                      Consensus: Unanimous
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default MultiAgentDebateSystem;
