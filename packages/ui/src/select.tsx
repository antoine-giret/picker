export function Select<T extends string | number>({
  id,
  required,
  disabled,
  label,
  hideLabel,
  value,
  options,
  onChange,
}: {
  disabled?: boolean;
  hideLabel?: boolean;
  id: string;
  label: React.ReactNode;
  onChange: (value: T) => void;
  options: Array<{ disabled?: boolean; label: React.ReactNode; value: T }>;
  required?: boolean;
  value: T;
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
      <div className="flex w-full rounded-md bg-black/5 dark:bg-white/5 has-[select:focus-within]:outline-2 has-[select:focus-within]:-outline-offset-2 has-[select:focus-within]:outline-purple-500 shadow-xs">
        <select
          className={`w-full block px-3 py-2 outline-none text-heading text-sm ${disabled ? 'text-black/50 dark:text-white/50' : ''}`}
          disabled={disabled}
          id={id}
          required={required}
          onChange={({ target: { value: newValue } }) => onChange(newValue as T)}
          value={value}
        >
          {options.map(({ value, label, disabled }) => (
            <option disabled={disabled} key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
