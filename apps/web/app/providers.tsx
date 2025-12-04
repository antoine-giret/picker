'use client';

import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity.js';

import { BoardGameEditorsContext } from './context';
import { useFetcher } from './hooks/fetcher';

export function Providers({ children }: { children: React.ReactNode }) {
  const {
    data: boardGameEditors,
    error,
    isLoading,
  } = useFetcher<TBoardGameEditor[]>('/board-game-editors');

  if (!boardGameEditors || error || isLoading) return <>{children}</>;

  return (
    <BoardGameEditorsContext value={{ list: boardGameEditors }}>{children}</BoardGameEditorsContext>
  );
}
