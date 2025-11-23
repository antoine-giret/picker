import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity';
import { createContext } from 'react';

export const BoardGameEditorsContext = createContext<{ list: TBoardGameEditor[] } | null>(null);
