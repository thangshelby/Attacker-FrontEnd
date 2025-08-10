import React, { useEffect, useState } from "react";
import {
  Shield,
  Clock,
  Loader2,
  Smartphone,
  QrCode,
  RefreshCw,
  CheckCircle,
  User,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";

const Step2 = ({ studentInfo }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [qrData, setQrData] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [verificationSuccess, setVerificationSuccess] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (currentStep === 2 && !qrData) {
      setTimeout(() => {
        const sessionId = `VC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setQrData(sessionId);
        setVerificationId(sessionId);
      }, 3000);
    }
  }, [currentStep, qrData]);

  // Simulate verification process
  useEffect(() => {
    if (qrData && !verificationSuccess && !isVerifying) {
      const timer = setTimeout(() => {
        setIsVerifying(true);
        setTimeout(() => {
          setVerificationSuccess(true);
          setIsVerifying(false);
        }, 3000);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [qrData, verificationSuccess, isVerifying]);
  const refreshQR = () => {
    setQrData(null);
    setVerificationSuccess(false);
    setIsVerifying(false);
    setTimeout(() => {
      const sessionId = `VC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setQrData(sessionId);
      setVerificationId(sessionId);
    }, 500);
  };
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          <Shield className="mr-2 h-5 w-5" />
          Bước 2: Xác minh kết quả học tập
        </h2>
      </div>

      <div className="space-y-8 p-6">
        {!verificationSuccess ? (
          <>
            {/* QR Code Section */}
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Quét mã QR để xác minh thông tin học tập
              </h3>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                Sử dụng ứng dụng ví điện tử của bạn để quét mã QR và chia sẻ
                thông tin học tập
              </p>

              <QRCodeDisplay qrData={qrData} onRefresh={refreshQR} />

              {isVerifying && (
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Đang xác minh thông tin học tập...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <VerificationInstructions />

            {/* Status Messages */}
            <div className="space-y-4">
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                <div className="flex items-start space-x-3">
                  <Clock className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
                      Chờ xác minh
                    </h5>
                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                      {qrData
                        ? "Mã QR đã được tạo. Vui lòng quét mã để tiếp tục quá trình xác minh."
                        : "Đang tạo mã QR xác minh. Vui lòng chờ trong giây lát..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AcademicVerificationResult studentInfo={studentInfo} />
        )}
      </div>
    </>
  );
};

export default Step2;
// QR Code component (mock)
const QRCodeDisplay = ({ qrData, onRefresh }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="relative">
      <div className="flex h-64 w-64 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 shadow-lg">
        {qrData ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
            <QrCode className="h-32 w-32 text-gray-600" />
          </div>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto mb-2 h-12 w-12 animate-spin text-gray-400" />
            <p className="text-sm text-gray-500">Đang tạo mã QR...</p>
          </div>
        )}
      </div>
      {qrData && (
        <button
          onClick={onRefresh}
          className="absolute -top-2 -right-2 rounded-full bg-blue-500 p-2 text-white shadow-lg transition-colors hover:bg-blue-600"
          title="Làm mới mã QR"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      )}
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        ID phiên xác minh:{" "}
        <span className="font-mono text-blue-600">
          {qrData || "Đang tạo..."}
        </span>
      </p>
    </div>
  </div>
);

// Verification instructions component
const VerificationInstructions = () => (
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
    <h3 className="mb-4 flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200">
      <Smartphone className="mr-2 h-5 w-5" />
      Hướng dẫn xác minh
    </h3>
    <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
      <div className="flex items-start space-x-2">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
          1
        </span>
        <p>Mở ứng dụng ví điện tử (digital wallet) trên điện thoại của bạn</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
          2
        </span>
        <p>Quét mã QR bằng camera hoặc chức năng quét mã trong ứng dụng</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
          3
        </span>
        <p>Xác nhận chia sẻ thông tin học tập trong ứng dụng ví của bạn</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
          4
        </span>
        <p>Chờ hệ thống xác minh thông tin (thường mất 10-30 giây)</p>
      </div>
    </div>
  </div>
);

// Academic verification result component
const AcademicVerificationResult = ({ studentInfo }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-green-800 dark:text-green-200">
        Xác minh thành công!
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Thông tin học tập của bạn đã được xác minh thành công
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
        <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
          <User className="mr-2 h-5 w-5 text-blue-500" />
          Thông tin sinh viên
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Họ và tên:
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {studentInfo.fullName}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Mã sinh viên:
            </span>
            <p className="font-mono text-gray-800 dark:text-gray-200">
              {studentInfo.studentId}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Ngành học:
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {studentInfo.major}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Khóa học:
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {studentInfo.academicYear}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
        <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
          <GraduationCap className="mr-2 h-5 w-5 text-green-500" />
          Kết quả học tập
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              GPA hiện tại:
            </span>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {studentInfo.gpa}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Tín chỉ đã hoàn thành:
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {studentInfo.completedCredits} / {studentInfo.totalCredits}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Xếp loại học tập:
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                studentInfo.academicRank === "Xuất sắc"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : studentInfo.academicRank === "Giỏi"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : studentInfo.academicRank === "Khá"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              }`}
            >
              <Award className="mr-1 h-3 w-3" />
              {studentInfo.academicRank}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Tình trạng học tập:
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              <BookOpen className="mr-1 h-3 w-3" />
              {studentInfo.academicStatus}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
      <div className="flex items-start space-x-3">
        <Shield className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
        <div>
          <h5 className="font-medium text-green-800 dark:text-green-200">
            Thông tin đã được xác minh
          </h5>
          <p className="mt-1 text-sm text-green-700 dark:text-green-300">
            Tất cả thông tin học tập trên đã được xác minh thông qua Verifiable
            Credential từ trường đại học. Thông tin này sẽ được sử dụng để đánh
            giá khả năng tín dụng cho khoản vay.
          </p>
        </div>
      </div>
    </div>
  </div>
);
