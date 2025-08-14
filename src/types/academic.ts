// Academic Profile Types
export interface AcademicProfile {
  id: string;
  student_id: string;
  university: string;
  major: string;
  gpa: number;
  academic_year: number;
  graduation_year: number;
  transcript_url?: string;
  student_card_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
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
