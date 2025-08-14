// Dark Theme Admin Comment Component
import React, { useState } from "react";
import {
  MessageSquare,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react";  

const AdminComent = ({ agentKey }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Cần xem xét thêm về khả năng sinh viên duy trì GPA trong năm cuối",
      timestamp: "2025-08-07 12:30",
      author: "Admin Nguyễn Minh",
      type: "warning",
    },
    {
      id: 2,
      text: "Đã xác nhận thông tin bảo lãnh, có thể giảm thiểu rủi ro",
      timestamp: "2025-08-07 12:45",
      author: "Admin Trần Hoa",
      type: "info",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        timestamp: new Date().toLocaleString("vi-VN"),
        author: "Admin Current User",
        type: "info",
      };
      setComments([...comments, newComment]);
      setComment("");
      setIsTyping(false);
    }
  };

  return (
    <div className="border-t border-gray-700 pt-6 bg-transparent p-8">
      <h4 className="mb-4 flex items-center font-semibold text-gray-100">
        <div className="mr-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-1">
          <MessageSquare className="h-4 w-4 text-white" />
        </div>
        Phản hồi của Admin ({comments.length})
      </h4>

      {/* Dark Theme Comments Display */}
      <div className="mb-6 max-h-60 space-y-3 overflow-y-auto">
        {comments.map((commentItem) => (
          <div
            key={commentItem.id}
            className={`rounded-xl border p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
              commentItem.type === "warning"
                ? "border-yellow-700 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 hover:from-yellow-900/30 hover:to-amber-900/30"
                : "border-blue-700 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 hover:from-blue-900/30 hover:to-indigo-900/30"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`rounded-full p-1 ${
                  commentItem.type === "warning"
                    ? "bg-yellow-800/50"
                    : "bg-blue-800/50"
                }`}
              >
                {commentItem.type === "warning" ? (
                  <AlertCircle className="h-3 w-3 text-yellow-400" />
                ) : (
                  <Info className="h-3 w-3 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm leading-relaxed ${
                    commentItem.type === "warning"
                      ? "text-yellow-200"
                      : "text-blue-200"
                  }`}
                >
                  {commentItem.text}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span
                    className={`font-medium ${
                      commentItem.type === "warning"
                        ? "text-yellow-300"
                        : "text-blue-300"
                    }`}
                  >
                    {commentItem.author}
                  </span>
                  <span
                    className={`${
                      commentItem.type === "warning"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {commentItem.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dark Theme Comment Input */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              placeholder="Nhập phản hồi của bạn..."
              className="w-full resize-none rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 text-gray-100 placeholder-gray-400 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              rows="3"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            {isTyping && (
              <div className="absolute right-2 bottom-2 text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </div>
            )}
          </div>
          <button
            onClick={handleAddComment}
            disabled={!comment.trim()}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="flex items-center space-x-2">
              <span>Gửi</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Dark Theme Quick Actions */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Quick actions:</span>
          {[
            "✅ Approved",
            "⚠️ Needs Review", 
            "❌ Rejected",
            "📝 Additional Info Needed",
          ].map((action) => (
            <button
              key={action}
              onClick={() => setComment(action)}
              className="rounded-lg bg-gray-700 px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-600 hover:text-gray-100"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminComent;