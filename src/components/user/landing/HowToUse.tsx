import Section from "./Section";
import { steps } from "./constants";
import Button from "../elements/Button";
import { howToUse } from "../../../assets";

const HowToUse = () => {
  return (
    <Section id="how-to-use">
      <div className="mx-auto w-9/12 bg-slate-50">
        <div className="bg-slate-40 px-4 py-16">
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
                  className="bg-blue-500 text-white"
                  to="/register"
                >
                  Đăng ký ngay
                </Button>
              </div>
            </div>
            <div className="pt-10">
              <div className="step-flow flex flex-col justify-center gap-6 bg-white md:flex-row">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="w-full rounded-xl bg-white p-6 shadow md:w-1/3"
                  >
                    {/* Vùng icon + số chồng nhau */}
                    <div className="justify-left relative mb-6 flex h-28 w-full items-center">
                      {/* Số lớn */}
                      <span className="relative text-[120px] leading-none font-bold text-gray-200">
                        0{step.id}
                        {/* Icon lệch xuống phải của số */}
                        <img
                          src={step.iconUrl}
                          alt={step.title}
                          className="absolute -right-2 -bottom-5 z-10 h-20 w-20"
                        />
                      </span>
                    </div>

                    <h3 className="mb-2 pt-5 text-center text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-md text-left text-gray-600">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="illustration pt-10">
              <img src={howToUse} alt="illustration" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default HowToUse;
