import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { verifyEmail, resendCode ,user} = useAuth();
  console.log(user)
  // const { user } = useAuthStore();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Accept any character, not just numbers
    if (value.length > 1) return; // Only allow single character

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if current is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Move to next input on arrow right
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input on arrow left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").split("");

    const newCode = ["", "", "", "", "", ""];
    paste.forEach((digit: string, i: number) => {
      if (i < 6) {
        newCode[i] = digit;
      }
    });

    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyEmail = async () => {
    const fullCode = code.join("");

    // Accept any code length (bypass validation)
    if (!fullCode || fullCode.length === 0) {
      alert("Please enter a code");
      return;
    }

    // Always use a default valid code for verification
    verifyEmail.mutate({ otp_token: fullCode, email: user?.email });

    // alert("Code accepted: " + fullCode);
  };

  const handleResendCode = () => {
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    resendCode.mutate(user?.email!);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="max-w-7xl rounded-xl p-10 text-center sm:p-15">
        <div className="mb-6 text-3xl text-gray-800">✱</div>

        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Xác thực tài khoản của bạn
        </h1>

        <p className="mb-10 text-sm leading-relaxed text-gray-600">
          Chúng tôi đã gửi mã xác minh tới{" "}
          <span className="cursor-pointer text-sky-500 underline">
            {user?.email}
          </span>
        </p>

        <div className="mb-10 flex justify-center gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`h-14 w-14 rounded-lg border-2 text-center text-xl font-semibold transition-all duration-200 outline-none ${
                digit
                  ? "border-green-500 bg-green-50 text-gray-800"
                  : "border-gray-300 bg-white text-gray-800"
              } hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              placeholder=""
            />
          ))}
        </div>

        {/* Create Account Button */}
        <button
          onClick={handleVerifyEmail}
          style={{
            cursor:
              verifyEmail.isPending || code.join("").length < 6
                ? "not-allowed"
                : "pointer",
          }}
          disabled={
            verifyEmail.isPending || !code.join("") || code.join("").length < 6
          }
          className={`w-full cursor-pointer rounded-lg bg-gray-800 px-6 py-4 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none active:translate-y-0 ${verifyEmail.isPending || code.join("").length < 6 ? "cursor-not-allowed opacity-50" : ""} `}
        >
          {verifyEmail.isPending ? "Đang xác thực..." : "Xác thực"}
        </button>

        {/* Resend Link */}
        <div className="mt-10 border-t border-gray-200 pt-5">
          <span className="text-sm text-gray-600">Chưa nhận được mã ? </span>
          <button
            onClick={handleResendCode}
            className="cursor-pointer rounded text-sm font-medium text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            Gửi lại mã
          </button>
        </div>
      </div>
    </div>
  );
}
