// Notification Types
export interface Notification {
  _id: string;
  citizen_id:string,
  header: string;
  content: string;
  icon:string,
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

// Chatbot Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export interface ChatSession {
  id: string;
  user_id: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

// Utility Types
export type NotificationType = 'info' | 'success' | 'warning' | 'error'; 