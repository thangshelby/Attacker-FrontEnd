import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { useLandingChatbot } from "@/hooks/useLandingChatbot";

const LandingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "👋 Xin chào! Tôi là trợ lý AI của StudentCredit. Tôi có thể giúp bạn tìm hiểu về:\n\n• Thông tin tín dụng sinh viên\n• Điều kiện và thủ tục vay\n• Lãi suất ưu đãi\n• Các câu hỏi khác về dịch vụ\n\nBạn có câu hỏi gì không? 😊",
    },
  ]);
  const { sendMessage } = useLandingChatbot();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || sendMessage.isPending) return;
    
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    sendMessage.mutate(userMessage.content, {
      onSuccess: (data) => {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content:
            data.response ||
            "Cảm ơn bạn đã quan tâm! Để được hỗ trợ tốt nhất, vui lòng đăng ký tài khoản để trải nghiệm đầy đủ dịch vụ của chúng tôi. 😊",
        };
        setMessages((prev) => [...prev, botMessage]);
      },
      onError: (error) => {
        const errorMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: "Hiện tại tôi đang gặp một chút vấn đề. Vui lòng thử lại sau hoặc liên hệ với chúng tôi qua hotline để được hỗ trợ ngay lập tức! 📞",
        };
        setMessages((prev) => [...prev, errorMessage]);
      },
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "💰 Lãi suất bao nhiêu?" },
    { text: "📋 Điều kiện vay là gì?" },
    { text: "⏰ Thời gian xét duyệt?" },
    { text: "📞 Liên hệ tư vấn" },
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action.text);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <button className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl">
            <MessageCircle className="h-8 w-8 transition-transform group-hover:scale-110" />
          </button>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-30"></div>
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 h-5 w-5 animate-bounce rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <span className="text-xs text-white font-bold">?</span>
          </div>

          {/* Tooltip */}
          <div className="absolute right-full top-1/2 mr-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              💬 Có thể tôi giúp gì?
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[500px] w-[400px] flex-col rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    StudentCredit AI
                  </h3>
                  <p className="text-xs text-blue-100">● Sẵn sàng hỗ trợ</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "bot" && (
                  <div className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.type === "user"
                      ? "rounded-br-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "rounded-bl-lg bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {sendMessage.isPending && (
              <div className="flex items-end justify-start gap-2">
                <div className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-bl-lg bg-white border border-gray-200 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-pink-400"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="bg-white border-t border-gray-200 px-4 py-3">
              <p className="mb-2 text-xs font-medium text-gray-500">
                💡 Câu hỏi phổ biến:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => {
                  const colors = [
                    "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                    "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                    "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
                    "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
                  ];
                  return (
                    <button
                      key={action.text}
                      onClick={() => handleQuickAction(action)}
                      className={`bg-gradient-to-r text-xs text-white ${colors[index]} rounded-lg px-2 py-2 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                    >
                      {action.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={sendMessage.isPending}
                className="flex-1 rounded-full border-2 border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || sendMessage.isPending}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingChatbot;
