import { ChangeEventHandler, ReactNode } from "react";

type InputProps = {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  isSuccess?: boolean;
  success?: string;
  autoFocus?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  rightElement?: ReactNode;
};

export default function Input({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  isSuccess,
  success,
  autoFocus,
  required,
  minLength,
  maxLength,
  pattern,
  title,
  rightElement,
}: InputProps) {
  return (
    <div className="flex flex-col flex-1 gap-1 mb-4">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={id}
          className={`w-full lg:text-sm border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4 ${
            rightElement ? "pr-12" : ""
          }`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          title={title}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {isSuccess && (
        <p className="font-fraunces text-sm font-medium text-mint-4 mt-1">
          {success}
        </p>
      )}
    </div>
  );
}
