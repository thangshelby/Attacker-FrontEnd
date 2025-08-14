// Student Types
export interface Student {
  id: string;
  student_id: string;
  university: string;
  major: string;
  gpa: number;
  academic_year: number;
  graduation_year: number;
  created_at?: string;
  updated_at?: string;
}
