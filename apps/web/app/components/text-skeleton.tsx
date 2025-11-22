type TSize = 'xs' | 'sm' | 'md';

const heights: { [key in TSize]: [string, string] } = {
  xs: ['h-4', 'h-2'],
  sm: ['h-5', 'h-2.5'],
  md: ['h-6', 'h-3'],
};

type TWidth = '80%' | '90%';

const widths: { [key in TWidth]: string } = { '80%': 'w-8/10', '90%': 'w-9/10' };

function TextSkeleton({ size, width }: { size: TSize; width: TWidth }) {
  const [boxHeight, spanHeight] = heights[size];

  return (
    <div className={`flex items-center ${boxHeight} ${widths[width]}`}>
      <span className={`${spanHeight} w-full rounded bg-black/10 dark:bg-white/10`} />
    </div>
  );
}

export default TextSkeleton;
