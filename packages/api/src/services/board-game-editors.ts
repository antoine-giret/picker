import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity';

export class BoardGameEditorsService {
  static async findAll(): Promise<TBoardGameEditor[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board-game-editors`);
    const data = response.json();
    
    return data;
  }
}
