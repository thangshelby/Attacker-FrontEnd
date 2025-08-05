import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! 👋 Tôi là trợ lý AI của Student Credit. Tôi có thể giúp bạn về các thông tin tín dụng sinh viên, học bổng và các dịch vụ tài chính. Bạn có câu hỏi gì không?',
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (isOpen) {
        inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content })
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { id: Date.now() + 1, type: 'bot', content: data.response };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      const demoResponses = [
        "Cảm ơn bạn đã hỏi! Về vấn đề này, tôi khuyên bạn nên xem xét các gói vay học phí với lãi suất ưu đãi.",
        "Student Credit cung cấp nhiều giải pháp phù hợp với sinh viên như bạn.",
        "Đây là câu hỏi rất hay! Tôi sẽ giúp bạn tìm hiểu về các chương trình hỗ trợ tài chính.",
      ];
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      const botMessage = { id: Date.now() + 1, type: 'bot', content: randomResponse };
      setTimeout(() => setMessages(prev => [...prev, botMessage]), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { text: "Thông tin vay học phí" },
    { text: "Điều kiện vay sinh viên" },
    { text: "Lãi suất ưu đãi" },
    { text: "Thủ tục đăng ký" }
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action.text);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-gray-900 to-black text-white rounded-full shadow-2xl flex items-center justify-center hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-110 group border-2 border-purple-500"
          >
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform text-purple-400" />
          </button>
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-30"></div>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce"></div>
        </div>
      )}

      {/* Chat Window - Expanded Size */}
      {isOpen && (
        <div className="w-[480px] h-[600px] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black text-white rounded-t-lg border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">Trợ lý AI</h3>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-lg'
                      : 'bg-gray-800 text-gray-100 rounded-bl-lg border border-gray-700'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-lg border border-gray-700 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-gray-700 bg-gray-800">
              <p className="text-xs text-gray-400 mb-2 font-medium">💡 Gợi ý:</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {quickActions.map((action, index) => {
                  const colors = [
                    'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                    'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700', 
                    'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                    'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700'
                  ];
                  return (
                    <button
                      key={action.text}
                      onClick={() => handleQuickAction(action)}
                      className={`text-xs text-white bg-gradient-to-r ${colors[index]} rounded-full px-3 py-1.5 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap flex-shrink-0`}
                    >
                      {action.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700 bg-black rounded-b-lg">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                disabled={isLoading}
                className="flex-1 text-sm p-3 border-2 border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 text-white placeholder-gray-400 shadow-lg"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatBot;