import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import { email } from "zod";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", " "]);
  const inputRefs = useRef([]);
  const { verifyEmail } = useAuth();
  const { user } = useAuthStore();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow numbers
    // if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if current is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
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

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/\D/g, "").split("").slice(0, 6);

    const newCode = ["", "", "", "", "", ""];
    digits.forEach((digit, i) => {
      if (i < 6) {
        newCode[i] = digit;
      }
    });

    setCode(newCode);

    // Focus the next empty field or the last field
    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyEmail = async () => {
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      alert("Please enter the complete 6-digit code");
      return;
    }
    await verifyEmail.mutate({ otp_token: fullCode, email: user.email });

    console.log("Verification code:", fullCode);
    alert("Code submitted: " + fullCode);
  };

  const handleResendCode = () => {
    // Clear all inputs
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    // Here you would typically trigger a resend request
    alert("Resend code functionality would be implemented here");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-lg sm:p-15">
        {/* Icon */}
        <div className="mb-6 text-3xl text-gray-800">✱</div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Confirm your email
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-sm leading-relaxed text-gray-600">
          We sent a code to email@untitled.com
        </p>

        {/* Code Input Fields */}
        <div className="mb-10 flex justify-center gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
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
          className="w-full rounded-lg bg-gray-800 px-6 py-4 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none active:translate-y-0"
        >
          Create an account
        </button>

        {/* Resend Link */}
        <div className="mt-10 border-t border-gray-200 pt-5">
          <span className="text-sm text-gray-600">Didn't get a code? </span>
          <button
            onClick={handleResendCode}
            className="rounded text-sm font-medium text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            Re-enter email
          </button>
        </div>
      </div>
    </div>
  );
}
