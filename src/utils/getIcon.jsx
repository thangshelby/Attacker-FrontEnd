import { Award, FileText, Users, Calendar, Settings } from "lucide-react";

const textToIcon = {
  award: Award,
  "file-text": FileText,
  users: Users,
  calendar: Calendar,
  settings: Settings,
};

export const getIcon = (icon) => {
  return textToIcon[icon];
};
