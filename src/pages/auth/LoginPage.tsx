import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { AuthError } from "@/types";
import { useAuthStore } from "../../store/authStore";

const loginSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  password: z.string().min(1, { message: "Password is not valid" }),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleFocus = (field: keyof AuthError) => {
    if (error) {
      clearError(field);
    }
  };

  const onSubmit = (data:any) => {
    if (error){}
    login.mutate(data);
  };

  return (
    <div className="flex flex-col justify-center p-8 md:p-12">
      {/* Logo và Tiêu đề */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Chào mừng!</h1>
        <p className="mt-2 text-gray-600">Đăng nhập để tiếp tục</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Input Email */}
        <div className="relative mb-4">
          <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            onFocus={()=>{
              handleFocus("email")
            }}
            placeholder="Email của bạn"
            className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
          {error.email && (
            <p className="mt-1 text-xs text-red-600">{error.email}</p>
          )}
        </div>

        {/* Input Password */}
        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            autoComplete="password"
            placeholder="Mật khẩu"
            {...register("password")}
            onFocus={() => handleFocus("password")}
            className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
          {error.password && (
            <p className="mt-1 text-xs text-red-600">{error.password}</p>
          )}
        </div>

        {/* Tùy chọn Ghi nhớ và Quên mật khẩu */}
        <div className="mb-6 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 rounded border-gray-300 bg-white text-cyan-600 focus:ring-cyan-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-600">
              Ghi nhớ tôi
            </label>
          </div>
          <a href="#" className="font-medium text-cyan-600 hover:opacity-60">
            Quên mật khẩu?
          </a>
        </div>

        {/* Nút Đăng nhập chính */}
        <button
          type="submit"
          className="w-full transform cursor-pointer rounded-lg bg-cyan-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-600"
        >
          Đăng nhập
        </button>
      </form>

      {/* Dải phân cách "Hoặc" */}
      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 flex-shrink text-sm text-gray-500">
          Hoặc đăng nhập với
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Nút Đăng nhập mạng xã hội */}
      <div className="flex flex-col gap-4">
        <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-gray-700 transition-colors duration-300 hover:bg-gray-50">
          <FcGoogle size={22} />
          <span>Đăng nhập với Google</span>
        </button>
        <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-transparent bg-blue-600 py-3 text-white transition-colors duration-300 hover:bg-blue-700">
          <FaFacebook size={22} />
          <span>Đăng nhập với Facebook</span>
        </button>
      </div>

      {/* Link sang trang Đăng ký */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <a
          onClick={() => {
            navigate("/auth/register");
          }}
          className="cursor-pointer font-bold text-cyan-600 hover:text-cyan-700"
        >
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
