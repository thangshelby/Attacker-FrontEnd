import { Award, FileText, Users, Calendar, Settings,CheckCircle } from "lucide-react";

const textToIcon = {
  award: Award,
  "file-text": FileText,
  users: Users,
  calendar: Calendar,
  "check-circle": CheckCircle,
  settings: Settings,
};

export const getIcon = (icon) => {
  return textToIcon[icon];
};
