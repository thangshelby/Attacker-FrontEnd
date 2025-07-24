import Section from "./Section";
import { ctaImg } from "../../assets";
const CTA = () => {
  return (
    <Section id="cta" className="py-20">
      <div className="container mx-auto px-4">
        {/*
          THAY ĐỔI CHÍNH Ở ĐÂY:
          - Thêm: flex, items-center, justify-center để căn giữa nội dung.
          - Thêm: min-h-[450px] để đảm bảo box đủ cao.
        */}
        <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-gray-800 p-8 text-center shadow-xl md:min-h-[450px]">
          {/* 1. Ảnh nền */}
          <img
            src={ctaImg}
            alt="Sinh viên đang học tập"
            // Thêm object-center để đảm bảo ảnh được căn giữa
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* 2. Lớp phủ tối */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* 3. Nội dung chính */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Sẵn sàng để trải nghiệm ứng dụng của chúng tôi bây giờ chưa?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200">
              Đừng để những khó khăn tài chính tạm thời cản bước bạn trên con
              đường học vấn. Hãy để chúng tôi đồng hành cùng bạn.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#login"
                className="transform rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-700"
              >
                Đăng nhập
              </a>
              <a
                href="#signup"
                className="transform rounded-lg border border-white/50 bg-white/10 px-7 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-white/20"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTA;
