import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  error?: { message: string };
  children: React.ReactNode;
  required?: boolean;
  theme?: "user" | "university" | "loan"; // user, university, or loan
  description?: string;
}

const FormField = ({
  label,
  icon: Icon,
  error,
  children,
  required = false,
  theme = "user", // user or university
  description,
}: FormFieldProps) => {
  const formFieldTheme = {
    user: {
      icon: "text-blue-500",
    },
    university: {
      icon: "text-indigo-500",
    },
    loan: {
      icon: "text-green-500",
    },
  };
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
        {Icon && (
          <Icon className={`mr-2 h-4 w-4 ${formFieldTheme[theme].icon}`} />
        )}
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      <div className="relative">
        {children}
        {error && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="mr-1 h-4 w-4" />
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
