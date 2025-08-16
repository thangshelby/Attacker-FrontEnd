export interface Loan {
  _id: string
  student_id: string;
  citizen_id: string;
  name: string;
  loan_amount_requested: number;
  loan_tenor: number; // số tháng
  loan_purpose: number;
  custom_purpose: string;
  guarantor: string;
  family_income: string, // có thể đổi thành number nếu muốn tính toán
  payment_method: string;
  payment_frequency: string;
  monthly_installment: number;  
  total_interest: number;
  total_payment: number;
  status: string;
  reason: string;
  created_at: string; // hoặc Date nếu bạn parse sang object Date
  updated_at: string; // hoặc Date
}

export type LoanStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "completed";

export interface LoanApplication {
  amount: number;
  purpose: string;
  term_months: number;
  documents: Document[];
}

export type LoanPaymentMethod =
  | "Trả cả gốc và lãi vào ngày đáo hạn"
  | "Trả đều gốc và lãi định kỳ"
  | "Trả lãi định kỳ, gốc cuối kỳ";

export interface Document {
  id: string;
  type:
    | "citizen_card"
    | "student_card"
    | "transcript"
    | "social_activity"
    | "achievement";
  file_url: string;
  file_name: string;
  uploaded_at: string;
  status: "pending" | "verified" | "rejected";
}

// Utility Types
export type Status =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "completed"
  | "cancelled";
export type DocumentType =
  | "citizen_card"
  | "student_card"
  | "transcript"
  | "social_activity"
  | "achievement";

export interface UpdateLoanParams {
  loan_id: string;
  data: Partial<Loan>;
}
