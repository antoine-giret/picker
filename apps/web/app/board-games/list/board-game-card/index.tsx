import {
  CakeIcon,
  ClockIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { RoudedSkeleton } from '@repo/ui/rounded-skeleton';
import { TextSkeleton } from '@repo/ui/text-skeleton';
import { TBoardGame } from 'api/board-games/entities/board-game.entity.js';
import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity.js';
import Link from 'next/link';

import Stat from './stat';

function PlayersStat({
  boardGame: { minNumberOfPlayers, maxNumberOfPlayers },
}: {
  boardGame: TBoardGame;
}) {
  let value: string;
  const singlePlayer = maxNumberOfPlayers && minNumberOfPlayers === 1 && maxNumberOfPlayers === 1;
  const oneToOne = maxNumberOfPlayers && minNumberOfPlayers === 2 && maxNumberOfPlayers === 2;

  if (singlePlayer) value = 'Solo';
  else if (oneToOne) value = 'Duel';
  else if (maxNumberOfPlayers) {
    if (maxNumberOfPlayers === minNumberOfPlayers) {
      value = `${minNumberOfPlayers} joueurs`;
    } else {
      value = `De ${minNumberOfPlayers} à ${maxNumberOfPlayers} joueurs`;
    }
  } else {
    if (minNumberOfPlayers === 1) value = '1 joueur et +';
    else value = `${minNumberOfPlayers} joueurs et +`;
  }

  return (
    <Stat Icon={singlePlayer ? UserIcon : oneToOne ? UsersIcon : UserGroupIcon} value={value} />
  );
}

function Stats({ boardGame }: { boardGame: TBoardGame }) {
  const { durationInMinutes, minAge } = boardGame;

  return (
    <>
      {durationInMinutes && <Stat Icon={ClockIcon} value={`${durationInMinutes}min`} />}
      <PlayersStat boardGame={boardGame} />
      {minAge && <Stat Icon={CakeIcon} value={`${minAge}ans et +`} />}
    </>
  );
}

function Content({
  boardGameEditors,
  boardGame,
}: {
  boardGame?: TBoardGame;
  boardGameEditors?: TBoardGameEditor[];
}) {
  const editor =
    boardGameEditors && boardGame
      ? (boardGame.editorId && boardGameEditors.find(({ id }) => id === boardGame.editorId)) || null
      : undefined;

  return (
    <div className="flex items-start gap-3">
      <div className="w-16 shrink-0">
        {boardGame ? (
          <div className="flex items-center justify-center h-16 rounded-md bg-black/10 dark:bg-white/10">
            <PuzzlePieceIcon className="size-6" />
          </div>
        ) : (
          <div className="h-16">
            <RoudedSkeleton />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 grow-1">
        <div className="flex flex-col">
          {boardGame ? (
            <span className="text-md font-bold">{boardGame.name}</span>
          ) : (
            <TextSkeleton size="md" width="90%" />
          )}
          {editor ? (
            <span className="text-sm text-black/90 dark:text-white/90">{editor.name}</span>
          ) : (
            editor === undefined && <TextSkeleton size="sm" width="80%" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          {boardGame ? (
            <Stats boardGame={boardGame} />
          ) : (
            <>
              <Stat Icon={ClockIcon} />
              <Stat Icon={UserGroupIcon} />
              <Stat Icon={CakeIcon} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BoardGameCard({
  boardGameEditors,
  boardGame,
}: {
  boardGame?: TBoardGame;
  boardGameEditors?: TBoardGameEditor[];
}) {
  const className = `block rounded-md p-3 bg-black/5 dark:bg-white/5 ${boardGame ? 'hover:bg-black/10 dark:hover:bg-white/10' : 'animate-pulse'}`;

  if (!boardGameEditors || !boardGame) {
    return (
      <div className={className}>
        <Content />
      </div>
    );
  }

  return (
    <Link className={className} href={`/board-games/${boardGame.id}`}>
      <Content boardGame={boardGame} boardGameEditors={boardGameEditors} />
    </Link>
  );
}
