import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// interface StepProps {
//   title: string
//   description?: string
//   isCompleted?: boolean
//   isActive?: boolean
// }

const Step = ({ title, description, isCompleted, isActive }) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
                ? "border-primary"
                : "border-muted",
          )}
        >
          {isCompleted ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="text-xs font-medium">{title[0]}</span>
          )}
        </div>
      </div>
      <div className="ml-4">
        <div
          className={cn(
            "text-sm font-medium",
            isActive || isCompleted
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          {title}
        </div>
        {description && (
          <div className="text-muted-foreground text-sm">{description}</div>
        )}
      </div>
    </div>
  );
};

// interface StepperProps {
//   steps: Array<{ title: string; description?: string }>
//   currentStep: number
//   onStepChange: (step: number) => void
// }

export function Stepper({ steps, currentStep, onStepChange }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col items-start justify-between gap-1 md:flex-row md:items-center lg:gap-2 2xl:gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <Step
              title={step.title}
              description={step.description}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
            />
            {index < steps.length - 1 && (
              <ChevronRight className="text-muted-foreground hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
