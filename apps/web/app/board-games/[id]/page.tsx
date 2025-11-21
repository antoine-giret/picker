'use client';

import { BoardGamesService } from '@repo/api/services/board-games';
import { TBoardGame } from 'api/board-games/entities/board-game.entity';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BoardGames() {
  const { id } = useParams();
  const [boardGame, setBoardGame] = useState<TBoardGame>();

  useEffect(() => {
    let cancelled = false;

    async function findGame(id: number) {
      try {
        const data = await BoardGamesService.findOne(id);
        if (!cancelled) setBoardGame(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (typeof id === 'string') findGame(parseInt(id));

    return () => {
      setBoardGame(undefined);
      cancelled = true;
    };
  }, [id]);

  return (
    <div>
      <Link href="/board-games">Retour</Link>
      <h1>{boardGame?.name}</h1>
    </div>
  );
}
