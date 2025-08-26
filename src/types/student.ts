// Student Types
export interface Student {
  id: string;
  student_id: string;
  university: string;
  class_id: string;
  faculty_name: string;
  major_name: string;
  year_of_study:number  ,
  academic_year: number;
  graduation_year: number;
  created_at?: string;
  updated_at?: string;
  student_card_front: string | null;
  student_card_back: string | null;
  has_parttime_job: boolean | null;
  has_supporter: boolean | null;
}
