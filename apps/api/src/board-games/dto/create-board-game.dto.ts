import { TBoardGameMechanism } from '../entities/board-game.entity';

export class CreateBoardGameDto {
  durationInMinutes?: number | null;
  editorId?: number | null;
  maxNumberOfPlayers?: number | null;
  minAge?: number | null;
  minNumberOfPlayers?: number | null;
  name: string;
  tags?: { mechanisms?: TBoardGameMechanism[] };
}
