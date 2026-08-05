import { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  type: string;
  value?: string;
  onChange?: ChangeEventHandler;
  placeholder: string;
  isSuccess?: boolean;
  success?: string;
  minLength?: number;
  autoFocus?: boolean;
  required?: boolean;
};

export default function Input({
  label,
  type,
  value,
  onChange,
  placeholder,
  isSuccess,
  success,
  minLength,
  autoFocus,
  required,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={label}
        className="lg:text-sm border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={minLength}
        autoFocus={autoFocus}
        required={required}
      />
      {isSuccess && (
        <p className="font-fraunces text-sm font-medium text-mint-4">
          {success}
        </p>
      )}
    </div>
  );
}
