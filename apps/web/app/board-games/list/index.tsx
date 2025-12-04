'use client';

import { TBoardGame } from 'api/board-games/entities/board-game.entity.js';
import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity.js';
import { useState } from 'react';

import Filters from './filters';
import Wrapper from './wrapper';

export default function List({
  boardGameEditors,
  boardGames,
}: {
  boardGames: TBoardGame[];
  boardGameEditors: TBoardGameEditor[];
}) {
  const [search, setSearch] = useState('');
  const [filteredBoardGames, setFilteredBoardGames] = useState(filterBoardGames);

  function filterBoardGames() {
    return boardGames.filter(
      ({ name }) =>
        !search ||
        name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            search
              .trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ),
    );
  }

  function handleFilter() {
    setFilteredBoardGames(filterBoardGames());
  }

  return (
    <Wrapper
      boardGameEditors={boardGameEditors}
      filteredBoardGames={filteredBoardGames}
      filters={<Filters handleSubmit={handleFilter} search={search} setSearch={setSearch} />}
    />
  );
}
