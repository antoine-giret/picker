'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/button';
import { TBoardGame } from 'api/board-games/entities/board-game.entity';
import Link from 'next/link';
import { use, useContext } from 'react';

import { BoardGameEditorsContext } from '../../context';

import EmptyState from './empty-state';
import List from './list';

export default function Content({
  boardGamesPromise,
}: {
  boardGamesPromise: Promise<TBoardGame[]>;
}) {
  const boardGameEditorsContext = useContext(BoardGameEditorsContext);
  const boardGames = use(boardGamesPromise);

  if (!boardGameEditorsContext || boardGames.length === 0) {
    return <EmptyState />;
  }

  const { list: boardGameEditors } = boardGameEditorsContext;

  return (
    <>
      <List boardGameEditors={boardGameEditors} boardGames={boardGames} />
      <div className="fixed bottom-6 right-6">
        <Button
          Link={Link}
          href="/board-games/new"
          Icon={PlusIcon}
          label="Ajouter un jeu"
          variant="contained"
        />
      </div>
    </>
  );
}
