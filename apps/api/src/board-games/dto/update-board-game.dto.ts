import { TBoardGameMechanism } from '../entities/board-game.entity';

export class UpdateBoardGameDto {
  durationInMinutes?: number | null;
  editorId?: number | null;
  maxNumberOfPlayers?: number | null;
  minAge?: number | null;
  minNumberOfPlayers?: number;
  name?: string;
  tags?: { mechanisms: TBoardGameMechanism[] };
}
