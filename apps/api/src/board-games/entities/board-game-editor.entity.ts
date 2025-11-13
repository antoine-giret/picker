import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { BoardGame } from './board-game.entity';

@Table
export class BoardGameEditor extends Model {
  @Column({ type: DataType.STRING, allowNull: false, validate: { len: [1, 50] } })
  declare name: string;

  @HasMany(() => BoardGame, 'editorId')
  declare boardGames: BoardGame[];
}
