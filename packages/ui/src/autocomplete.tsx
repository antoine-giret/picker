import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Avatar } from './avatar';

export type TAutocompleteValue = {
  disabled?: boolean;
  hasAvatar?: boolean;
  key: number | string;
  label: string;
};

const loadingOption: TAutocompleteValue = { key: 'loading', label: 'Chargement des éditeurs...' };

export function Autocomplete({
  id,
  disabled,
  label,
  hideLabel,
  placeholder,
  value,
  filteredOptions,
  setSearch,
  onChange,
}: {
  disabled?: boolean;
  id: string;
  label: React.ReactNode;
  filteredOptions?: TAutocompleteValue[];
  hideLabel?: boolean;
  onChange: (value: TAutocompleteValue | null) => void;
  placeholder?: string;
  setSearch: (search: string) => void;
  value: TAutocompleteValue | null;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={hideLabel ? 'sr-only' : 'block pl-2 text-sm font-medium text-heading'}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div
        className={`flex w-full rounded-md bg-black/5 dark:bg-white/5 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-purple-500 shadow-xs`}
      >
        <Combobox disabled={disabled} value={value} onChange={onChange} onClose={() => undefined}>
          <ComboboxInput
            className={`w-full block px-3 py-2 text-heading text-sm ${disabled ? 'text-black/50 dark:text-white/50' : ''} placeholder:text-body focus:outline-none`}
            displayValue={(option: TAutocompleteValue) => option?.label || ''}
            id={id}
            onChange={({ target: { value } }) => setSearch(value)}
            placeholder={placeholder}
          />
          <ComboboxOptions
            anchor={{ to: 'bottom', gap: -6 }}
            className="w-(--input-width) rounded-b-md bg-white dark:bg-gray-900 empty:invisible border-x-2 border-b-2 border-purple-500"
          >
            <div className="pt-1 bg-black/10 dark:bg-white/10">
              <div className="border-t-1 border-black/5 dark:border-white/5">
                {filteredOptions ? (
                  filteredOptions.map((option) => (
                    <ComboboxOption
                      className={`flex items-center gap-3 px-3 py-1 min-h-8 text-sm ${option.disabled ? '' : 'hover:bg-black/5 hover:dark:bg-white/5 cursor-pointer'}`}
                      disabled={option.disabled}
                      key={option.key}
                      value={option}
                    >
                      {option.hasAvatar && <Avatar text={option.label} />}
                      {option.label}
                    </ComboboxOption>
                  ))
                ) : (
                  <ComboboxOption
                    disabled
                    className="flex items-center px-3 py-1 min-h-8 text-sm"
                    value={loadingOption}
                  >
                    {loadingOption.label}
                  </ComboboxOption>
                )}
              </div>
            </div>
          </ComboboxOptions>
        </Combobox>
        {value && (
          <button
            className="shrink-0 h-9 w-9 rounded-md flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            onClick={(event) => {
              onChange(null);
              event.preventDefault();
            }}
          >
            <XMarkIcon className="size-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
