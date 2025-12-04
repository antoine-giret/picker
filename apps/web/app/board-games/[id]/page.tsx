'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import { Breadcrumb, TBreadcrumbItem } from '@repo/ui/breadcrumb';
import { TBoardGame } from 'api/board-games/entities/board-game.entity.js';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useFetcher } from '../../hooks/fetcher';
import { useMemo } from 'react';
import { TextSkeleton } from '@repo/ui/text-skeleton';

export default function BoardGame() {
  const { id } = useParams();
  const { data: boardGame } = useFetcher<TBoardGame>(`/board-games/${id}`);
  const items = useMemo<TBreadcrumbItem[]>(
    () => [
      { key: 'home', href: '/', label: 'Accueil', Icon: HomeIcon },
      { key: 'boardGames', href: '/board-games', label: 'Jeux de société' },
      {
        key: 'boardGame',
        label: boardGame ? (
          boardGame.name
        ) : (
          <div className="w-50">
            <TextSkeleton size="sm" width="100%" />
          </div>
        ),
      },
    ],
    [boardGame],
  );

  return (
    <div className="flex flex-col grow-1 gap-6 w-full">
      <Breadcrumb Link={Link} items={items} />
      {boardGame ? (
        <h1 className="text-xl font-bold">{boardGame.name}</h1>
      ) : (
        <div className="w-100 max-w-full">
          <TextSkeleton size="lg" width="100%" />
        </div>
      )}
    </div>
  );
}
