'use client';

import { TBoardGame } from 'api/board-games/entities/board-game.entity.js';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFetcher } from '../../hooks/fetcher';

export default function BoardGame() {
  const { id } = useParams();
  const { data: boardGame } = useFetcher<TBoardGame>(`/board-games/${id}`);

  return (
    <div>
      <Link href="/board-games">Retour</Link>
      <h1>{boardGame?.name}</h1>
    </div>
  );
}
