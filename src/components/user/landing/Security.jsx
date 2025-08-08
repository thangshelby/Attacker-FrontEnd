import { PulseDot } from "../../../assets/customs/svg/Icon";
import Section from "./Section";
import { security } from "./constants";

const Security = () => {
  return (
    <Section id="security">
      <div className="mx-auto w-9/12">
        <div className="heading">
          <p className="mb-2 text-sm font-semibold text-purple-600 uppercase">
            An ninh & Bảo mật
          </p>
          <div className="flex w-full items-center justify-between align-middle">
            <div className="w-1/3">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Dữ liệu của bạn được bảo vệ ở mọi bước
              </h1>
            </div>

            <div className="w-1/3">
              <p className="text-md text-gray-600">
                StudentCredit cam kết bảo vệ thông tin cá nhân của bạn ở mọi
                bước, đảm bảo đáp ứng các tiêu chuẩn bảo mật chuẩn ngân hàng.
              </p>
            </div>
          </div>
        </div>

        <div className="contain pt-15">
          <div className="bg-[#F6F6F6]">
            <div className="pt-10 pr-5 pb-10 pl-5">
              <div className="grid grid-cols-1 flex-col gap-4 md:grid-cols-2 lg:grid-cols-3">
                {security.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-col gap-3 rounded-xl p-8 shadow-sm transition hover:shadow-lg">
                      <PulseDot color={item.iconColor} size={8} />
                      <h1 className="pt-3 text-lg font-extrabold text-gray-900">
                        {item.title}
                      </h1>
                      <p className="text-[14px] text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Security;
