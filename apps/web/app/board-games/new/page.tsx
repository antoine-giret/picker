import { HomeIcon } from '@heroicons/react/24/outline';
import { Breadcrumb, TBreadcrumbItem } from '@repo/ui/breadcrumb';
import Link from 'next/link';
import { useMemo } from 'react';

export default function NewBoardGame() {
  const items = useMemo<TBreadcrumbItem[]>(
    () => [
      { key: 'home', href: '/', label: 'Accueil', Icon: HomeIcon },
      { key: 'boardGames', href: '/board-games', label: 'Jeux de société' },
      { key: 'newBoardGame', label: 'Nouveau jeu' },
    ],
    [],
  );

  return (
    <div className="flex flex-col grow-1 gap-6 w-full">
      <Breadcrumb Link={Link} items={items} />
      <h1 className="text-xl font-bold">Ajouter un jeu de société</h1>
    </div>
  );
}
