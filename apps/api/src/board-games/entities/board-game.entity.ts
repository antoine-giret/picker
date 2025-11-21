import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { BoardGameEditorEntity, TBoardGameEditor } from './board-game-editor.entity';

export const boardGameMechanisms = [
  'AUCTION',
  'FIGHT',
  'CARDS',
  'COLLECTION',
  'COOPERATION',
  'CONFRONTATION',
  'DEDUCTION',
  'DECK_BUILDING',
  'DEVELOPMENT',
  'DEXTERITY',
  'DICES',
  'DRAFT',
  'DRAWING',
  'DUEL',
  'ESCAPE_GAME',
  'EXPLORATION',
  'HIDDEN_ROLES',
  'INVESTIGATION',
  'NARRATIVE',
  'PARTY_GAME',
  'PROGRAMMING_GAME',
  'PUZZLE',
  'RACE',
  'RESOURCE_MANAGEMENT',
  'STRATEGY',
  'THING_AND_WRITE',
  'TILES_GAME',
] as const;

export type TBoardGameMechanism = (typeof boardGameMechanisms)[number];

export type TBoardGameTags = { mechanisms: TBoardGameMechanism[] };

export type TBoardGame = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  durationInMinutes: number | null;
  editor: TBoardGameEditor | null;
  editorId: number | null;
  name: string;
  minAge: number | null;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number | null;
  tags: TBoardGameTags;
};

export type TBoardGameCreation = Partial<{
  durationInMinutes: number | null;
  editorId: number | null;
  name: string;
  minAge: number | null;
  minNumberOfPlayers: number | null;
  maxNumberOfPlayers: number | null;
  tags: TBoardGameTags | null;
}>;

@Table({ tableName: 'BoardGames' })
export class BoardGameEntity extends Model<TBoardGame, TBoardGameCreation> {
  @Column({ type: DataType.STRING, allowNull: false, validate: { len: [1, 50] } })
  declare name: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1, validate: { min: 1 } })
  declare minNumberOfPlayers: number;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null, validate: { min: 1 } })
  declare maxNumberOfPlayers: number;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null, validate: { min: 1 } })
  declare durationInMinutes: number;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null, validate: { min: 1 } })
  declare minAge: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: { mechanisms: [] },
    validate: {
      customValidator(value: object) {
        if (!('mechanisms' in value) || !value.mechanisms || !Array.isArray(value.mechanisms))
          throw new Error('Tags must contain valid mechanisms');
      },
    },
  })
  declare tags: { mechanisms: TBoardGameMechanism[] };

  @ForeignKey(() => BoardGameEditorEntity)
  @Column({ allowNull: true, defaultValue: null })
  declare editorId: number;

  @BelongsTo(() => BoardGameEditorEntity, { foreignKey: 'editorId', onDelete: 'SET NULL' })
  declare editor: BoardGameEditorEntity;
}
