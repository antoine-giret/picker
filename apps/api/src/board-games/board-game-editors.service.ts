import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateBoardGameEditorDto } from './dto/create-board-game-editor.dto';
import { UpdateBoardGameEditorDto } from './dto/update-board-game-editor.dto';
import { BoardGameEditorEntity } from './entities/board-game-editor.entity';

@Injectable()
export class BoardGameEditorsService {
  constructor(
    @InjectModel(BoardGameEditorEntity)
    private boardGameEditorModel: typeof BoardGameEditorEntity,
  ) {}

  async create({ name }: CreateBoardGameEditorDto): Promise<BoardGameEditorEntity> {
    return this.boardGameEditorModel.create({ name });
  }

  async findAll(): Promise<BoardGameEditorEntity[]> {
    return this.boardGameEditorModel.findAll();
  }

  async findOne(id: number): Promise<BoardGameEditorEntity> {
    const boardGameEditor = await this.boardGameEditorModel.findOne({ where: { id } });
    if (!boardGameEditor) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return boardGameEditor;
  }

  async update(
    id: number,
    updateBoardGameDto: UpdateBoardGameEditorDto,
  ): Promise<BoardGameEditorEntity> {
    const boardGameEditor = await this.findOne(id);
    return boardGameEditor.update(updateBoardGameDto);
  }

  async remove(id: number): Promise<void> {
    const boardGameEditor = await this.findOne(id);
    await boardGameEditor.destroy();
  }
}
