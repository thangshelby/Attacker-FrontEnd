import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Get user context for citizen_id
  
  console.log('FloatingChatBot render - isOpen:', isOpen);
  console.log('User context:', user);
  

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
      console.log('Sending message to API:', userMessage.content);
      console.log('User citizen_id:', user?.citizen_id);
      
      // Prepare request payload with optional citizen_id
      const requestPayload = {
        message: userMessage.content
      };
      
      // Add citizen_id if user is logged in
      if (user?.citizen_id) {
        requestPayload.citizen_id = user.citizen_id;
      }
      
      // Call Python FastAPI service directly
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(requestPayload)
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      console.log('Debug info:', data.debug_info);
      
      // FastAPI response format
      if (data.answer) {
        let botResponse = data.answer;
        
        // Add debug info if in development
        if (import.meta.env.DEV && data.debug_info) {
          const debugInfo = data.debug_info;
          console.log(`🤖 Bot Strategy: ${debugInfo.classification}`);
          console.log(`👤 User Context: ${debugInfo.user_context_available ? 'Available' : 'Not Available'}`);
          console.log(`🆔 Citizen ID: ${debugInfo.citizen_id_provided || 'None'}`);
        }
        
        const botMessage = { 
          id: Date.now() + 1, 
          type: 'bot', 
          content: botResponse || 'Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại sau! 😊'
        };
        setTimeout(() => setMessages(prev => [...prev, botMessage]), 1000);
      } else {
        throw new Error(data.error || 'No answer received from API');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback demo responses
      const demoResponses = [
        "Cảm ơn bạn đã hỏi! 🌟 Về vấn đề này, tôi khuyên bạn nên xem xét các gói vay học phí với lãi suất ưu đãi dành cho sinh viên.",
        "Thật tuyệt khi bạn quan tâm đến tài chính! 💡 Student Credit cung cấp nhiều giải pháp phù hợp với sinh viên.",
        "Đây là câu hỏi rất hay! 🎯 Tôi sẽ giúp bạn tìm hiểu về các chương trình hỗ trợ tài chính phù hợp nhất.",
        "Rất vui được hỗ trợ bạn! ✨ Về vấn đề tín dụng sinh viên, chúng tôi có nhiều chương trình ưu đãi đặc biệt."
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: randomResponse 
      };
      setTimeout(() => setMessages(prev => [...prev, botMessage]), 1500);
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
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999999,
        pointerEvents: 'auto',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={() => {
        console.log('Container clicked - opening chatbot');
        setIsOpen(true);
      }}
    >
      {/* Floating Button */}
      {!isOpen && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={(e) => {
              console.log('Button clicked!', e);
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
              console.log('setIsOpen(true) called');
            }}
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#1f2937',
              border: '2px solid #8b5cf6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 5
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.backgroundColor = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#1f2937';
            }}
          >
            <MessageCircle size={28} color="#a855f7" />
          </button>
          {/* Pulse animation */}
          <div 
            style={{
              position: 'absolute',
              inset: '0',
              background: 'linear-gradient(to right, #9333ea, #ec4899)',
              borderRadius: '50%',
              opacity: '0.3',
              animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
              pointerEvents: 'none', // Không chặn click events
              zIndex: -1 // Đặt phía sau button
            }}
          ></div>
          {/* Notification dot */}
          <div 
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              background: 'linear-gradient(to right, #ef4444, #ec4899)',
              borderRadius: '50%',
              animation: 'bounce 1s infinite',
              pointerEvents: 'none', // Không chặn click events
              zIndex: 10 // Hiển thị trên button
            }}
          ></div>
        </div>
      )}

      {/* Chat Window - Expanded Size */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '450px',
            height: '600px',
            backgroundColor: '#111827',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #374151',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9998
          }}
        >
          
          {/* Header */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#000000',
              color: 'white',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              borderBottom: '1px solid #374151'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="white" />
              </div>
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '16px', color: 'white', margin: '0' }}>Trợ lý AI</h3>
                <p style={{ fontSize: '12px', color: '#10b981', margin: '0' }}>● Online</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                setIsOpen(false);
              }}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.backgroundColor = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#111827',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
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