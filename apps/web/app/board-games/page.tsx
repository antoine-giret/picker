'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/button';
import { TBoardGame } from 'api/board-games/entities/board-game.entity.js';
import Link from 'next/link';
import { useContext } from 'react';

import { BoardGameEditorsContext } from '../context';
import { useFetcher } from '../hooks/fetcher';

import Loading from './loading';
import List from './list';
import EmptyState from './list/empty-state';

export default function BoardGames() {
  const boardGameEditorsContext = useContext(BoardGameEditorsContext);
  const { data: boardGames, error, isLoading } = useFetcher<TBoardGame[]>('/board-games');

  if (!boardGames || error || isLoading) return <Loading />;

  if (!boardGameEditorsContext || boardGames.length === 0) {
    return <EmptyState noGameYet text="Ton placard est pour le moment vide..." />;
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
