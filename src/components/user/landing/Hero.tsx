import Section from "./Section.tsx";
import Button from "../elements/Button.tsx";
import { gradientBackground } from "../../../assets/index.ts";
import { HeroSvg } from "../../../assets/index.ts";
const Hero = () => {
  return (
    <Section
      className="-mt-[5.25rem] pt-[12rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div>
        <img
          src={gradientBackground}
          alt="heroBackground"
          width="full"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 lg:flex-row lg:px-8 lg:py-24">
        {/* Left - Text */}
        <div className="w-full lg:w-1/2">
          <div className="headline">
            <h1 className="mb-6 text-left text-3xl leading-tight font-extrabold lg:text-left lg:text-4xl">
              Mở khóa tương lai tài chính của bạn ngay hôm nay
            </h1>
          </div>
          <p className="mb-6 text-lg text-gray-700">
            StudentCredit là nền tảng chấm điểm tín dụng tiên phong, giúp sinh
            viên chứng minh năng lực và tiềm năng của mình để tiếp cận các khoản
            vay dễ dàng. Bắt đầu xây dựng lịch sử tài chính vững chắc ngay hôm
            nay, không cần chứng minh thu nhập.
          </p>
          <Button variant="outline" className="text-black">
            Đăng ký ngay
          </Button>

          <div className="pt-6">
            <ul className="flex gap-4 text-sm">
              <li className="w-1/2">Không cần chứng minh thu thập</li>
              <li>Đánh giá nhanh chóng</li>
            </ul>
          </div>
        </div>

        {/* Right - Ảnh minh */}
        <div className="w-full lg:w-1/2">
          <div className="flex h-64 w-full items-center justify-center rounded-xl bg-transparent lg:h-[360px]">
            <img src={HeroSvg} alt="heroSvg" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
