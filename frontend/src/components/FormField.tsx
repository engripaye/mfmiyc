import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  children?: ReactNode;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function FormField({
  id,
  label,
  required = false,
  children,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {children ?? (
        <input
          id={id}
          name={id}
          required={required}
          {...inputProps}
        />
      )}
    </div>
  );
}
