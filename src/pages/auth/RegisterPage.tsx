import React from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
// Giả lập các icon/social (thay bằng thật khi dùng real deps)
const FcGoogle = () => (
  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
);
const FaFacebook = () => <div className="h-5 w-5 rounded bg-blue-600" />;

const useRegisterForm = (initial = {}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    ...initial,
  });
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [serverError, setServerError] = React.useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((fe) => ({ ...fe, [field]: undefined }));
    setServerError(null);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Họ và tên là bắt buộc.";
    if (!formData.email.trim()) errs.email = "Email là bắt buộc.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Email không đúng định dạng.";
    if (!formData.password) errs.password = "Mật khẩu là bắt buộc.";
    else if (formData.password.length < 8)
      errs.password = "Mật khẩu phải từ 8 ký tự trở lên.";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
    if (!formData.agreeTerms)
      errs.agreeTerms = "Bạn phải đồng ý với điều khoản.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return {
    formData,
    fieldErrors,
    serverError,
    setServerError,
    handleChange,
    validate,
  };
};

const InputField = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  icon,
  error,
  onChange,
  onFocus,
  trailingBtn,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="group relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`block w-full rounded-xl border bg-gray-50/50 py-3 pr-12 pl-10 text-gray-900 placeholder-gray-500 transition-all duration-200 hover:bg-white focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {trailingBtn && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {trailingBtn}
        </div>
      )}
    </div>
    {error && (
      <p
        id={`${id}-error`}
        className="mt-0.5 flex items-center gap-1 text-xs text-red-600"
      >
        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-red-600" />
        {error}
      </p>
    )}
  </div>
);

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {
    formData,
    fieldErrors,
    serverError,
    setServerError,
    handleChange,
    validate,
  } = useRegisterForm();
  const handleFocus = () => {
    if (serverError) setServerError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    signUp.mutate(formData);
    setIsLoading(true);
    setServerError(null);
  };

  const navigateToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="relative mx-auto flex min-h-full max-w-2xl flex-col justify-center p-8 md:p-12">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
            <p className="font-medium text-gray-700">Đang tạo tài khoản...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
          <User className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Tạo tài khoản mới
        </h1>
        <p className="text-gray-600">
          Bắt đầu hành trình tài chính thông minh của bạn ngay hôm nay
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            id="name"
            label="Họ và tên"
            value={formData.name}
            placeholder="Nhập họ và tên của bạn"
            icon={
              <User className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-cyan-500" />
            }
            error={fieldErrors.name}
            onChange={(v) => handleChange("name", v)}
            onFocus={handleFocus}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            placeholder="email@example.com"
            icon={
              <Mail className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-cyan-500" />
            }
            error={fieldErrors.email}
            onChange={(v) => handleChange("email", v)}
            onFocus={handleFocus}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            id="password"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Tạo mật khẩu mạnh"
            icon={
              <Lock className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-cyan-500" />
            }
            error={fieldErrors.password}
            onChange={(v) => handleChange("password", v)}
            onFocus={handleFocus}
            trailingBtn={
              <button
                type="button"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                onClick={() => setShowPassword((s) => !s)}
                className="flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            }
          />
          <InputField
            id="confirmPassword"
            label="Xác nhận mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            placeholder="Nhập lại mật khẩu"
            icon={
              <Lock className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-cyan-500" />
            }
            error={fieldErrors.confirmPassword}
            onChange={(v) => handleChange("confirmPassword", v)}
            onFocus={handleFocus}
            trailingBtn={
              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                }
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            }
          />
        </div>

        <div className="flex items-start space-x-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => handleChange("agreeTerms", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 bg-white text-cyan-600 transition-colors focus:ring-2 focus:ring-cyan-500"
              aria-describedby={
                fieldErrors.agreeTerms ? "terms-error" : undefined
              }
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
            {fieldErrors.agreeTerms && (
              <p
                id="terms-error"
                className="mt-1 flex items-center gap-1 text-xs text-red-600"
              >
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-red-600" />
                {fieldErrors.agreeTerms}
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Đang tạo tài khoản...
            </>
          ) : (
            "Tạo tài khoản"
          )}
        </button>

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="flex items-center gap-2 text-sm text-red-600">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-red-600" />
              {serverError}
            </p>
          </div>
        )}
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 font-medium text-gray-500">
            Hoặc đăng ký với
          </span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          type="button"
          className="group flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
        >
          <FcGoogle />
          <span className="group-hover:text-gray-900">Google</span>
        </button>
        <button
          type="button"
          className="group flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700"
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
            onClick={navigateToLogin}
            className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline focus:outline-none"
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
