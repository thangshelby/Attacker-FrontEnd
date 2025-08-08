import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default: "hover:bg-slate-700 dark:bg-slate-50 dark:hover:bg-slate-200",
        destructive: "hover:bg-red-600 dark:hover:bg-red-600",
        outline: "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700",
        subtle: "hover:bg-slate-200 dark:bg-slate-700",
        ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
        link: "bg-transparent underline-offset-4 hover:underline hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
