import Section from "./Section.tsx";
import Button from "../elements/Button.tsx";
import { gradientBackground } from "../../../assets/index.ts";
import { HeroSvg } from "../../../assets/index.ts";

const Hero = () => {
  return (
    <Section
      className="-mt-[5.25rem] pt-[12rem] relative overflow-hidden"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      {/* Background với gradient đẹp */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-pink-600/10 rounded-3xl" />
        <img
          src={gradientBackground}
          alt="heroBackground"
          width="full"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-30 rounded-3xl"
        />
      </div>

      {/* Floating elements for decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 lg:flex-row lg:px-8 lg:py-24">
        {/* Left - Text */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="headline">
            <h1 className="mb-6 text-left text-4xl leading-tight font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent lg:text-left lg:text-6xl animate-fade-in">
              Mở khóa tương lai tài chính của bạn ngay hôm nay
            </h1>
          </div>
          
          <p className="mb-8 text-xl text-gray-700 leading-relaxed animate-fade-in-delayed">
            StudentCredit là nền tảng chấm điểm tín dụng tiên phong, giúp sinh
            viên chứng minh năng lực và tiềm năng của mình để tiếp cận các khoản
            vay dễ dàng. Bắt đầu xây dựng lịch sử tài chính vững chắc ngay hôm
            nay, không cần chứng minh thu nhập.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed-2">
            <Button 
              variant="primary" 
              to="/auth/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Đăng ký ngay
            </Button>
            <Button 
              variant="outline" 
              href="#features"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              📖 Tìm hiểu thêm
            </Button>
          </div>

          <div className="pt-8 animate-fade-in-delayed-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20 hover:bg-white/70 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">✓</span>
                </div>
                <span className="text-gray-800 font-semibold">Không cần chứng minh thu nhập</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20 hover:bg-white/70 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">⚡</span>
                </div>
                <span className="text-gray-800 font-semibold">Đánh giá nhanh chóng</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="pt-8 animate-fade-in-delayed-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-gray-600">Sinh viên tin tưởng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-gray-600">Tỷ lệ phê duyệt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">24h</div>
                <div className="text-sm text-gray-600">Xử lý nhanh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="w-full lg:w-1/2 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-30 scale-110" />
            <div className="relative flex h-64 w-full items-center justify-center rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl lg:h-[400px] overflow-hidden">
              <img 
                src={HeroSvg} 
                alt="heroSvg" 
                className="w-full h-full object-contain scale-90 hover:scale-95 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
