import Section from "./Section";
import { ctaImg } from "../../../assets";
const CTA = () => {
  return (
    <Section id="cta" className="py-20">
      <div className="container mx-auto px-4">
        {/*
          THAY ĐỔI CHÍNH Ở ĐÂY:
          - Thêm: flex, items-center, justify-center để căn giữa nội dung.
          - Thêm: min-h-[450px] để đảm bảo box đủ cao.
        */}
        <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-3xl bg-gray-800 p-8 text-center shadow-2xl border border-white/20 md:min-h-[450px]">
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
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <a
                href="/auth/login"
                className="transform rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl"
              >
                Đăng nhập
              </a>
              <a
                href="/auth/register"
                className="transform rounded-xl border-2 border-white/70 bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:shadow-2xl"
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
