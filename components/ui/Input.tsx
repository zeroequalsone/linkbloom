type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  isSuccess?: boolean;
  success?: string;
  autoFocus?: boolean;
};

export default function Input({
  label,
  type,
  placeholder,
  isSuccess,
  success,
  autoFocus,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="lg:text-sm border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4"
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {isSuccess && (
        <p className="font-fraunces text-sm font-medium text-mint-4">
          {success}
        </p>
      )}
    </div>
  );
}
