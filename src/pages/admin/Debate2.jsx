import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Mic,
  Paperclip,
  MoreVertical,
  Users,
  Brain,
  MessageSquare,
  Settings,
  Sidebar,
  Plus,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  TrendingUp,
  Eye,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Maximize2,
  Volume2,
  Share,
} from "lucide-react";

const MultiAgentChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgents, setActiveAgents] = useState([]);
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const [currentConversation, setCurrentConversation] = useState("new");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Agent definitions with personalities
  const agents = [
    {
      id: "academic",
      name: "Dr. Academic",
      role: "Academic Analyst",
      avatar: "🎓",
      color: "bg-blue-500",
      personality: "Analytical, thorough, evidence-based",
      specialty: "Educational background, GPA analysis, academic potential",
      status: "online",
    },
    {
      id: "finance",
      name: "Prof. Finance",
      role: "Financial Advisor",
      avatar: "💰",
      color: "bg-green-500",
      personality: "Practical, risk-aware, numbers-focused",
      specialty: "Income analysis, debt ratios, financial stability",
      status: "online",
    },
    {
      id: "risk",
      name: "Agent Risk",
      role: "Risk Assessor",
      avatar: "⚖️",
      color: "bg-amber-500",
      personality: "Cautious, detail-oriented, scenario-planning",
      specialty: "Market risks, credit assessment, probability analysis",
      status: "thinking",
    },
    {
      id: "critic",
      name: "Devil's Advocate",
      role: "Critical Reviewer",
      avatar: "🔍",
      color: "bg-purple-500",
      personality: "Skeptical, challenging, thorough questioner",
      specialty: "Finding weaknesses, alternative perspectives, due diligence",
      status: "online",
    },
  ];

  // Sample conversations for sidebar
  const conversations = [
    { id: "new", title: "New Chat", time: "now", preview: "" },
    {
      id: "conv1",
      title: "Student Loan Analysis",
      time: "2 hours ago",
      preview: "Analyzing loan request for FINTECH student...",
    },
    {
      id: "conv2",
      title: "Risk Assessment Discussion",
      time: "1 day ago",
      preview: "Multi-agent debate on high-risk application...",
    },
    {
      id: "conv3",
      title: "Academic Performance Review",
      time: "3 days ago",
      preview: "GPA analysis and academic potential evaluation...",
    },
  ];

  // Mock loan data
  const mockLoan = {
    studentInfo: {
      name: "Nguyễn Văn A",
      university: "Đại học Kinh Tế - Luật - ĐHQG TPHCM",
      major: "FINTECH",
      year: "3",
      gpa: 3.8,
    },
    loan_amount_requested: 50000000,
    monthly_installment: 2500000,
  };

  // Agent response templates
  const agentResponses = {
    academic: {
      greeting:
        "Xin chào! Tôi là Dr. Academic. Tôi sẽ phân tích khía cạnh học thuật của hồ sơ này.",
      analysis: `Dựa trên thông tin sinh viên ${mockLoan.studentInfo.name}:
      
📊 **Phân tích học thuật:**
• GPA: ${mockLoan.studentInfo.gpa}/4.0 - Xuất sắc (top 15%)
• Ngành học: ${mockLoan.studentInfo.major} - Có triển vọng cao
• Năm học: Năm ${mockLoan.studentInfo.year} - Sắp ra trường
• Trường: ${mockLoan.studentInfo.university}

✅ **Đánh giá:** APPROVE - Sinh viên có năng lực học tập tốt, ngành học có tính ứng dụng cao.`,

      concern:
        "Tuy nhiên, cần lưu ý rằng ngành FINTECH đòi hỏi sự cập nhật liên tục về công nghệ...",
    },

    finance: {
      greeting:
        "Chào bạn! Tôi là Prof. Finance, chuyên gia về tài chính. Để tôi phân tích khả năng tài chính.",
      analysis: `💰 **Phân tích tài chính:**
• Số tiền vay: ${(mockLoan.loan_amount_requested / 1000000).toFixed(0)} triệu VND
• Trả góp hàng tháng: ${(mockLoan.monthly_installment / 1000000).toFixed(1)} triệu VND
• Tỷ lệ debt-to-income dự kiến: ~15-20%
• Thu nhập gia đình: Khoảng 30 triệu/tháng

✅ **Kết luận:** APPROVE - Tỷ lệ vay hợp lý, khả năng trả nợ tốt.`,

      warning:
        "⚠️ Cần theo dõi thu nhập sau tốt nghiệp để đảm bảo khả năng trả nợ.",
    },

    risk: {
      greeting:
        "Tôi là Agent Risk. Nhiệm vụ của tôi là đánh giá mọi rủi ro tiềm ẩn.",
      analysis: `⚖️ **Đánh giá rủi ro:**
• Rủi ro thị trường: TRUNG BÌNH (ngành IT biến động)
• Rủi ro tín dụng: THẤP (GPA cao, gia đình ổn định)  
• Rủi ro thanh khoản: THẤP (số tiền vay hợp lý)
• Rủi ro vĩ mô: THẤP (kinh tế ổn định)

📊 **Xác suất vỡ nợ:** 2.1% (rất thấp)
✅ **Khuyến nghị:** APPROVE với điều kiện theo dõi.`,

      scenarios:
        "🎯 Tôi đã mô phỏng 1000 kịch bản khác nhau, 94.3% cho kết quả tích cực.",
    },

    critic: {
      greeting:
        "Xin chào, tôi là Devil's Advocate. Tôi sẽ đặt ra những câu hỏi khó và thách thức mọi giả định.",
      analysis: `🔍 **Phân tích phản biện:**
• Ngành FINTECH cạnh tranh gay gắt - liệu có đảm bảo việc làm?
• GPA cao nhưng có phản ánh đúng năng lực thực tế?
• Gia đình có thực sự ổn định tài chính?
• Sinh viên năm 3 - còn 2 năm nữa mới ra trường

⚠️ **Mối quan ngại:** Thị trường công nghệ biến động, cần cân nhắc kỹ.`,

      conclusion:
        "🤔 Sau khi cân nhắc, tôi vẫn ĐỒNG Ý nhưng với điều kiện giám sát chặt chẽ.",
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Council response
    setTimeout(() => {
      startAgentDiscussion(inputValue);
    }, 1000);
  };

  const startAgentDiscussion = async (userQuery) => {
    setActiveAgents(["academic", "finance", "risk", "critic"]);

    // Agent 1: Academic
    setTimeout(() => {
      addAgentMessage("academic", agentResponses.academic.greeting);
    }, 1500);

    setTimeout(() => {
      addAgentMessage("academic", agentResponses.academic.analysis);
    }, 3000);

    // Agent 2: Finance
    setTimeout(() => {
      addAgentMessage("finance", agentResponses.finance.greeting);
    }, 4500);

    setTimeout(() => {
      addAgentMessage("finance", agentResponses.finance.analysis);
    }, 6000);

    // Agent 3: Risk
    setTimeout(() => {
      addAgentMessage("risk", agentResponses.risk.greeting);
    }, 7500);

    setTimeout(() => {
      addAgentMessage("risk", agentResponses.risk.analysis);
    }, 9000);

    // Agent 4: Critic (Counter-argument)
    setTimeout(() => {
      addAgentMessage("critic", agentResponses.critic.greeting);
    }, 10500);

    setTimeout(() => {
      addAgentMessage("critic", agentResponses.critic.analysis);
    }, 12000);

    // Final consensus
    setTimeout(() => {
      addConsensusMessage();
      setIsTyping(false);
      setActiveAgents([]);
    }, 14000);
  };

  const addAgentMessage = (agentId, content) => {
    const agent = agents.find((a) => a.id === agentId);
    const message = {
      id: Date.now() + Math.random(),
      type: "agent",
      agent: agent,
      content: content,
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, message]);

    // Remove typing indicator after a delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, isTyping: false } : msg,
        ),
      );
    }, 2000);
  };

  const addConsensusMessage = () => {
    const consensusMessage = {
      id: Date.now(),
      type: "consensus",
      content: `🏆 **CONSENSUS ĐẠT ĐƯỢC!**

Sau khi thảo luận sâu, hội đồng AI đã đạt được đồng thuận:

✅ **QUYẾT ĐỊNH: CHẤP THUẬN KHOẢN VAY**

**📋 Tóm tắt đánh giá:**
• **Academic**: Sinh viên xuất sắc, ngành học có triển vọng
• **Finance**: Tỷ lệ vay hợp lý, khả năng trả nợ tốt  
• **Risk**: Rủi ro thấp, xác suất vỡ nợ 2.1%
• **Critic**: Đồng ý với điều kiện giám sát

**🎯 Điều kiện:**
- Theo dõi tiến độ học tập
- Đánh giá lại sau 6 tháng
- Hỗ trợ tư vấn nghề nghiệp

**📊 Độ tin cậy:** 94.3%`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, consensusMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const AgentTypingIndicator = ({ agent }) => (
    <div className="mb-2 flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2">
      <div
        className={`h-8 w-8 ${agent.color} flex items-center justify-center rounded-full text-sm`}
      >
        {agent.avatar}
      </div>
      <span className="text-sm text-slate-300">{agent.name} đang suy nghĩ</span>
      <div className="flex gap-1">
        <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
          style={{ animationDelay: "0.2s" }}
        />
      </div>
    </div>
  );

  const MessageBubble = ({ message }) => {
    if (message.type === "user") {
      return (
        <div className="mb-4 flex justify-end">
          <div className="max-w-[1000px] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white shadow-lg">
            <p className="whitespace-pre-wrap">{message.content}</p>
            <div className="mt-2 flex items-center justify-end gap-2 text-xs opacity-70">
              <span>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "agent") {
      return (
        <div className="mb-4 flex gap-3">
          <div
            className={`h-10 w-10 ${message.agent.color} flex items-center justify-center rounded-full text-lg shadow-lg`}
          >
            {message.agent.avatar}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-semibold text-white">
                {message.agent.name}
              </span>
              <span className="text-xs text-slate-400">
                {message.agent.role}
              </span>
              {message.isTyping && (
                <span className="animate-pulse rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                  Đang phân tích...
                </span>
              )}
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-800/70 px-4 py-3 shadow-lg">
              <div className="prose prose-sm prose-invert max-w-[1000px]">
                <div className="whitespace-pre-wrap text-slate-200">
                  {message.content}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="text-slate-400 transition-colors hover:text-green-400">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="text-slate-400 transition-colors hover:text-red-400">
                    <ThumbsDown size={14} />
                  </button>
                  <button className="text-slate-400 transition-colors hover:text-blue-400">
                    <Copy size={14} />
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "consensus") {
      return (
        <div className="mb-6">
          <div className="rounded-2xl border border-green-500/30 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  AI Council Decision
                </h3>
                <p className="text-sm text-green-300">
                  Unanimous consensus reached
                </p>
              </div>
            </div>
            <div className="prose prose-sm prose-invert max-w-[1000px]">
              <div className="whitespace-pre-wrap text-slate-200">
                {message.content}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-600 pt-4">
              <div className="flex gap-2">
                <button className="text-slate-400 transition-colors hover:text-green-400">
                  <ThumbsUp size={14} />
                </button>
                <button className="text-slate-400 transition-colors hover:text-red-400">
                  <ThumbsDown size={14} />
                </button>
                <button className="text-slate-400 transition-colors hover:text-blue-400">
                  <Share size={14} />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div
        className={`${showAgentPanel ? "w-80" : "w-0"} overflow-hidden border-r border-slate-700 bg-slate-800 transition-all duration-300`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="text-purple-400" size={24} />
              <h1 className="text-lg font-bold">AI Council</h1>
            </div>
            <button
              onClick={() => setShowAgentPanel(false)}
              className="rounded-lg p-2 transition-colors hover:bg-slate-700"
            >
              <Sidebar size={16} />
            </button>
          </div>

          {/* New Chat Button */}
          <button className="mb-4 flex w-full items-center gap-3 rounded-lg bg-slate-700 p-3 transition-colors hover:bg-slate-600">
            <Plus size={16} />
            <span>New Chat</span>
          </button>

          {/* Conversations */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-slate-400">
              Recent Conversations
            </h3>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`cursor-pointer rounded-lg p-3 transition-colors ${
                    currentConversation === conv.id
                      ? "border-l-2 border-purple-500 bg-slate-700"
                      : "hover:bg-slate-750"
                  }`}
                  onClick={() => setCurrentConversation(conv.id)}
                >
                  <div className="truncate text-sm font-medium">
                    {conv.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{conv.time}</div>
                  {conv.preview && (
                    <div className="mt-1 truncate text-xs text-slate-500">
                      {conv.preview}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Agents */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-400">
              AI Council Members
            </h3>
            <div className="space-y-2">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-3 p-2">
                  <div
                    className={`h-8 w-8 ${agent.color} flex items-center justify-center rounded-full text-sm`}
                  >
                    {agent.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{agent.name}</div>
                    <div className="truncate text-xs text-slate-400">
                      {agent.role}
                    </div>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      activeAgents.includes(agent.id)
                        ? "animate-pulse bg-yellow-500"
                        : agent.status === "online"
                          ? "bg-green-500"
                          : "bg-slate-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!showAgentPanel && (
                <button
                  onClick={() => setShowAgentPanel(true)}
                  className="rounded-lg p-2 transition-colors hover:bg-slate-700"
                >
                  <Sidebar size={16} />
                </button>
              )}
              <div className="flex items-center gap-2">
                <Users className="text-purple-400" size={20} />
                <div>
                  <h2 className="font-semibold">AI Council Chat</h2>
                  <p className="text-sm text-slate-400">
                    Multi-agent loan analysis system
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 transition-colors hover:bg-slate-700">
                <Search size={16} />
              </button>
              <button className="rounded-lg p-2 transition-colors hover:bg-slate-700">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <Brain size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Welcome to AI Council
              </h3>
              <p className="mb-6 text-slate-400">
                Submit a loan application and watch our AI agents discuss and
                analyze in real-time
              </p>
              <div className="mx-auto max-w-[1000px] rounded-lg bg-slate-800 p-4 text-left">
                <h4 className="mb-2 font-medium">Try asking:</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• "Phân tích hồ sơ vay của sinh viên Nguyễn Văn A"</li>
                  <li>• "Đánh giá rủi ro cho khoản vay 50 triệu"</li>
                  <li>• "Tư vấn về khả năng trả nợ"</li>
                </ul>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Typing indicators for active agents */}
          {activeAgents.map((agentId) => {
            const agent = agents.find((a) => a.id === agentId);
            return <AgentTypingIndicator key={agentId} agent={agent} />;
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700 bg-slate-800/50 p-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-end gap-3">
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Gửi câu hỏi cho hội đồng AI... (Enter để gửi)"
                  className="w-full resize-none rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 pr-12 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  rows={1}
                  style={{ minHeight: "44px", maxHeight: "120px" }}
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <button className="rounded-lg p-1.5 transition-colors hover:bg-slate-600">
                    <Paperclip size={16} className="text-slate-400" />
                  </button>
                  <button className="rounded-lg p-1.5 transition-colors hover:bg-slate-600">
                    <Mic size={16} className="text-slate-400" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-3 shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>
                AI Council sẽ phân tích và thảo luận về câu hỏi của bạn
              </span>
              <span>{inputValue.length}/2000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAgentChatInterface;
