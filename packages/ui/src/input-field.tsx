import { HTMLInputAutoCompleteAttribute } from 'react';

export function InputField({
  id,
  autoComplete,
  required,
  disabled,
  label,
  hideLabel,
  placeholder,
  value,
  secondaryAction,
  onChange,
}: {
  autoComplete?: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
  hideLabel?: boolean;
  id: string;
  label: React.ReactNode;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  secondaryAction?: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={hideLabel ? 'sr-only' : 'block pl-2 text-sm font-medium text-heading'}
          htmlFor={id}
        >
          {label}
          {!hideLabel && required ? ' *' : ''}
        </label>
      )}
      <div className="flex w-full rounded-md bg-black/5 dark:bg-white/5 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-purple-500 shadow-xs">
        <input
          className={`w-full block px-3 py-2 text-heading text-sm ${disabled ? 'text-black/50 dark:text-white/50' : ''} placeholder:text-body focus:outline-none`}
          disabled={disabled}
          id={id}
          onChange={({ target: { value: newValue } }) => onChange(newValue)}
          placeholder={placeholder}
          required={required}
          type="text"
          value={value}
          {...(autoComplete === 'off'
            ? { autoComplete: 'off', 'data-lpignore': 'true', 'data-form-type': 'other' }
            : { autoComplete })}
        />
        {secondaryAction}
      </div>
    </div>
  );
}
