import { RoudedSkeleton } from '@repo/ui/rounded-skeleton';

import { className } from './list/filters';
import Wrapper from './list/wrapper';

export default function Loading() {
  return (
    <Wrapper
      filters={
        <div className={className}>
          <div className="h-9">
            <RoudedSkeleton />
          </div>
        </div>
      }
    />
  );
}
