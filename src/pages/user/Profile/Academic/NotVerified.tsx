import React, { useState } from 'react';
import { XCircle, Shield, Lock, Eye, CheckCircle, AlertTriangle, Wallet, ArrowRight, Info } from 'lucide-react';

const UnverifiedDIDPage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const verificationSteps = [
    {
      step: 1,
      title: "Tải ví DID",
      description: "Tải và cài đặt ứng dụng ví DID được hỗ trợ",
      status: "pending"
    },
    {
      step: 2,
      title: "Tạo danh tính số",
      description: "Tạo danh tính số cá nhân trong ví DID",
      status: "pending"
    },
    {
      step: 3,
      title: "Xác minh thông tin",
      description: "Xác minh thông tin cá nhân với trường đại học",
      status: "pending"
    },
    {
      step: 4,
      title: "Kết nối với hệ thống",
      description: "Liên kết ví DID với tài khoản StudentCredit",
      status: "pending"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      title: "Bảo mật cao",
      description: "Thông tin học tập được mã hóa và bảo mật tuyệt đối"
    },
    {
      icon: <Eye className="h-5 w-5 text-green-400" />,
      title: "Kiểm soát quyền riêng tư",
      description: "Bạn quyết định ai có thể xem thông tin của mình"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-purple-400" />,
      title: "Xác thực đáng tin cậy",
      description: "Kết quả học tập được xác thực không thể giả mạo"
    }
  ];

  const supportedWallets = [
    { name: "MetaMask", logo: "🦊", status: "recommended" },
    { name: "Trust Wallet", logo: "🔷", status: "supported" },
    { name: "Coinbase Wallet", logo: "🔵", status: "supported" },
    { name: "WalletConnect", logo: "🔗", status: "supported" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-b border-gray-700 p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-500/20 p-4 rounded-full">
                <XCircle className="h-12 w-12 text-red-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Chưa Xác Minh DID
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              Để bảo vệ thông tin học tập và đảm bảo tính xác thực, bạn cần xác minh danh tính số (DID) 
              trước khi truy cập kết quả học tập.
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Alert Box */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-yellow-400 font-medium mb-1">Tại sao cần xác minh DID?</h3>
                <p className="text-gray-300 text-sm">
                  Hệ thống DID (Decentralized Identity) đảm bảo rằng chỉ chính bạn mới có thể truy cập 
                  và kiểm soát thông tin học tập cá nhân của mình.
                </p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-3">{benefit.icon}</div>
                  <h4 className="text-white font-medium mb-2">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Verification Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Các Bước Xác Minh</h3>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                >
                  <Info className="h-4 w-4 mr-1" />
                  {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                </button>
              </div>
              
              <div className="space-y-4">
                {verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-700/20 rounded-lg">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                      {showDetails && (
                        <div className="mt-2 text-xs text-gray-500">
                          Trạng thái: <span className="text-yellow-400">Chưa hoàn thành</span>
                        </div>
                      )}
                    </div>
                    <div className="text-gray-500">
                      <Lock className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Wallets */}
            {showDetails && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Ví DID Được Hỗ Trợ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {supportedWallets.map((wallet, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-2">{wallet.logo}</div>
                      <div className="text-white text-sm font-medium">{wallet.name}</div>
                      {wallet.status === 'recommended' && (
                        <div className="text-xs text-green-400 mt-1">Khuyến nghị</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center">
                <Wallet className="h-5 w-5 mr-2" />
                Bắt Đầu Xác Minh DID
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
                Hướng Dẫn Chi Tiết
              </button>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <h4 className="text-white font-medium mb-2">Cần Hỗ Trợ?</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Liên hệ với chúng tôi nếu bạn gặp khó khăn trong quá trình xác minh DID
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                  <span className="text-gray-400">Email: support@studentcredit.edu.vn</span>
                  <span className="text-gray-600 hidden sm:block">|</span>
                  <span className="text-gray-400">Hotline: 1900-1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-medium mb-1">Bảo Mật & Quyền Riêng Tư</h4>
              <p className="text-gray-300 text-sm">
                Thông tin của bạn được mã hóa end-to-end và chỉ bạn mới có quyền kiểm soát. 
                Chúng tôi không lưu trữ khóa riêng tư của bạn trên hệ thống.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnverifiedDIDPage;