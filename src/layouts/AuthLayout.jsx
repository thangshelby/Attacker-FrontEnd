import { Outlet } from "react-router-dom";
import { logo } from "../assets";

const AuthLayout = () => {
  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-gray-100 p-4">
      <div className="w-full max-w-7xl rounded-2xl bg-white shadow-lg lg:grid lg:grid-cols-2">
        <div className="h-full w-full">
          <Outlet />
        </div>

        <div className="relative hidden items-center justify-center bg-cyan-500 shadow-2xl lg:flex">
          {/* Lớp phủ Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80"></div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-y-4 p-12 text-center text-white">
            <div className="flex items-center gap-1">
              <img className="h-12 w-12" src={logo} />
              <h3 className="text-2xl font-semibold text-gray-900">
                Student Credits
              </h3>
            </div>
            <h2 className="text-4xl leading-tight font-bold">
              Bắt đầu hành trình của bạn
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Truy cập vào nền tảng của chúng tôi để khám phá những tính năng
              tuyệt vời.
            </p>
            {/* Bạn có thể thêm một hình ảnh SVG hoặc logo ở đây */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
