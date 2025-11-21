import { TBoardGame } from 'api/board-games/entities/board-game.entity';

export class BoardGamesService {
  static async findAll(): Promise<TBoardGame[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board-games`);
    const data = response.json();
    
    return data;
  }

  static async findOne(id: number): Promise<TBoardGame> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board-games/${id}`);
    const data = response.json();
    
    return data;
  }
}
