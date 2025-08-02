import React, { useState } from "react";
import { CheckCircle, Send, School } from "lucide-react";
import { useIdentityProfile } from "@/hooks/useIdentityProfile";
import { useAuthStore } from "@/store/authStore";

const Step2 = ({ onNext, watch }) => {
  const { user, student } = useAuthStore();
  const { createIdentityProfile } = useIdentityProfile();

  const handleRequestVC = async () => {
    try {
      await createIdentityProfile.mutate({
        student_id: student.student_id,
        email: user.email,
        study_year: 3,
        term: watch("term"),
        did: watch("did"),
        name: watch("name"),
        image: watch("image"),
        description: watch("description"),
        method: watch("method"),
      });
      onNext(3); 
    } catch (error) {
      console.error("Error requesting VC:", error);
    }
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          <School className="mr-2 h-5 w-5" />
          Yêu cầu Verifiable Credential
        </h2>
      </div>

      <div className="p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          DID đã được import thành công!
        </h3>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Bây giờ bạn có thể yêu cầu nhà trường cấp phát Verifiable Credential
          cho bạn
        </p>

        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50">
          <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
            Thông tin DID đã import:
          </h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-start">
              <span className="flex w-[20%] justify-start">Public Name:</span>
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
              <span className="font-mono text-xs">{watch("study_year")}</span>
            </div>
            <div className="flex flex-1 items-center justify-start">
              <span className="flex w-[20%] justify-start">Học Kỳ:</span>
              <span className="font-mono text-xs">{watch("term")}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRequestVC}
          disabled={createIdentityProfile?.isPending}
          className="relative rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createIdentityProfile?.isPending ? (
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Đang gửi yêu cầu...
            </div>
          ) : (
            <div className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              Yêu cầu VC từ nhà trường
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2;
