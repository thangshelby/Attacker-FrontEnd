import AdminComent from "@/components/admin/loandetail/AdminComment";
import { useState } from "react";
import {
  MessageSquare,
  ChevronDown,
  FileText,
  Shield,
  Target,
  MessageCircle,
} from "lucide-react";

import DecisionBadge from "./DecisionBade";

const AgentDebate = ({
  selectedLoan,
  masConversation,
  expandedAgent,
  setExpandedAgent,
}) => {
  const criticalAgents = [
    {
      key: "critical_academic",
      name: "Critical Academic Agent",
      avatar: "🎓",
      color: "from-orange-500 via-red-500 to-pink-500",
      data: masConversation?.responses.critical_academic,
      severity: "high",
      category: "academic",
    },
    {
      key: "critical_finance",
      name: "Critical Finance Agent",
      avatar: "💰",
      color: "from-purple-500 via-pink-500 to-red-500",
      data: masConversation?.responses.critical_finance,
      severity: "medium",
      category: "finance",
    },
  ];
  // console.log(mas);
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
        <div className="flex flex-row gap-4 space-y-6">
          {criticalAgents.map((agent) => (
            <div className="flex-1" key={agent.key}>
              <CriticalAgentCard
                agent={agent}
                isExpanded={expandedAgent === agent.key}
                onToggleExpand={() =>
                  setExpandedAgent(
                    expandedAgent === agent.key ? null : agent.key,
                  )
                }
              />
            </div>
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

export default AgentDebate;

const CriticalAgentCard = ({ agent, isExpanded, onToggleExpand }) => (
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
          <DecisionBadge decision={agent.data?.recommended_decision} />
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
    <AdminComent agentKey={agent.key} />
  </div>
);
