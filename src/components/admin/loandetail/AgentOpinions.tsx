import React from "react";
import {
  CheckCircle,
  XCircle,
  Bot,
  Brain,
  TrendingUp,
  Activity,
} from "lucide-react";
import DecisionBadge from "./DecisionBade";

const AgentOpinions = ({ selectedLoan }) => (
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
        <AgentCard
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
        <AgentCard
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

export default AgentOpinions;


// Dark Agent Card
const AgentCard = ({
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
        <DecisionBadge decision={decision} />
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
