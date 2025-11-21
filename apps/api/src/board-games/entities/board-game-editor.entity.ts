import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { BoardGameEntity } from './board-game.entity';

export type TBoardGameEditor = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
};

export type TBoardGameEditorCreation = Partial<{
  name: string;
}>;

@Table({ tableName: 'BoardGameEditors' })
export class BoardGameEditorEntity extends Model<TBoardGameEditor, TBoardGameEditorCreation> {
  @Column({ type: DataType.STRING, allowNull: false, validate: { len: [1, 50] } })
  declare name: string;

  @HasMany(() => BoardGameEntity, 'editorId')
  declare boardGames: BoardGameEntity[];
}
