import Section from "./Section";
import { benefitContent } from "./constants";
const Benefit = () => {
  return (
    <Section id="benefits" className="bg-slate-100">
      <div className="container mx-auto px-4">
        {/* Tiêu đề của Section */}
        <div className="mb-12 text-center md:mb-20">
          <p className="mb-2 text-sm font-semibold text-purple-600 uppercase">
            Lợi ích
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="text-gray-900">
              Tại sao sinh viên nên sử dụng{" "}
            </span>
            <span className="text-purple-600">StudentCredit</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Chúng tôi không chỉ duyệt vay, chúng tôi trao cho bạn chìa khóa để
            xây dựng một nền tảng tài chính vững chắc.
          </p>
        </div>

        {/* Lưới chứa các card lợi ích - ĐÃ SỬA LẠI CẤU TRÚC */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefitContent.map((item) => (
            // Đây là thẻ div ngoài cùng của CARD, chịu trách nhiệm cho nền, bóng, bo góc.
            <div
              key={item.id}
              className="rounded-xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Thẻ div này không cần thiết nữa vì padding đã được áp dụng ở trên, 
                  nhưng tôi vẫn giữ lại cấu trúc flex để căn chỉnh nội dung. */}
              <div className="flex flex-col items-center">
                <img
                  src={item.iconUrl}
                  alt={item.title}
                  className="mb-5 h-16 w-16" // Bỏ object-contain nếu icon là SVG chuẩn
                />
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefit;
