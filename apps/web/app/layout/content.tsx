'use client';

import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity';
import { use } from 'react';

import { BoardGameEditorsContext } from '../context';

export default function Content({
  boardGameEditorsPromise,
  children,
}: Readonly<{
  boardGameEditorsPromise: Promise<TBoardGameEditor[]>;
  children: React.ReactNode;
}>) {
  const boardGameEditors = use(boardGameEditorsPromise);

  return (
    <BoardGameEditorsContext value={{ list: boardGameEditors }}>{children}</BoardGameEditorsContext>
  );
}
