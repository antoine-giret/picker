import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateBoardGameEditorDto } from './dto/create-board-game-editor.dto';
import { UpdateBoardGameEditorDto } from './dto/update-board-game-editor.dto';
import { BoardGameEditor } from './entities/board-game-editor.entity';

@Injectable()
export class BoardGameEditorsService {
  constructor(
    @InjectModel(BoardGameEditor)
    private boardGameEditorModel: typeof BoardGameEditor,
  ) {}

  async create({
    name,
  }: CreateBoardGameEditorDto): Promise<BoardGameEditor> {
    return this.boardGameEditorModel.create({ name });
  }

  async findAll(): Promise<BoardGameEditor[]> {
    return this.boardGameEditorModel.findAll();
  }

  async findOne(id: number): Promise<BoardGameEditor> {
    const boardGameEditor = await this.boardGameEditorModel.findOne({ where: { id } });
    if (!boardGameEditor) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return boardGameEditor;
  }

  async update(id: number, updateBoardGameDto: UpdateBoardGameEditorDto): Promise<BoardGameEditor> {
    const boardGameEditor = await this.findOne(id);
    return boardGameEditor.update(updateBoardGameDto);
  }

  async remove(id: number): Promise<void> {
    const boardGameEditor = await this.findOne(id);
    await boardGameEditor.destroy();
  }
}
