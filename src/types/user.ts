// User and Authentication Types
export interface User {
  id: string;
  citizen_id: string;
  email: string;
  role: 'User' | 'Admin';
  name?: string;
  phone?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthError {
  email: string | null;
  password: string | null;
  server: string | null;
}

// Identity Profile Types
export interface IdentityProfile {
  id: string;
  user_id: string;
  citizen_id: string;
  full_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  citizen_card_front_url?: string;
  citizen_card_back_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Utility Types
export type Role = 'User' | 'Admin';
export type Gender = 'male' | 'female' | 'other';
