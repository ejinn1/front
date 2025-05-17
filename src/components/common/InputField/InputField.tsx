import { cn } from "@/utils/className";
import { forwardRef } from "react";
import { Input, InputProps } from "../Input";

interface InputFieldProps extends InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, className, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-5 w-full">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="text-base-semibold text-slate-800"
          >
            {label}
            {required && <span className="ml-8 text-error">*</span>}
          </label>
        )}
        <div className="relative">
          <Input
            ref={ref}
            required={required}
            className={cn(error && "border-error", className)}
            aria-invalid={!!error}
            {...props}
          />
          {icon && (
            <div className="absolute top-1/2 -translate-y-1/2 right-24">
              {icon}
            </div>
          )}
        </div>
        <span className="h-20 text-sm text-error">
          {error ? error : <span className="invisible">placeholder</span>}
        </span>
      </div>
    );
  }
);

InputField.displayName = "InputField";
