import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Shield,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Lock,
} from "lucide-react";
import api from "@/apis/api";
import { useAuth } from "@/hooks/useAuth";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  onOtpVerified: () => void;
}

const Step4 = ({ onNext, onBack, onOtpVerified }: Step4Props) => {
  console.log('🔄 Step4 component mounted/re-rendered'); // ✅ Debug log
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpSent, setOtpSent] = useState(() => {
    // ✅ Check localStorage to persist OTP sent state
    const stored = localStorage.getItem('newloan_otp_sent');
    return stored === 'true';
  });
  const { user } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const handleSendMail = async () => {
    console.log('🔍 handleSendMail called, otpSent:', otpSent); // ✅ Debug log
    
    if (otpSent) {
      console.log('⏭️ OTP already sent, skipping'); // ✅ Debug log
      return; // ✅ Prevent multiple sends
    }
    
    try {
      console.log('📧 Sending OTP to:', user?.email); // ✅ Debug log
      await api.get(`/users/send_otp/${user?.email || ""}`);
      setOtpSent(true);
      localStorage.setItem('newloan_otp_sent', 'true'); // ✅ Persist to localStorage
      console.log('✅ OTP sent successfully to:', user?.email);
    } catch (error) {
      console.error('❌ Failed to send OTP:', error);
      setError("Không thể gửi mã OTP. Vui lòng thử lại.");
    }
  };
  
  useEffect(() => {
    if (!otpSent && user?.email) {
      handleSendMail();
    }
  }, [user?.email, otpSent]);

  // ✅ Cleanup localStorage when user leaves without completing
  useEffect(() => {
    return () => {
      // Only clear if not verified (user left without completing)
      if (!isVerified) {
        localStorage.removeItem('newloan_otp_sent');
        console.log('🧹 Cleaned up OTP state on unmount');
      }
    };
  }, [isVerified]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000); // ✅ Fixed: 1 second instead of 5 seconds
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    console.log('🔐 Verifying OTP:', otpCode); // ✅ Debug log

    if (otpCode.length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 số");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // ✅ Call real API to verify OTP for loan
      const response = await api.post('/users/verify-otp-loan', {
        email: user?.email,
        otp_token: otpCode
      });

      if (response.data.status) {
        setIsVerified(true);
        localStorage.removeItem('newloan_otp_sent'); // ✅ Clear localStorage on success
        console.log('✅ OTP verification successful');

        // Trigger loan creation after OTP verification
        if (onOtpVerified) {
          onOtpVerified();
        }

        // Auto proceed to next step after 1.5 seconds
        setTimeout(() => {
          onNext();
        }, 1500);
      } else {
        console.log('❌ OTP verification failed:', response.data.message); // ✅ Debug log
        setError(response.data.message || "Mã OTP không chính xác");
      }
    } catch (error: any) {
      console.error('❌ OTP verification error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Mã OTP không chính xác. Vui lòng thử lại.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setOtpSent(false); // ✅ Reset flag to allow resend
      inputRefs.current[0]?.focus();

      // ✅ Call real API to resend OTP
      await api.get(`/users/send_otp/${user?.email || ""}`);
      setOtpSent(true); // ✅ Mark as sent
      localStorage.setItem('newloan_otp_sent', 'true'); // ✅ Persist to localStorage
      console.log("📧 Đã gửi lại mã OTP");
    } catch (error) {
      console.error('❌ Resend OTP error:', error);
      setError("Không thể gửi lại mã OTP. Vui lòng thử lại.");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isVerified) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h3 className="mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
            Xác thực thành công!
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Đang chuyển đến bước tiếp theo...
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-2 w-full animate-pulse rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
          <Lock className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Xác thực OTP
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Chúng tôi đã gửi mã xác thực 6 số đến email của bạn
          </p>
          <div className="mt-3 inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/30">
            <Mail className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {user?.email || "Email của bạn"}
            </span>
          </div>
        </div>
      </div>

      {/* OTP Input Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`h-14 w-14 rounded-lg border-2 text-center text-xl font-bold transition-all duration-200 focus:ring-4 focus:ring-blue-500/20 focus:outline-none ${
                  error
                    ? "border-red-400 bg-red-50 text-red-600 dark:border-red-500 dark:bg-red-900/20 dark:text-red-400"
                    : digit
                      ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400"
                      : "border-gray-300 bg-gray-50 text-gray-900 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                } `}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center">
              <p className="inline-block rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Timer Section */}
          <div className="text-center">
            {!canResend ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mã OTP sẽ hết hạn sau
                </p>
                <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-700">
                  <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatTime(timer)}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleResendOtp}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <RefreshCw className="h-4 w-4" />
                Gửi lại mã OTP
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Quay lại
        </button>
        <button
          onClick={handleVerifyOtp}
          disabled={otp.join("").length !== 6 || isVerifying}
          className="flex flex-2 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVerifying ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Đang xác thực...
            </>
          ) : (
            <>
              <Shield className="h-5 w-5" />
              Xác thực
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4;
