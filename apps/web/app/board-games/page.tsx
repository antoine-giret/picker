import { BoardGamesService } from '@repo/api/services/board-games';
import { Suspense } from 'react';

import List from './list';
import Loader from './list/loader';

export default function BoardGames() {
  const boardGamesPromise = BoardGamesService.findAll();

  return (
    <div className="flex flex-col grow-1 items-center gap-6 pt-6 pb-24">
      <Suspense fallback={<Loader />}>
        <List boardGamesPromise={boardGamesPromise} />
      </Suspense>
    </div>
  );
}
