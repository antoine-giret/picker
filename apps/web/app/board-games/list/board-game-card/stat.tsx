import { ClockIcon } from '@heroicons/react/24/outline';
import { CircularSkeleton } from '@repo/ui/circular-skeleton';
import { TextSkeleton } from '@repo/ui/text-skeleton';

export default function Stat({ Icon, value }: { Icon: typeof ClockIcon; value?: string }) {
  return (
    <div className="flex items-center gap-2">
      {value ? <Icon className="size-4" /> : <CircularSkeleton size={4} />}
      {value ? (
        <span className="text-sm text-black/90 dark:text-white/90">{value}</span>
      ) : (
        <TextSkeleton size="sm" width="90%" />
      )}
    </div>
  );
}
