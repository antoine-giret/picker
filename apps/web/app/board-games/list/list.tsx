import { TBoardGame } from 'api/board-games/entities/board-game.entity';
import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity';

import BoardGameCard from './board-game-card';

export default function List({
  boardGameEditors,
  boardGames,
}: {
  boardGames?: TBoardGame[];
  boardGameEditors?: TBoardGameEditor[];
}) {
  return (
    <>
      <h1 className="text-md font-bold text-center">Les jeux de société de ton placard</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {boardGames?.map((boardGame) => (
          <BoardGameCard
            boardGame={boardGame}
            boardGameEditors={boardGameEditors}
            key={boardGame.id}
          />
        )) || new Array(10).fill(null).map((_, index) => <BoardGameCard key={index} />)}
      </div>
    </>
  );
}
