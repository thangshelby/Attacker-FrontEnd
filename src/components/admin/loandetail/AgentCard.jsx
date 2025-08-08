import React from "react";

import DecisionBadge from "./DecisionBade";

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

export default AgentCard;



