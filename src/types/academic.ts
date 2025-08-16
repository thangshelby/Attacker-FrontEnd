// Academic Profile Types
export interface Academic {
  student_id: string;
  gpa: number;
  current_gpa: number;
  total_credits_earned: number;
  failed_course_count: number;
  achievement_award_count: number;
  has_scholarship?: boolean; // default = false
  scholarship_count?: number;
  club?: string;
  extracurricular_activity_count?: number;
  has_leadership_role?: boolean;
  study_year: string;
  term: number;
  transcripts: any[]; // hoặc định nghĩa interface riêng nếu transcript có cấu trúc cụ thể
  created_at?: Date;
  updated_at?: Date;
}


// Academic Document Types
export interface AcademicDocument {
  id: string;
  type: 'transcript' | 'student_card' | 'social_activity' | 'achievement';
  file_url: string;
  file_name: string;
  uploaded_at: string;
  status: 'pending' | 'verified' | 'rejected';
}
