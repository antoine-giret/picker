import { RoudedSkeleton } from '@repo/ui/rounded-skeleton';

import Wrapper from './wrapper';

export default function Loader() {
  return (
    <Wrapper
      filters={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="h-9">
            <RoudedSkeleton />
          </div>
        </div>
      }
    />
  );
}
