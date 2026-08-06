import { ChangeEventHandler, ReactNode } from "react";

type CheckboxProps = {
  children: ReactNode;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};

export default function Checkbox({
  children,
  checked,
  onChange,
  required,
}: CheckboxProps) {
  return (
    <label className="flex gap-2 text-sm my-6">
      <input
        className="checked:accent-mint-4"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <span>{children}</span>
    </label>
  );
}
