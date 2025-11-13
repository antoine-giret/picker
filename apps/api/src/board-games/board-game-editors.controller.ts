import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { BoardGameEditorsService } from './board-game-editors.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { BoardGameEditor } from './entities/board-game-editor.entity';

@Controller('board-game-editors')
export class BoardGameEditorsController {
  constructor(private boardGameEditorsService: BoardGameEditorsService) {}

  @Post()
  async create(@Body() createBoardGameDto: CreateBoardGameDto): Promise<BoardGameEditor> {
    return this.boardGameEditorsService.create(createBoardGameDto);
  }

  @Get()
  async findAll(): Promise<BoardGameEditor[]> {
    return this.boardGameEditorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BoardGameEditor> {
    return this.boardGameEditorsService.findOne(parseInt(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardGameDto: UpdateBoardGameDto): Promise<BoardGameEditor> {
    return this.boardGameEditorsService.update(parseInt(id), updateBoardGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.boardGameEditorsService.remove(parseInt(id));
  }
}
