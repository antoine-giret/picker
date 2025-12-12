import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity.js';
import { createContext } from 'react';

export const BoardGameEditorsContext = createContext<{ list?: TBoardGameEditor[] }>({});
