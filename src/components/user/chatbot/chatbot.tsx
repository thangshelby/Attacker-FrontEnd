import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";

interface ChatMessage {
  id: number;
  type: "user" | "bot";
  content: string;
}

interface QuickAction {
  text: string;
}

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Xin chào! 👋 Tôi là trợ lý AI của Student Credit. Tôi có thể giúp bạn về các thông tin tín dụng sinh viên, học bổng và các dịch vụ tài chính. Bạn có câu hỏi gì không?",
    },
  ]);
  const { sendMessage } = useChatbot();
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (): void => {
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

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim() || sendMessage.isPending) return;
    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    sendMessage.mutate(userMessage.content, {
      onSuccess: (data: any) => {
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          type: "bot",
          content:
            data.response ||
            "Tôi không hiểu câu hỏi của bạn. Bạn có thể thử lại không?",
        };
        setMessages((prev) => [...prev, botMessage]);
      },
      onError: (error: any) => {
        const errorMessage: ChatMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions: QuickAction[] = [
    { text: "Thông tin vay học phí" },
    { text: "Điều kiện vay sinh viên" },
    { text: "Lãi suất ưu đãi" },
    { text: "Thủ tục đăng ký" },
  ];

  const handleQuickAction = (action: QuickAction): void => {
    console.log("Quick action selected:", action.text);
    setInputMessage(action.text);
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={() => {
        setIsOpen(true);
      }}
      className="fixed right-5 bottom-5 z-50 cursor-pointer"
    >
      {/* Floating Button */}
      {!isOpen && (
        <div className="relative">
          <button className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-500 bg-gradient-to-r from-gray-900 to-black text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:from-gray-800 hover:to-gray-900">
            <MessageCircle className="h-7 w-7 text-purple-400 transition-transform group-hover:scale-110" />
          </button>
          {/* Pulse animation */}
          <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30"></div>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 h-4 w-4 animate-bounce rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
        </div>
      )}

      {/* Chat Window - Expanded Size */}
      {isOpen && (
        <div className="flex h-[600px] w-[480px] flex-col rounded-lg border border-gray-700 bg-gray-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg border-b border-gray-700 bg-black p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Trợ lý AI
                </h3>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-900 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "bot" && (
                  <div className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                    msg.type === "user"
                      ? "rounded-br-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "rounded-bl-lg border border-gray-700 bg-gray-800 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {sendMessage.isPending && (
              <div className="flex items-end justify-start gap-2">
                <div className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-bl-lg border border-gray-700 bg-gray-800 px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-pink-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
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
            <div className="border-t border-gray-700 bg-gray-800 px-4 py-3">
              <p className="mb-2 text-xs font-medium text-gray-400">
                💡 Gợi ý:
              </p>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {quickActions.map((action, index) => {
                  const colors = [
                    "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                    "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
                    "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                    "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
                  ];
                  return (
                    <button
                      key={action.text}
                      onClick={() => handleQuickAction(action)}
                      className={`bg-gradient-to-r text-xs text-white ${colors[index]} flex-shrink-0 transform rounded-full px-3 py-1.5 whitespace-nowrap shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                    >
                      {action.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="rounded-b-lg border-t border-gray-700 bg-black p-4">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                disabled={sendMessage.isPending}
                className="flex-1 rounded-full border-2 border-gray-700 bg-gray-800 p-3 text-sm text-white placeholder-gray-400 shadow-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || sendMessage.isPending}
                className="flex h-10 w-10 transform items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl disabled:from-gray-600 disabled:to-gray-700"
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

export default FloatingChatBot;
