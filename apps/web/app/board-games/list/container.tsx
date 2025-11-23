import { BoardGamesService } from '@repo/api/services/board-games';
import { Suspense } from 'react';

import Content from './content';
import List from './list';

export default function ListContainer() {
  const boardGamesPromise = BoardGamesService.findAll();

  return (
    <Suspense fallback={<List />}>
      <Content boardGamesPromise={boardGamesPromise} />
    </Suspense>
  );
}
