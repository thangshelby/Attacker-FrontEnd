import Section from "./Section";
import { faqData } from "./constants";
import { chatBot } from "../../assets";
import { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
        <span className="text-purple-600">
          {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </span>
      </button>
      {/* Nội dung trả lời chỉ hiển thị khi isOpen là true */}
      {isOpen && (
        <div className="mt-3 leading-relaxed text-gray-600">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  // State để lưu ID của câu hỏi đang được mở.
  // Mặc định mở câu hỏi có id = 2 giống trong hình.
  const [openId, setOpenId] = useState(2);

  const handleToggle = (id) => {
    // Nếu click vào câu hỏi đang mở thì đóng lại, ngược lại thì mở câu hỏi mới
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="faq" className="bg-white">
      <div className="container mx-auto px-4">
        {/* Layout 2 cột */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Cột bên trái: Tiêu đề và Chatbot */}
          <div className="text-center lg:text-left">
            <p className="font-semibold text-purple-600 uppercase">FAQ</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Các câu hỏi thường gặp
            </h2>
            {/* Bọc phần text và ảnh vào một div với Flexbox */}
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <p className="text-gray-500">
                Không tìm thấy câu trả lời mong muốn?
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                Trò chuyện cùng với AI. Chúng tôi rất vui lòng khi được hỗ trợ
                bạn
              </p>
              <div className="items-left mt-6">
                <img
                  src={chatBot}
                  alt="Chatbot assistant"
                  className="h-auto w-auto"
                />
              </div>
            </div>
          </div>

          {/* Cột bên phải: Tìm kiếm và danh sách câu hỏi */}
          <div>
            {/* Thanh tìm kiếm */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Bạn đang cần tìm gì?"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Danh sách câu hỏi (Accordion) */}
            <div className="mt-8">
              {faqData.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onClick={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
