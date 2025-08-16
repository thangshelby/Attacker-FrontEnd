import { Loan } from "@/types";

export const defaultFormData: Partial<Loan> = {
  student_id: "",
  loan_amount_requested: 0,
  loan_tenor: 0,
  guarantor: "",
  loan_purpose: 0,
  custom_purpose: "",
  family_income: "",
  payment_method: "0",
  payment_frequency: "0",
  monthly_installment: 0,
  total_interest: 0,
  total_payment: 0,
};
export const loanPeriod = [
  { value: 0, label: "Chọn thời hạn" }, // hoặc null nếu bạn muốn rõ ràng hơn
  { value: 3, label: "3 tháng" },
  { value: 6, label: "6 tháng" },
  { value: 12, label: "12 tháng" },
  { value: 24, label: "24 tháng" },
  { value: 36, label: "36 tháng" },
  { value: 48, label: "48 tháng" },
  { value: 60, label: "60 tháng" },
];

export const studentGurantor = [
  { value: "", label: "Chọn người bảo lãnh" },
  { value: "parent", label: "Bố-Mẹ" },
  { value: "brother-sister", label: "Anh trai-Chị gái" },
  { value: "uncle", label: "Chú/Bác" },
  { value: "other", label: "Người khác" },
];
export const incomeRanges = [
  { value: "", label: "Chọn khoảng thu nhập" },
  {
    label: "Dưới 10 triệu VNĐ / tháng",
    value: "<10000000",
  },
  {
    label: "10 - 20 triệu VNĐ / tháng",
    value: "10000000-20000000",
  },
  {
    label: "20 - 35 triệu VNĐ / tháng",
    value: "20000000-35000000",
  },
  {
    label: "35 - 50 triệu VNĐ / tháng",
    value: "35000000-50000000",
  },
  {
    label: "50 - 70 triệu VNĐ / tháng",
    value: "50000000-70000000",
  },
  {
    label: "70 - 100 triệu VNĐ / tháng",
    value: "70000000-100000000",
  },
  {
    label: "Trên 100 triệu VNĐ / tháng",
    value: ">100000000",
  },
];

// Mock data for loan purposes
export const loanPurposes = [
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
export const paymentMethods = [
  {
    id: 1,
    name: "Trả cả gốc và lãi vào ngày đáo hạn",
    description: "Trả toàn bộ số tiền vay và lãi khi hết hạn",
    interestRate: 0.08,
    shortName: "Trả cuối kỳ",
    hasFrequency: false,
  },
  {
    id: 2,
    name: "Trả lãi định kỳ, gốc cuối kỳ",
    description: "Trả lãi định kỳ theo tần suất đã chọn, trả gốc khi hết hạn",
    interestRate: 0.06,
    shortName: "Trả lãi định kỳ",
    hasFrequency: true,
  },
  {
    id: 3,
    name: "Trả đều gốc và lãi định kỳ",
    description: "Trả một phần gốc và lãi theo tần suất đã chọn",
    interestRate: 0.05,
    shortName: "Trả đều định kỳ",
    hasFrequency: true,
  },
];

// Payment frequencies
export const paymentFrequencies = [
  { id: 1, name: "1 tháng", months: 1, description: "Trả hàng tháng" },
  { id: 3, name: "3 tháng", months: 3, description: "Trả mỗi quý" },
  { id: 6, name: "6 tháng", months: 6, description: "Trả mỗi 6 tháng" },
];

export const calculatePaymentDetails = (
  amount: number,
  tenor: number,
  paymentMethodId: string,
  frequency: string | undefined,
) => {
  if (!amount || !tenor || !paymentMethodId)
    return { monthly: 0, totalInterest: 0, totalPayment: 0 };

  const method = paymentMethods.find((pm) => pm.id === Number(paymentMethodId));
  if (!method) return { monthly: 0, totalInterest: 0, totalPayment: 0 };

  const principal = amount;
  const months = tenor;
  const annualRate = method.interestRate;
  const frequencyMonths = frequency
    ? Number(frequency)
    : method.id === 2
      ? 3
      : 1;

  let periodicPayment = 0;
  let totalInterest = 0;
  let totalPayment = 0;

  switch (Number(paymentMethodId)) {
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
        periodicPayment =
          (principal *
            effectiveRate *
            Math.pow(1 + effectiveRate, totalPeriods)) /
          (Math.pow(1 + effectiveRate, totalPeriods) - 1);
      }
      totalPayment = periodicPayment * totalPeriods;
      totalInterest = totalPayment - principal;
      break;
  }

  return {
    monthly: Math.round(periodicPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
