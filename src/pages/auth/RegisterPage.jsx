import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuth } from "../../hooks/useAuth";

// Schema validation với Zod, có kiểm tra mật khẩu khớp nhau
// const registerSchema = z
//   .object({
//     name: z.string().min(1, { message: "Họ và tên không được để trống" }),
//     email: z.string().email({ message: "Email không hợp lệ" }),
//     password: z
//       .string()
//       .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Mật khẩu không khớp",
//     path: ["confirmPassword"], // Gán lỗi cho trường confirmPassword
//   });

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { signUp } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = (data) => {
//     // Loại bỏ confirmPassword trước khi gửi lên API
//     const { confirmPassword, ...apiData } = data;
//     signUp.mutate(apiData, {
//       onSuccess: () => {
//         navigate("/login"); // Chuyển về trang đăng nhập sau khi thành công
//       },
//     });
//   };

//   return (
//     <div>
//       <h2 className="text-center text-2xl font-bold text-gray-800">
//         Tạo tài khoản mới
//       </h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
//         {signUp.error && (
//           <div
//             className="rounded-lg bg-red-100 p-3 text-sm text-red-800"
//             role="alert"
//           >
//             <span className="font-medium">Đăng ký thất bại!</span>{" "}
//             {signUp.error.message || "Email đã tồn tại hoặc có lỗi xảy ra."}
//           </div>
//         )}

//         <div>
//           <label htmlFor="name" className="sr-only">
//             Họ và Tên
//           </label>
//           <input
//             id="name"
//             type="text"
//             autoComplete="name"
//             {...register("name")}
//             className={`w-full appearance-none rounded-md border px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"} placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm`}
//             placeholder="Họ và Tên"
//           />
//           {errors.name && (
//             <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="email" className="sr-only">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             autoComplete="email"
//             {...register("email")}
//             className={`w-full appearance-none rounded-md border px-3 py-2 ${errors.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm`}
//             placeholder="Địa chỉ Email"
//           />
//           {errors.email && (
//             <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="password" className="sr-only">
//             Mật khẩu
//           </label>
//           <input
//             id="password"
//             type="password"
//             autoComplete="new-password"
//             {...register("password")}
//             className={`w-full appearance-none rounded-md border px-3 py-2 ${errors.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm`}
//             placeholder="Mật khẩu (ít nhất 6 ký tự)"
//           />
//           {errors.password && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="confirmPassword" className="sr-only">
//             Xác nhận Mật khẩu
//           </label>
//           <input
//             id="confirmPassword"
//             type="password"
//             autoComplete="new-password"
//             {...register("confirmPassword")}
//             className={`w-full appearance-none rounded-md border px-3 py-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm`}
//             placeholder="Xác nhận lại mật khẩu"
//           />
//           {errors.confirmPassword && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.confirmPassword.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={signUp.isPending}
//             className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-indigo-400"
//           >
//             {signUp.isPending ? (
//               <>
//                 <svg
//                   className="mr-3 h-5 w-5 animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Đang tạo tài khoản...
//               </>
//             ) : (
//               "Đăng ký"
//             )}
//           </button>
//         </div>

//         <p className="mt-2 text-center text-sm text-gray-600">
//           Đã có tài khoản?{" "}
//           <Link
//             to="/login"
//             className="font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             Đăng nhập
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUpPage;

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

const RegisterPage = () => {
  return (
    // Layout chính - chiếm toàn bộ màn hình và có nền gradient
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid md:grid-cols-2">
        {/* === Cột Trái - Form Đăng Ký === */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          {/* Logo và Tiêu đề */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800">Tạo tài khoản</h1>
            <p className="mt-2 text-gray-600">
              Bắt đầu hành trình của bạn ngay hôm nay
            </p>
          </div>

          {/* Form */}
          <form className="w-full">
            {/* Input Họ và tên */}
            <div className="relative mb-4">
              <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Họ và tên của bạn"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>

            {/* Input Email */}
            <div className="relative mb-4">
              <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>

            {/* Input Password */}
            <div className="relative mb-4">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Tạo mật khẩu"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
            </div>

            {/* Input Xác nhận Password */}
            <div className="relative mb-4">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-gray-800 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
              />
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
              className="w-full transform rounded-lg bg-cyan-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-600"
            >
              Đăng ký
            </button>
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
            <a href="#" className="font-bold text-cyan-600 hover:text-cyan-700">
              Đăng nhập
            </a>
          </p>
        </div>

        {/* === Cột Phải - Hình Ảnh & Branding (Giữ nguyên cho đồng bộ) === */}
        <div className="relative hidden items-center justify-center bg-cyan-500 md:flex">
          {/* Lớp phủ Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80"></div>

          <div className="relative z-10 p-12 text-center text-white">
            <h2 className="text-4xl leading-tight font-bold">
              Bắt đầu hành trình của bạn
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Truy cập vào nền tảng của chúng tôi để khám phá những tính năng
              tuyệt vời.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
