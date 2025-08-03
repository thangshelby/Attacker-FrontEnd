import {
  DollarSign,
  Calendar,
  Target,
  Calculator,
  CheckCircle,
  AlertCircle,
  Send,
  X,
  CreditCard,
  TrendingUp,
  FileText,
  Clock,
  User,
  Home,
  Settings,
  QrCode,
  Shield,
  ArrowLeft,
  ArrowRight,
  Loader2,
  GraduationCap,
  Award,
  BookOpen,
  Smartphone,
  RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for loan purposes
const loanPurposes = [
  { id: 1, name: "Học phí", description: "Chi trả học phí học kỳ" },
  { id: 2, name: "Sinh hoạt phí", description: "Chi phí sinh hoạt hàng tháng" },
  {
    id: 3,
    name: "Mua sách và tài liệu",
    description: "Sách giáo khoa, tài liệu học tập",
  },
  {
    id: 4,
    name: "Thiết bị học tập",
    description: "Laptop, máy tính, thiết bị",
  },
  { id: 5, name: "Chi phí khác", description: "Các chi phí học tập khác" },
  { id: 6, name: "Khác", description: "Mục đích khác (vui lòng ghi rõ)" },
];

// Payment methods
const paymentMethods = [
  {
    id: 1,
    name: "Trả cả gốc và lãi vào ngày đáo hạn",
    description: "Trả toàn bộ số tiền vay và lãi khi hết hạn",
    interestRate: 0.08,
    shortName: "Trả cuối kỳ",
    hasFrequency: false
  },
  {
    id: 2,
    name: "Trả lãi định kỳ, gốc cuối kỳ",
    description: "Trả lãi định kỳ theo tần suất đã chọn, trả gốc khi hết hạn",
    interestRate: 0.06,
    shortName: "Trả lãi định kỳ",
    hasFrequency: true
  },
  {
    id: 3,
    name: "Trả đều gốc và lãi định kỳ",
    description: "Trả một phần gốc và lãi theo tần suất đã chọn",
    interestRate: 0.05,
    shortName: "Trả đều định kỳ",
    hasFrequency: true
  },
];

// Payment frequencies
const paymentFrequencies = [
  { id: 1, name: "1 tháng", months: 1, description: "Trả hàng tháng" },
  { id: 3, name: "3 tháng", months: 3, description: "Trả mỗi quý" },
  { id: 6, name: "6 tháng", months: 6, description: "Trả mỗi 6 tháng" },
];

// Validation functions
const validateAmount = (amount) => {
  return amount > 0 && amount <= 100000000;
};

const validateTenor = (tenor) => {
  return tenor >= 3 && tenor <= 60;
};

const validateFamilyIncome = (income) => {
  return income > 0 && income <= 1000000000;
};

const FormField = ({
  label,
  icon: Icon,
  error,
  children,
  required = false,
  description,
}) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
      {Icon && <Icon className="mr-2 h-4 w-4 text-green-500" />}
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {description && (
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    )}
    <div className="relative">
      {children}
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600">
          <AlertCircle className="mr-1 h-4 w-4" />
          {error.message}
        </div>
      )}
    </div>
  </div>
);

