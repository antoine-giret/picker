import { TBoardGameMechanism } from 'api/board-games/entities/board-game.entity.js';

export const durations = ['15Min', '30Min', '45Min', '1Hour'] as const;

export type TDuration = (typeof durations)[number];

export const durationsMap: { [key in TDuration]: { label: React.ReactNode } } = {
  '15Min': { label: '15min' },
  '30Min': { label: '30min' },
  '45Min': { label: '45min' },
  '1Hour': { label: '1h et +' },
};

export const mechanismsMap: { [key in TBoardGameMechanism]: { label: React.ReactNode } } = {
  AUCTION: { label: 'Enchères' },
  CARDS: { label: 'Cartes' },
  COLLECTION: { label: 'Collection' },
  CONFRONTATION: { label: 'Affrontement' },
  COOPERATION: { label: 'Coopération' },
  DECK_BUILDING: { label: 'Deck building' },
  DEDUCTION: { label: 'Déduction' },
  DEVELOPMENT: { label: 'Développement' },
  DEXTERITY: { label: 'Dextérité' },
  DICES: { label: 'Dés' },
  DRAFT: { label: 'Draft' },
  DRAWING: { label: 'Dessin' },
  DUEL: { label: 'Duel' },
  ESCAPE_GAME: { label: 'Escape Game' },
  EXPLORATION: { label: 'Exploration' },
  FIGHT: { label: 'Combat' },
  HIDDEN_ROLES: { label: 'Rôles cachés' },
  INVESTIGATION: { label: 'Investigation' },
  NARRATIVE: { label: 'Narratif' },
  PARTY_GAME: { label: 'Jeu de soirées' },
  PROGRAMMING_GAME: { label: 'Programmation' },
  PUZZLE: { label: 'Puzzle' },
  RACE: { label: 'Course' },
  RESOURCE_MANAGEMENT: { label: 'Management de ressources' },
  STRATEGY: { label: 'Stratégie' },
  THING_AND_WRITE: { label: 'Thing and write' },
  TILES_GAME: { label: 'Jeu de tuiles' },
};
