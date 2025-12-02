import { FaceFrownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/button';
import Link from 'next/link';
import React from 'react';

export default function EmptyState({
  size,
  text,
  noGameYet,
}: {
  noGameYet?: boolean;
  size?: 'small';
  text: React.ReactNode;
}) {
  return (
    <div className="flex flex-col grow-1 items-center justify-center gap-6 py-6">
      <FaceFrownIcon className="size-12" />
      <span className={`${size === 'small' ? 'text-sm' : 'text-md'} font-bold text-center`}>
        {text}
      </span>
      <Button
        Link={Link}
        href="/board-games/new"
        Icon={PlusIcon}
        label={noGameYet ? 'Ajouter mon premier jeu' : 'Ajouter un nouveau jeu'}
        size={size}
        variant="contained"
      />
    </div>
  );
}
