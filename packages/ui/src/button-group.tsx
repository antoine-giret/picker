export function ButtonGroup<T extends string | number>({
  wrap,
  label,
  options,
  ...props
}: {
  label?: React.ReactNode;
  options: Array<{ label: React.ReactNode; value: T }>;
  wrap?: boolean;
} & (
  | { onChange: (value: T) => void; value: T }
  | { multiple: true; onChange: (values: T[]) => void; values: T[] }
)) {
  const cols: { [key: number]: string } = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  function handleChange(value: T) {
    if (!('multiple' in props)) {
      props.onChange(value);
      return;
    }

    const values = props.values.slice();
    const index = props.values.indexOf(value);
    if (index > -1) values.splice(index, 1);
    else values.push(value);

    props.onChange(values);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="block pl-2 text-sm font-medium text-heading">{label}</label>}
      <div className={wrap ? 'flex flex-wrap gap-2' : `grid ${cols[options.length]} gap-2`}>
        {options.map(({ value, label }) => {
          const active = 'multiple' in props ? props.values.includes(value) : props.value === value;

          return (
            <div key={value}>
              <button
                className={`${wrap ? 'px-3' : 'w-full'} flex items-center justify-center h-9 rounded-md text-sm ${active ? 'bg-purple-500 text-white' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10'} ${!active || 'multiple' in props ? 'cursor-pointer' : ''}`}
                onClick={() => handleChange(value)}
                type="button"
              >
                {label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
