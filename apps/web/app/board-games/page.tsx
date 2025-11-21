'use client';

import { BoardGamesService } from '@repo/api/services/board-games';
import { TBoardGame } from 'api/board-games/entities/board-game.entity';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BoardGames() {
  const [boardGames, setBoardGames] = useState<TBoardGame[]>();

  useEffect(() => {
    let cancelled = false;

    async function findGames() {
      try {
        const list = await BoardGamesService.findAll();
        if (!cancelled) setBoardGames(list);
      } catch (err) {
        console.error(err);
      }
    }

    findGames();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <Link href="/">Accueil</Link>
      <h1>Jeux de société</h1>
      <ul>
        {boardGames?.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/board-games/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
