import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { BoardGame } from './entities/board-game.entity';
import { Includeable } from 'sequelize';

@Injectable()
export class BoardGamesService {
  constructor(
    @InjectModel(BoardGame)
    private boardGameModel: typeof BoardGame,
  ) {}

  async create({
    name,
    minNumberOfPlayers,
    maxNumberOfPlayers,
    durationInMinutes,
    minAge,
    tags,
    editorId,
  }: CreateBoardGameDto): Promise<BoardGame> {
    return this.boardGameModel.create({
      name,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      durationInMinutes,
      minAge,
      tags,
      editorId,
    });
  }

  async findAll(): Promise<BoardGame[]> {
    return this.boardGameModel.findAll();
  }

  async findOne(id: number, include?: Includeable | Includeable[]): Promise<BoardGame> {
    const boardGame = await this.boardGameModel.findOne({ where: { id }, include });
    if (!boardGame) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return boardGame;
  }

  async update(id: number, updateBoardGameDto: UpdateBoardGameDto): Promise<BoardGame> {
    const boardGame = await this.findOne(id);
    return boardGame.update(updateBoardGameDto);
  }

  async remove(id: number): Promise<void> {
    const boardGame = await this.findOne(id);
    await boardGame.destroy();
  }
}
