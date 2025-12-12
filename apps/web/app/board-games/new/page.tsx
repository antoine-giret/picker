'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import { Autocomplete, TAutocompleteValue } from '@repo/ui/autocomplete';
import { Breadcrumb, TBreadcrumbItem } from '@repo/ui/breadcrumb';
import { Button } from '@repo/ui/button';
import { ButtonGroup } from '@repo/ui/button-group';
import { InputField } from '@repo/ui/input-field';
import { Select } from '@repo/ui/select';
import {
  boardGameMechanisms,
  TBoardGameMechanism,
} from 'api/board-games/entities/board-game.entity.js';
import { TBoardGameEditor } from 'api/board-games/entities/board-game-editor.entity.js';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { useContext, useMemo, useState } from 'react';

import { BoardGameEditorsContext } from '../../context';
import { durations, durationsMap, mechanismsMap, TDuration } from '../types';

const minNumberOfPlayersOptions = new Array(10).fill(null).map((_, index) => {
  const numberOfPlayers = index + 1;

  return {
    value: numberOfPlayers,
    label: numberOfPlayers === 1 ? '1 joueur' : `${numberOfPlayers} joueurs`,
  };
});

type TMaxNumberOfPlayers = number | '';

const _maxNumberOfPlayersOptions: Array<{ value: TMaxNumberOfPlayers; label: React.ReactNode }> = [
  ...minNumberOfPlayersOptions,
  { value: '', label: 'Pas de limite' },
];

const minAgeOptions = new Array(18).fill(null).map((_, index) => {
  const age = index + 1;

  return {
    value: age,
    label: age === 1 ? '1 an' : `${age} ans`,
  };
});

const noEditorOption: TAutocompleteValue = {
  key: 'noResult',
  label: 'Aucun éditeur trouvé',
  disabled: true,
};

export default function NewBoardGame() {
  const items = useMemo<TBreadcrumbItem[]>(
    () => [
      { key: 'home', href: '/', label: 'Accueil', Icon: HomeIcon },
      { key: 'boardGames', href: '/board-games', label: 'Jeux de société' },
      { key: 'newBoardGame', label: 'Nouveau jeu' },
    ],
    [],
  );
  const [name, setName] = useState('');
  const [editor, setEditor] = useState<TAutocompleteValue | null>(null);
  const [editorsOptions, setEditorsOptions] = useState<TAutocompleteValue[]>();
  const [minNumberOfPlayers, setMinNumberOfPlayers] = useState(2);
  const [maxNumberOfPlayers, setMaxNumberOfPlayers] = useState<TMaxNumberOfPlayers>('');
  const [durationInMinutes, setDurationInMinutes] = useState<TDuration>('30Min');
  const [minAge, setMinAge] = useState(7);
  const [mechanisms, setMechanisms] = useState<TBoardGameMechanism[]>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { list: boardGamesEditors } = useContext(BoardGameEditorsContext);

  function filterEditors(boardGamesEditors: TBoardGameEditor[] | undefined, search: string) {
    if (!boardGamesEditors || !search) {
      setEditorsOptions([]);
      return;
    }

    const options = boardGamesEditors
      .filter(({ name }) =>
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
      )
      .slice(0, 5)
      .map<TAutocompleteValue>(({ id: key, name: label }) => ({ key, label, hasAvatar: true }));

    if (options.length === 0) options.push(noEditorOption);

    setEditorsOptions(options);
  }

  const onEditorSearchChange = useMemo(
    () => debounce((search: string) => filterEditors(boardGamesEditors, search), 300),
    [boardGamesEditors],
  );

  function handleSubmit() {
    setSubmitting(true);

    setSubmitting(false);
  }

  const maxNumberOfPlayersOptions = _maxNumberOfPlayersOptions.map((option) => ({
    ...option,
    disabled: typeof option.value === 'number' && option.value < minNumberOfPlayers,
  }));

  const durationOptions = durations.map((value) => ({ value, label: durationsMap[value].label }));

  const mechanismsOptions = boardGameMechanisms.map((value) => ({
    value,
    label: mechanismsMap[value].label,
  }));

  return (
    <div className="flex flex-col grow-1 items-center gap-6 w-full">
      <div className="w-full">
        <Breadcrumb Link={Link} items={items} />
      </div>
      <form className="flex flex-col gap-6 w-xl max-w-full rounded-md p-6 bg-black/5 dark:bg-white/5">
        <h1 className="text-xl font-bold">Ajouter un jeu de société</h1>
        <div className="flex flex-col gap-6">
          <InputField
            disabled={isSubmitting}
            id="name"
            label="Nom du jeu"
            onChange={setName}
            placeholder="Monopoly mais en mieux"
            required
            value={name}
          />
          <div className="flex flex-col gap-2">
            <Autocomplete
              disabled={isSubmitting}
              filteredOptions={editorsOptions}
              id="editor"
              label="Éditeur"
              onChange={setEditor}
              placeholder="Recherchez un éditeur..."
              setSearch={(search) => {
                setEditorsOptions(undefined);
                onEditorSearchChange(search);
              }}
              value={editor}
            />
            <div className="flex items-center gap-2 pl-2">
              <span className="text-sm">Vous ne trouvez pas l&apos;éditeur du jeu ?</span>
              <button className="text-sm text-purple-500 cursor-pointer" type="button">
                Clique ici pour l&apos;ajouter
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select<number>
              disabled={isSubmitting}
              id="minNumberOfPlayers"
              label="Nombre de joueurs min."
              onChange={(value) => {
                setMinNumberOfPlayers(value);
                if (maxNumberOfPlayers && value > maxNumberOfPlayers) setMaxNumberOfPlayers(value);
              }}
              options={minNumberOfPlayersOptions}
              value={minNumberOfPlayers}
            />
            <Select<TMaxNumberOfPlayers>
              disabled={isSubmitting}
              id="maxNumberOfPlayers"
              label="Nombre de joueurs max."
              onChange={setMaxNumberOfPlayers}
              options={maxNumberOfPlayersOptions}
              value={maxNumberOfPlayers}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ButtonGroup
              label="Durée du jeu"
              onChange={setDurationInMinutes}
              options={durationOptions}
              value={durationInMinutes}
            />
            <Select<number>
              disabled={isSubmitting}
              id="minAge"
              label="Age min."
              onChange={setMinAge}
              options={minAgeOptions}
              value={minAge}
            />
          </div>
          <ButtonGroup
            label="Mécanismes"
            multiple
            onChange={setMechanisms}
            options={mechanismsOptions}
            values={mechanisms}
            wrap
          />
        </div>
        <div className="flex justify-end">
          <Button label="Ajouter" onClick={handleSubmit} size="small" variant="contained" />
        </div>
      </form>
    </div>
  );
}
