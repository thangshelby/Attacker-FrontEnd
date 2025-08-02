import React from "react";
import { Mail, CheckCircle, AlertCircle, Clock } from "lucide-react";
const Step3 = ({ StepIndicator, watch }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent">
            Yêu Cầu Thành Công!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Vui lòng kiểm tra email để xác thực Verifiable Credential
          </p>
        </div>

        {StepIndicator}
        {/* Success Message */}
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="flex items-center text-lg font-semibold text-white">
                <CheckCircle className="mr-2 h-5 w-5" />
                Yêu cầu VC đã được gửi
              </h2>
            </div>

            <div className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Mail className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Kiểm tra email của bạn
              </h3>

              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Chúng tôi đã gửi yêu cầu tới nhà trường để cấp phát Verifiable
                Credential cho bạn. Nhà trường sẽ gửi email chứa thông tin VC
                tới địa chỉ email của bạn trong vòng 24-48 giờ.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50">
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Thông tin yêu cầu:
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-start">
                    <span className="flex w-[20%] justify-start">
                      Public Name:
                    </span>
                    <span>{watch("name")}</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <span className="flex w-[20%] justify-start">Method:</span>
                    <span>{watch("method")}</span>
                  </div>

                  <div className="flex items-center justify-start">
                    <span className="flex w-[20%] justify-start">DID:</span>
                    <span className="font-mono text-xs">{watch("did")}</span>
                  </div>
                  <div className="flex flex-1 items-center justify-start">
                    <span className="flex w-[20%] justify-start">Năm Học:</span>
                    <span className="font-mono text-xs">
                      {watch("study_year")}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-start">
                    <span className="flex w-[20%] justify-start">Học Kỳ:</span>
                    <span className="font-mono text-xs">{watch("term")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thời gian yêu cầu:</span>
                    <span>{new Date().toLocaleString("vi-VN")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/30">
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    <div className="text-left">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                        Thời gian xử lý
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Nhà trường sẽ xử lý yêu cầu trong vòng 24-48 giờ làm
                        việc
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/30">
                  <div className="flex items-start">
                    <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                    <div className="text-left">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">
                        Lưu ý quan trọng
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Vui lòng kiểm tra cả hộp thư spam/junk mail nếu không
                        thấy email trong hộp thư chính
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      publicName: "",
                      method: "",
                      description: "",
                      did: "",
                    });
                    setShowSuccess(false);
                  }}
                  className="rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  Tạo yêu cầu mới
                </button>
                <button
                  onClick={() => window.open("mailto:", "_blank")}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Mail className="mr-2 inline h-4 w-4" />
                  Mở Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
