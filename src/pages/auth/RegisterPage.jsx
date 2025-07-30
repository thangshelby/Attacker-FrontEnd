import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";

const registerSchema = z
  .object({
    user_name: z.string().min(1, { message: "Họ và tên không được để trống" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"], // Gán lỗi cho trường confirmPassword
  });

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const { error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFocus = () => {
    if (error) {
      clearError();
    }
  };

  const onSubmit = (data) => {
    const { confirmPassword, ...apiData } = data;
    signUp.mutate(apiData);
  };

  return (
    // Layout chính - chiếm toàn bộ màn hình và có nền gradient
    <div className="flex flex-col justify-center p-8 md:p-6">
      {signUp.isPending && (
        <div className="bg-opacity-50 absolute z-10 flex h-full w-full items-center justify-center bg-black/60">
          Loading...
        </div>
      )}
      {/* Logo và Tiêu đề */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Tạo tài khoản</h1>
        <p className="mt-2 text-gray-600">
          Bắt đầu hành trình của bạn ngay hôm nay
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex gap-4">
          {/* Input Họ và tên */}
          <div className="relative mb-4">
            <div className="relative">
              <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="user_name"
                type="text"
                autoComplete="user_name"
                {...register("user_name")}
                placeholder="Họ và tên của bạn"
                onFocus={handleFocus}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>
            {errors.user_name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.user_name.message}
              </p>
            )}
          </div>
          {/* Input Email */}
          <div className="relative mb-4 flex flex-col">
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                onFocus={handleFocus}
                placeholder="Email của bạn"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>
            {errors.email && !errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
            {error.email && (
              <p className="mt-1 text-xs text-red-600">{error.email}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          {/* Input Password */}
          <div className="relative mb-4 flex flex-col">
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Tạo mật khẩu"
                {...register("password")}
                onFocus={handleFocus}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>
            {errors.password && !errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Input Xác nhận Password */}
          <div className="relative mb-4 flex flex-col">
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                {...register("confirmPassword")}
                onFocus={handleFocus}
                placeholder="Xác nhận mật khẩu"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>
            {errors.confirmPassword && !errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
            {error.password && (
              <p className="mt-1 text-xs text-red-600">{error.password}</p>
            )}
          </div>
        </div>

        {/* Điều khoản dịch vụ */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            Tôi đồng ý với{" "}
            <a
              href="#"
              className="font-medium text-cyan-600 hover:text-cyan-700"
            >
              Điều khoản Dịch vụ
            </a>
          </label>
        </div>

        {/* Nút Đăng ký chính */}
        <button
          type="submit"
          disabled={signUp.isPending}
          className="w-full transform cursor-pointer rounded-lg bg-cyan-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-600"
        >
          Đăng ký
        </button>
        {error.server && (
          <p className="mt-1 text-xs text-red-600">{error.server}</p>
        )}
      </form>

      {/* Dải phân cách "Hoặc" */}
      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 flex-shrink text-sm text-gray-500">
          Hoặc đăng ký với
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Nút Đăng ký mạng xã hội */}
      <div className="flex flex-col gap-4">
        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-gray-700 transition-colors duration-300 hover:bg-gray-50">
          <FcGoogle size={22} />
          <span>Đăng ký với Google</span>
        </button>
        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-transparent bg-blue-600 py-3 text-white transition-colors duration-300 hover:bg-blue-700">
          <FaFacebook size={22} />
          <span>Đăng ký với Facebook</span>
        </button>
      </div>

      {/* Link sang trang Đăng nhập */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <a
          onClick={() => {
            navigate("/auth/login");
          }}
          className="cursor-pointer font-bold text-cyan-600 hover:text-cyan-700"
        >
          Đăng nhập
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
