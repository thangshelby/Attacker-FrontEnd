import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import { Loader2 } from "lucide-react";
import { AuthError } from "@/types";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase/config";

const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Họ và tên không được để trống" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với các điều khoản",
    }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"], // Gán lỗi cho trường confirmPassword
  })
  .refine((val) => /^[\w.-]+@[\w.-]+\.edu$/.test(val.email), {
    message: "Email phải thuộc tên miền .edu",
    path: ["email"],
  });

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const { error, clearError, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFocus = (field: keyof AuthError) => {
    if (error) {
      clearError(field);
    }
  };

  const onSubmit = (data: any) => {
    const { confirmPassword, ...apiData } = data;
    signUp.mutate(apiData);
  };

  const handleGoogleLogin = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
      // const user = result.user;
      // setUser(user);
      navigate("/");
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex gap-8">
          {/* Input Họ và tên */}
          <div className="relative">
            <label
              htmlFor={"name"}
              className="text-sm font-medium text-gray-700"
            >
              Họ và tên
            </label>
            <div className="relative">
              <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register("name")}
                placeholder="Họ và tên của bạn"
                onFocus={handleFocus}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          {/* Input Email */}
          <div className="relative flex flex-col">
            <label
              htmlFor={"email"}
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                onFocus={() => handleFocus("email")}
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
        <div className="flex gap-8">
          {/* Input Password */}
          <div className="relative flex flex-col">
            <label
              htmlFor={"password"}
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Tạo mật khẩu"
                {...register("password")}
                onFocus={() => handleFocus("password")}
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
          <div className="relative flex flex-col">
            <label
              htmlFor={"confirmPassword"}
              className="text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                {...register("confirmPassword")}
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

        <div className="flex items-start space-x-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              type="checkbox"
              {...register("agreeTerms")}
              // checked={formData.agreeTerms}
              // onChange={(e) => handleChange("agreeTerms", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 bg-white text-cyan-600 transition-colors focus:ring-2 focus:ring-cyan-500"
              aria-describedby={errors.agreeTerms ? "terms-error" : undefined}
            />
          </div>
          <label
            htmlFor="terms"
            className="flex-1 text-sm leading-relaxed text-gray-700"
          >
            Tôi đồng ý với{" "}
            <a
              href="#"
              className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              Điều khoản Dịch vụ
            </a>{" "}
            và{" "}
            <a
              href="#"
              className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              Chính sách Bảo mật
            </a>{" "}
            của StudentCredit
            {errors.agreeTerms && (
              <p
                id="terms-error"
                className="mt-1 flex items-center gap-1 text-xs text-red-600"
              >
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-red-600" />
                {errors.agreeTerms.message}
              </p>
            )}
          </label>
        </div>

        {/* Nút Đăng ký chính */}
        <button
          type="submit"
          disabled={signUp.isPending}
          className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-60"
        >
          {signUp.isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Đang tạo tài khoản...
            </>
          ) : (
            "Tạo tài khoản"
          )}
        </button>
        {error.server && (
          <p className="mt-1 text-xs text-red-600">{error.server}</p>
        )}
      </form>

      {/* Social Login */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={handleGoogleLogin}

          className="group flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
        >
          <FcGoogle />
          <span className="group-hover:text-gray-900">Google</span>
        </button>
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="group flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700"
        >
          <FaFacebook />
          <span>Facebook</span>
        </button>
      </div>

      {/* Login link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Đã có tài khoản?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer font-semibold text-cyan-600 hover:text-cyan-700 hover:underline focus:outline-none"
          >
            Đăng nhập ngay
          </button>
        </p>
      </div>

      {/* Footnote */}
      <div className="mt-6 text-center">
        <p className="text-xs leading-relaxed text-gray-500">
          Bằng cách tạo tài khoản, bạn xác nhận rằng bạn đã đọc và hiểu{" "}
          <br className="hidden sm:block" />
          các điều khoản sử dụng của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
