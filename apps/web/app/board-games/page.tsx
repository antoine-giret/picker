'use client';

import { BoardGamesService } from '@repo/api/services/board-games';
import { BoardGameEditorsService } from '@repo/api/services/board-game-editors';
import { TBoardGame } from 'api/board-games/entities/board-game.entity';
import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity';
import { useEffect, useState } from 'react';

import Button from '../components/button';

import BoardGameCard from './board-game-card';
import EmptyState from './empty-state';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function BoardGames() {
  const [boardGameEditors, setBoardGameEditors] = useState<TBoardGameEditor[]>();
  const [boardGames, setBoardGames] = useState<TBoardGame[]>();

  useEffect(() => {
    let cancelled = false;

    async function findGameEditors() {
      try {
        const list = await BoardGameEditorsService.findAll();
        if (!cancelled) setBoardGameEditors(list);
      } catch (err) {
        console.error(err);
      }
    }

    async function findGames() {
      try {
        const list = await BoardGamesService.findAll();
        if (!cancelled) setBoardGames(list);
      } catch (err) {
        console.error(err);
      }
    }

    findGameEditors();
    findGames();

    return () => {
      cancelled = true;
    };
  }, []);

  if (boardGames && boardGames.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col grow-1 items-center gap-6 pt-6 pb-24">
      <h1 className="text-md font-bold text-center">Les jeux de société de ton placard</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(boardGameEditors &&
          boardGames?.map((boardGame) => (
            <BoardGameCard
              boardGame={boardGame}
              boardGameEditors={boardGameEditors}
              key={boardGame.id}
            />
          ))) ||
          new Array(10).fill(null).map((_, index) => <BoardGameCard key={index} />)}
      </div>
      {boardGames && (
        <div className="fixed bottom-6 right-6">
          <Button
            href="/board-games/new"
            Icon={PlusIcon}
            label="Ajouter un jeu"
            variant="contained"
          />
        </div>
      )}
    </div>
  );
}
