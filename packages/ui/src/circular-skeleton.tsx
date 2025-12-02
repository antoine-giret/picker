type TSize = 4;

const sizes: { [key in TSize]: string } = {
  4: 'h-4 w-4',
};

export function CircularSkeleton({ size }: { size: TSize }) {
  return (
    <div className={`${sizes[size]} bg-black/10 dark:bg-white/10`} style={{ borderRadius: 1000 }} />
  );
}