// Step indicator component
const StepIndicator = ({ currentStep, steps }) => (
  <div className="mb-8">
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
            index + 1 < currentStep
              ? 'bg-green-500 border-green-500 text-white'
              : index + 1 === currentStep
              ? 'bg-green-500 border-green-500 text-white'
              : 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400'
          }`}>
            {index + 1 < currentStep ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <span className="font-semibold">{index + 1}</span>
            )}
          </div>
          <div className="ml-3 text-sm">
            <div className={`font-medium ${
              index + 1 <= currentStep ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {step.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{step.description}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`mx-4 h-0.5 w-12 ${
              index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  </div>
);

// QR Code component (mock)
const QRCodeDisplay = ({ qrData, onRefresh }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className="relative">
      <div className="w-64 h-64 bg-white p-4 rounded-xl shadow-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        {qrData ? (
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
            <QrCode className="h-32 w-32 text-gray-600" />
          </div>
        ) : (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Đang tạo mã QR...</p>
          </div>
        )}
      </div>
      {qrData && (
        <button
          onClick={onRefresh}
          className="absolute -top-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors"
          title="Làm mới mã QR"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      )}
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        ID phiên xác minh: <span className="font-mono text-blue-600">{qrData || "Đang tạo..."}</span>
      </p>
    </div>
  </div>
);

// Verification instructions component
const VerificationInstructions = () => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
    <h3 className="flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
      <Smartphone className="mr-2 h-5 w-5" />
      Hướng dẫn xác minh
    </h3>
    <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
      <div className="flex items-start space-x-2">
        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
        <p>Mở ứng dụng ví điện tử (digital wallet) trên điện thoại của bạn</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
        <p>Quét mã QR bằng camera hoặc chức năng quét mã trong ứng dụng</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
        <p>Xác nhận chia sẻ thông tin học tập trong ứng dụng ví của bạn</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
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
      <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
        Xác minh thành công!
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Thông tin học tập của bạn đã được xác minh thành công
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          <User className="mr-2 h-5 w-5 text-blue-500" />
          Thông tin sinh viên
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Họ và tên:</span>
            <p className="text-gray-800 dark:text-gray-200">{studentInfo.fullName}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mã sinh viên:</span>
            <p className="text-gray-800 dark:text-gray-200 font-mono">{studentInfo.studentId}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Ngành học:</span>
            <p className="text-gray-800 dark:text-gray-200">{studentInfo.major}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Khóa học:</span>
            <p className="text-gray-800 dark:text-gray-200">{studentInfo.academicYear}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
        <h4 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          <GraduationCap className="mr-2 h-5 w-5 text-green-500" />
          Kết quả học tập
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">GPA hiện tại:</span>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{studentInfo.gpa}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tín chỉ đã hoàn thành:</span>
            <p className="text-gray-800 dark:text-gray-200">{studentInfo.completedCredits} / {studentInfo.totalCredits}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Xếp loại học tập:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              studentInfo.academicRank === 'Xuất sắc' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              studentInfo.academicRank === 'Giỏi' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              studentInfo.academicRank === 'Khá' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            }`}>
              <Award className="mr-1 h-3 w-3" />
              {studentInfo.academicRank}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tình trạng học tập:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <BookOpen className="mr-1 h-3 w-3" />
              {studentInfo.academicStatus}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
      <div className="flex items-start space-x-3">
        <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
        <div>
          <h5 className="font-medium text-green-800 dark:text-green-200">Thông tin đã được xác minh</h5>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            Tất cả thông tin học tập trên đã được xác minh thông qua Verifiable Credential từ trường đại học. 
            Thông tin này sẽ được sử dụng để đánh giá khả năng tín dụng cho khoản vay.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const NewLoans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  
  const [formData, setFormData] = useState({
    student_id: "SV001",
    requested_loan_amount: "",
    loan_tenor: "",
    loan_purpose: "",
    custom_purpose: "",
    guarantor: "",
    family_income: "",
    payment_method: "",
    payment_frequency: "",
    monthly_installment: 0,
    total_interest: 0,
    total_payment: 0,
  });
  
  const [studentInfo, setStudentInfo] = useState({
    fullName: "Nguyễn Văn An",
    studentId: "SV001",
    major: "Khoa học Máy tính",
    academicYear: "2021-2025",
    gpa: "3.75",
    completedCredits: "95",
    totalCredits: "144",
    academicRank: "Giỏi",
    academicStatus: "Đang học"
  });
  
  const [errors, setErrors] = useState({});

  const steps = [
    {
      title: "Thu thập thông tin",
      description: "Điền thông tin khoản vay"
    },
    {
      title: "Xác minh học tập",
      description: "Xác minh kết quả học tập"
    },
    {
      title: "Xem thông tin",
      description: "Xem lại và gửi yêu cầu"
    }
  ];

  // Generate QR code when entering step 2
  useEffect(() => {
    if (currentStep === 2 && !qrData) {
      setTimeout(() => {
        const sessionId = `VC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setQrData(sessionId);
        setVerificationId(sessionId);
      }, 1500);
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

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(pm => pm.id === parseInt(formData.payment_method));
  };

  const calculatePaymentDetails = (amount, tenor, paymentMethodId, frequency) => {
    if (!amount || !tenor || !paymentMethodId) return { monthly: 0, totalInterest: 0, totalPayment: 0 };
    
    const method = paymentMethods.find(pm => pm.id === parseInt(paymentMethodId));
    if (!method) return { monthly: 0, totalInterest: 0, totalPayment: 0 };

    const principal = parseFloat(amount);
    const months = parseInt(tenor);
    const annualRate = method.interestRate;
    const frequencyMonths = frequency ? parseInt(frequency) : (method.id === 2 ? 3 : 1);

    let periodicPayment = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    switch (parseInt(paymentMethodId)) {
      case 1:
        totalInterest = principal * annualRate * (months / 12);
        totalPayment = principal + totalInterest;
        periodicPayment = 0;
        break;
        
      case 2:
        if (!frequency) {
          return { monthly: 0, totalInterest: 0, totalPayment: 0 };
        }
        const periodicRate = annualRate / (12 / frequencyMonths);
        const numberOfPayments = Math.floor(months / frequencyMonths);
        const periodicInterest = principal * periodicRate;
        totalInterest = periodicInterest * numberOfPayments;
        totalPayment = principal + totalInterest;
        periodicPayment = periodicInterest;
        break;
        
      case 3:
        if (!frequency) {
          return { monthly: 0, totalInterest: 0, totalPayment: 0 };
        }
        const effectiveRate = annualRate / (12 / frequencyMonths);
        const totalPeriods = Math.floor(months / frequencyMonths);
        
        if (effectiveRate === 0) {
          periodicPayment = principal / totalPeriods;
        } else {
          periodicPayment = (principal * effectiveRate * Math.pow(1 + effectiveRate, totalPeriods)) / 
                           (Math.pow(1 + effectiveRate, totalPeriods) - 1);
        }
        totalPayment = periodicPayment * totalPeriods;
        totalInterest = totalPayment - principal;
        break;
    }

    return {
      monthly: Math.round(periodicPayment),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.requested_loan_amount) {
      newErrors.requested_loan_amount = { message: "Số tiền vay là bắt buộc" };
    } else if (!validateAmount(parseFloat(formData.requested_loan_amount))) {
      newErrors.requested_loan_amount = {
        message: "Số tiền vay không hợp lệ (1-100 triệu VND)",
      };
    }

    if (!formData.loan_tenor) {
      newErrors.loan_tenor = { message: "Thời hạn vay là bắt buộc" };
    } else if (!validateTenor(parseInt(formData.loan_tenor))) {
      newErrors.loan_tenor = { message: "Thời hạn vay phải từ 3-60 tháng" };
    }

    if (!formData.loan_purpose) {
      newErrors.loan_purpose = { message: "Mục đích vay là bắt buộc" };
    }

    if (formData.loan_purpose === "6" && !formData.custom_purpose.trim()) {
      newErrors.custom_purpose = { message: "Vui lòng mô tả mục đích vay" };
    }

    if (!formData.guarantor.trim()) {
      newErrors.guarantor = { message: "Người bảo lãnh là bắt buộc" };
    }

    if (!formData.family_income) {
      newErrors.family_income = { message: "Thu nhập gia đình là bắt buộc" };
    } else if (!validateFamilyIncome(parseFloat(formData.family_income))) {
      newErrors.family_income = {
        message: "Thu nhập gia đình không hợp lệ",
      };
    }

    if (!formData.payment_method) {
      newErrors.payment_method = { message: "Phương thức trả lãi là bắt buộc" };
    }

    const selectedMethod = paymentMethods.find(pm => pm.id === parseInt(formData.payment_method));
    if (selectedMethod?.hasFrequency && !formData.payment_frequency) {
      newErrors.payment_frequency = { message: "Tần suất trả tiền là bắt buộc" };
    }

    if (formData.payment_method && formData.payment_frequency) {
      const tenor = parseInt(formData.loan_tenor);
      const frequency = parseInt(formData.payment_frequency);
      
      if (tenor < frequency) {
        newErrors.payment_frequency = { 
          message: `Thời hạn vay phải lớn hơn hoặc bằng tần suất trả tiền (${frequency} tháng)` 
        };
      }
      
      if (frequency === 6 && tenor < 12) {
        newErrors.payment_frequency = { 
          message: "Tần suất trả 6 tháng yêu cầu thời hạn vay tối thiểu 12 tháng" 
        };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };

    if (field === "loan_purpose" && value !== "6") {
      newFormData.custom_purpose = "";
    }

    if (field === "payment_method") {
      const selectedMethod = paymentMethods.find(pm => pm.id === parseInt(value));
      if (!selectedMethod?.hasFrequency) {
        newFormData.payment_frequency = "";
      }
    }

    if (field === "requested_loan_amount" || field === "loan_tenor" || field === "payment_method" || field === "payment_frequency") {
      const amount = parseFloat(newFormData.requested_loan_amount) || 0;
      const tenor = parseInt(newFormData.loan_tenor) || 0;
      const paymentMethod = newFormData.payment_method;
      const frequency = newFormData.payment_frequency;
      
      const calculations = calculatePaymentDetails(amount, tenor, paymentMethod, frequency);
      newFormData.monthly_installment = calculations.monthly;
      newFormData.total_interest = calculations.totalInterest;
      newFormData.total_payment = calculations.totalPayment;
    }

    setFormData(newFormData);

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (verificationSuccess) {
        setCurrentStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        requested_loan_amount: parseFloat(formData.requested_loan_amount),
        loan_tenor: parseInt(formData.loan_tenor),
        loan_purpose: parseInt(formData.loan_purpose),
        family_income: parseFloat(formData.family_income),
        payment_method: parseInt(formData.payment_method),
        verification_id: verificationId,
        student_info: studentInfo
      };

      console.log("Loan request data:", submitData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        // Reset form
        setCurrentStep(1);
        setQrData(null);
        setVerificationSuccess(false);
        setVerificationId(null);
        setFormData({
          student_id: "SV001",
          requested_loan_amount: "",
          loan_tenor: "",
          loan_purpose: "",
          custom_purpose: "",
          guarantor: "",
          family_income: "",
          payment_method: "",
          payment_frequency: "",
          monthly_installment: 0,
          total_interest: 0,
          total_payment: 0,
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting loan request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const selectedPurpose = loanPurposes.find(
    (p) => p.id === parseInt(formData.loan_purpose),
  );

  const getPurposeDisplayText = () => {
    if (formData.loan_purpose === "6" && formData.custom_purpose) {
      return formData.custom_purpose;
    }
    return selectedPurpose?.name || "";
  };

  const selectedPaymentMethod = getSelectedPaymentMethod();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent">
            Tạo Khoản Vay Mới
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Quy trình 3 bước với xác minh kết quả học tập
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} steps={steps} />

        {/* Success Message */}
        {submitSuccess && (
          <div className="animate-fade-in mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Tạo khoản vay thành công! Yêu cầu của bạn đang được xử lý.
              </span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          
          {/* Step 1: Information Collection */}
          {currentStep === 1 && (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="flex items-center text-lg font-semibold text-white">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Bước 1: Thu thập thông tin khoản vay
                </h2>
              </div>

              <div className="space-y-8 p-6">
                {/* Student ID Display */}
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">
                      Mã sinh viên: {formData.student_id}
                    </span>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <FormField
                    label="Số tiền vay"
                    icon={DollarSign}
                    error={errors.requested_loan_amount}
                    required
                    description="Nhập số tiền bạn muốn vay (VND)"
                  >
                    <input
                      type="number"
                      value={formData.requested_loan_amount}
                      onChange={(e) =>
                        handleInputChange("requested_loan_amount", e.target.value)
                      }
                      placeholder="Ví dụ: 10000000"
                      min="1"
                      max="100000000"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formData.requested_loan_amount && (
                      <p className="mt-1 text-sm text-green-600">
                        {formatCurrency(formData.requested_loan_amount)}
                      </p>
                    )}
                  </FormField>

                  <FormField
                    label="Thời hạn vay"
                    icon={Calendar}
                    error={errors.loan_tenor}
                    required
                    description="Số tháng bạn muốn trả nợ (3-60 tháng)"
                  >
                    <select
                      value={formData.loan_tenor}
                      onChange={(e) =>
                        handleInputChange("loan_tenor", e.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Chọn thời hạn</option>
                      <option value="3">3 tháng</option>
                      <option value="6">6 tháng</option>
                      <option value="12">12 tháng</option>
                      <option value="18">18 tháng</option>
                      <option value="24">24 tháng</option>
                      <option value="36">36 tháng</option>
                      <option value="48">48 tháng</option>
                      <option value="60">60 tháng</option>
                    </select>
                  </FormField>

                  <FormField
                    label="Người bảo lãnh"
                    icon={User}
                    error={errors.guarantor}
                    required
                    description="Họ tên người bảo lãnh cho khoản vay"
                  >
                    <input
                      type="text"
                      value={formData.guarantor}
                      onChange={(e) =>
                        handleInputChange("guarantor", e.target.value)
                      }
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField
                    label="Thu nhập gia đình"
                    icon={Home}
                    error={errors.family_income}
                    required
                    description="Thu nhập hàng tháng của gia đình (VND)"
                  >
                    <input
                      type="number"
                      value={formData.family_income}
                      onChange={(e) =>
                        handleInputChange("family_income", e.target.value)
                      }
                      placeholder="Ví dụ: 15000000"
                      min="1"
                      max="1000000000"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formData.family_income && (
                      <p className="mt-1 text-sm text-green-600">
                        {formatCurrency(formData.family_income)}
                      </p>
                    )}
                  </FormField>

                  <div className="lg:col-span-2">
                    <FormField
                      label="Mục đích vay"
                      icon={Target}
                      error={errors.loan_purpose}
                      required
                      description="Chọn mục đích sử dụng khoản vay"
                    >
                      <select
                        value={formData.loan_purpose}
                        onChange={(e) =>
                          handleInputChange("loan_purpose", e.target.value)
                        }
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Chọn mục đích vay</option>
                        {loanPurposes.map((purpose) => (
                          <option key={purpose.id} value={purpose.id}>
                            {purpose.name} - {purpose.description}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    {formData.loan_purpose === "6" && (
                      <div className="mt-4">
                        <FormField
                          label="Mô tả mục đích cụ thể"
                          icon={FileText}
                          error={errors.custom_purpose}
                          required
                          description="Vui lòng mô tả chi tiết mục đích vay của bạn"
                        >
                          <textarea
                            value={formData.custom_purpose}
                            onChange={(e) =>
                              handleInputChange("custom_purpose", e.target.value)
                            }
                            placeholder="Mô tả chi tiết mục đích vay của bạn..."
                            rows="3"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
                          />
                        </FormField>
                      </div>
                    )}
                  </div>

                  {/* Payment Method Selection */}
                  <div className="lg:col-span-2">
                    <FormField
                      label="Phương thức trả lãi"
                      icon={Settings}
                      error={errors.payment_method}
                      required
                      description="Chọn cách thức trả lãi phù hợp với khả năng tài chính"
                    >
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="relative">
                            <label className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-all duration-200 ${
                              formData.payment_method === method.id.toString()
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                            }`}>
                              <input
                                type="radio"
                                name="payment_method"
                                value={method.id}
                                checked={formData.payment_method === method.id.toString()}
                                onChange={(e) => handleInputChange("payment_method", e.target.value)}
                                className="mt-0.5 h-4 w-4 text-green-600 focus:ring-green-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {method.name}
                                  </span>
                                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                    {(method.interestRate * 100).toFixed(1)}%/năm
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  {method.description}
                                </p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormField>

                    {formData.payment_method && paymentMethods.find(pm => pm.id === parseInt(formData.payment_method))?.hasFrequency && (
                      <div className="mt-4">
                        <FormField
                          label="Tần suất trả tiền"
                          icon={Clock}
                          error={errors.payment_frequency}
                          required
                          description="Chọn tần suất bạn muốn trả tiền"
                        >
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {paymentFrequencies.map((freq) => {
                              const isDisabled = parseInt(formData.loan_tenor) < freq.months || 
                                                (freq.months === 6 && parseInt(formData.loan_tenor) < 12);
                              
                              return (
                                <label 
                                  key={freq.id} 
                                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-all duration-200 ${
                                    formData.payment_frequency === freq.months.toString()
                                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                      : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <input
                                    type="radio"
                                    name="payment_frequency"
                                    value={freq.months}
                                    checked={formData.payment_frequency === freq.months.toString()}
                                    onChange={(e) => handleInputChange("payment_frequency", e.target.value)}
                                    disabled={isDisabled}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                                  />
                                  <div className="flex-1">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                      {freq.name}
                                    </span>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {freq.description}
                                    </p>
                                    {isDisabled && (
                                      <p className="text-xs text-red-500">
                                        {freq.months === 6 ? 'Cần thời hạn ≥12 tháng' : `Cần thời hạn ≥${freq.months} tháng`}
                                      </p>
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </FormField>
                      </div>
                    )}
                  </div>
                </div>

                {/* Calculation Results */}
                {formData.requested_loan_amount && formData.loan_tenor && formData.payment_method && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/30">
                    <h3 className="mb-4 flex items-center text-lg font-semibold text-green-800 dark:text-green-200">
                      <Calculator className="mr-2 h-5 w-5" />
                      Thông tin trả nợ (ước tính)
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Số tiền vay
                            </p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              {formatCurrency(formData.requested_loan_amount)}
                            </p>
                          </div>
                          <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                      </div>

                      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Thời hạn
                            </p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {formData.loan_tenor} tháng
                            </p>
                          </div>
                          <Clock className="h-8 w-8 text-blue-500" />
                        </div>
                      </div>

                      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Tổng lãi
                            </p>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                              {formatCurrency(formData.total_interest)}
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-orange-500" />
                        </div>
                      </div>

                      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Tổng tiền trả
                            </p>
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">
                              {formatCurrency(formData.total_payment)}
                            </p>
                          </div>
                          <Calculator className="h-8 w-8 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Step 2: Academic Verification */}
          {currentStep === 2 && (
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
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Quét mã QR để xác minh thông tin học tập
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Sử dụng ứng dụng ví điện tử của bạn để quét mã QR và chia sẻ thông tin học tập
                      </p>
                      
                      <QRCodeDisplay qrData={qrData} onRefresh={refreshQR} />
                      
                      {isVerifying && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                          <div className="flex items-center justify-center space-x-3">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                            <span className="text-blue-800 dark:text-blue-200 font-medium">
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
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-yellow-800 dark:text-yellow-200">Chờ xác minh</h5>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                              {qrData ? 
                                "Mã QR đã được tạo. Vui lòng quét mã để tiếp tục quá trình xác minh." :
                                "Đang tạo mã QR xác minh. Vui lòng chờ trong giây lát..."
                              }
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
          )}

          {/* Step 3: Final Review */}
          {currentStep === 3 && (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="flex items-center text-lg font-semibold text-white">
                  <FileText className="mr-2 h-5 w-5" />
                  Bước 3: Xem lại thông tin và gửi yêu cầu
                </h2>
              </div>

              <div className="space-y-8 p-6">
                {/* Loan Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Loan Details */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                      <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                        Thông tin khoản vay
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Số tiền vay:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {formatCurrency(formData.requested_loan_amount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Thời hạn:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {formData.loan_tenor} tháng
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Mục đích:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {getPurposeDisplayText()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Người bảo lãnh:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {formData.guarantor}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Thu nhập gia đình:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {formatCurrency(formData.family_income)}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Phương thức trả:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              {selectedPaymentMethod?.shortName}
                              {formData.payment_frequency && (
                                <span className="text-sm"> (Mỗi {formData.payment_frequency} tháng)</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                      <h3 className="flex items-center text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                        <Calculator className="mr-2 h-5 w-5" />
                        Tóm tắt thanh toán
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300">Tổng lãi:</span>
                          <span className="font-bold text-green-800 dark:text-green-200">
                            {formatCurrency(formData.total_interest)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300">Tổng tiền phải trả:</span>
                          <span className="font-bold text-xl text-green-800 dark:text-green-200">
                            {formatCurrency(formData.total_payment)}
                          </span>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 pt-2 border-t border-green-200 dark:border-green-700">
                          Lãi suất: {(selectedPaymentMethod?.interestRate * 100).toFixed(1)}%/năm
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Student Info */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                      <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        <User className="mr-2 h-5 w-5 text-blue-500" />
                        Thông tin sinh viên đã xác minh
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Họ và tên:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {studentInfo.fullName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Mã sinh viên:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">
                            {studentInfo.studentId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Ngành học:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {studentInfo.major}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Khóa học:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {studentInfo.academicYear}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                      <h3 className="flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                        <GraduationCap className="mr-2 h-5 w-5" />
                        Kết quả học tập
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 dark:text-blue-300">GPA:</span>
                          <span className="font-bold text-2xl text-blue-800 dark:text-blue-200">
                            {studentInfo.gpa}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 dark:text-blue-300">Tín chỉ:</span>
                          <span className="font-semibold text-blue-800 dark:text-blue-200">
                            {studentInfo.completedCredits}/{studentInfo.totalCredits}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 dark:text-blue-300">Xếp loại:</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            studentInfo.academicRank === 'Xuất sắc' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            studentInfo.academicRank === 'Giỏi' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            studentInfo.academicRank === 'Khá' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}>
                            <Award className="mr-1 h-3 w-3" />
                            {studentInfo.academicRank}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Verification Status */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <h5 className="font-medium text-green-800 dark:text-green-200">Đã xác minh</h5>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Thông tin học tập đã được xác minh qua Verifiable Credential
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-mono mt-1">
                            ID: {verificationId}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Confirmation */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                  <h3 className="flex items-center text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Xác nhận cuối cùng
                  </h3>
                  <div className="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>• Tôi xác nhận rằng tất cả thông tin đã cung cấp là chính xác và trung thực.</p>
                    <p>• Tôi hiểu rằng việc cung cấp thông tin sai sự thật có thể dẫn đến việc từ chối khoản vay.</p>
                    <p>• Tôi đồng ý với các điều khoản và điều kiện của khoản vay.</p>
                    <p>• Tôi hiểu rằng lãi suất và điều khoản cuối cùng sẽ được xác định sau khi đánh giá hồ sơ.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
            <div className="flex justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="cursor-pointer flex items-center rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại
                  </button>
                )}
              </div>

              <div className="flex space-x-3">
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === 2 && !verificationSuccess}
                    className="cursor-pointer flex items-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {currentStep === 2 && !verificationSuccess ? 'Chờ xác minh' : 'Tiếp tục'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="cursor-pointer relative rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang gửi...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Gửi yêu cầu vay
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>    
  );
};

export default NewLoans;