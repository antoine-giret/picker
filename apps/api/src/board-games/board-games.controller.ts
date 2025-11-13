import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { BoardGamesService } from './board-games.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { BoardGame } from './entities/board-game.entity';
import { BoardGameEditor } from './entities/board-game-editor.entity';

@Controller('board-games')
export class BoardGamesController {
  constructor(private boardGamesService: BoardGamesService) {}

  @Post()
  async create(@Body() createBoardGameDto: CreateBoardGameDto): Promise<BoardGame> {
    return this.boardGamesService.create(createBoardGameDto);
  }

  @Get()
  async findAll(): Promise<BoardGame[]> {
    return this.boardGamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BoardGame> {
    return this.boardGamesService.findOne(parseInt(id), [BoardGameEditor]);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardGameDto: UpdateBoardGameDto): Promise<BoardGame> {
    return this.boardGamesService.update(parseInt(id), updateBoardGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.boardGamesService.remove(parseInt(id));
  }
}
