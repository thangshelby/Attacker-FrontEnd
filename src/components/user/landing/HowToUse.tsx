import Section from "./Section";
import { steps } from "./constants";
import Button from "../elements/Button";
import { howToUse } from "../../../assets";

const HowToUse = () => {
  return (
    <Section id="how-to-use">
      <div className="mx-auto w-9/12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-xl border border-white/30">
        <div className="bg-transparent px-8 py-20 rounded-3xl">
          <div className="mx-auto text-center">
            <div className="heading flex flex-row items-center">
              <div className="text-description w-1/2 text-left">
                <p className="mb-2 text-sm font-semibold text-purple-600 uppercase">
                  Quy trình vô cùng đơn giản
                </p>
                <h2 className="text-4xl font-extrabold text-gray-900">
                  Chỉ 3 bước đơn giản để được duyệt vay
                </h2>
              </div>
              <div className="flex w-1/2 justify-end">
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  to="/auth/register"
                >
                  Đăng ký ngay
                </Button>
              </div>
            </div>
            <div className="pt-10">
              <div className="step-flow flex flex-col justify-center gap-8 bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 md:flex-row">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="group w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 md:w-1/3"
                  >
                    {/* Vùng icon + số chồng nhau */}
                    <div className="justify-left relative mb-6 flex h-28 w-full items-center">
                      {/* Số lớn */}
                      <span className="relative text-[120px] leading-none font-bold bg-gradient-to-br from-blue-200 to-purple-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                        0{step.id}
                        {/* Icon lệch xuống phải của số */}
                        <div className="absolute -right-2 -bottom-5 z-10 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={step.iconUrl}
                            alt={step.title}
                            className="h-12 w-12 filter brightness-0 invert"
                          />
                        </div>
                      </span>
                    </div>

                    <h3 className="mb-4 pt-5 text-center text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="illustration pt-10">
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
                <img src={howToUse} alt="illustration" className="w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default HowToUse;
