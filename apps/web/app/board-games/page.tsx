'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/button';
import { TBoardGame } from 'api/board-games/entities/board-game.entity.js';
import Link from 'next/link';
import { useContext } from 'react';

import { BoardGameEditorsContext } from '../context';
import { useFetcher } from '../hooks/fetcher';
import List from './list';
import EmptyState from './list/empty-state';
import Loading from './loading';

export default function BoardGames() {
  const { list: boardGameEditors } = useContext(BoardGameEditorsContext);
  const { data: boardGames, error, isLoading } = useFetcher<TBoardGame[]>('/board-games');

  if (!boardGames || error || isLoading) return <Loading />;

  if (!boardGameEditors || boardGames.length === 0) {
    return <EmptyState noGameYet text="Ton placard est pour le moment vide..." />;
  }

  return (
    <>
      <List boardGameEditors={boardGameEditors} boardGames={boardGames} />
      <div className="fixed bottom-6 right-6">
        <Button
          Icon={PlusIcon}
          Link={Link}
          href="/board-games/new"
          label="Ajouter un jeu"
          variant="contained"
        />
      </div>
    </>
  );
}
