import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BoardGamesController } from './board-games.controller';
import { BoardGamesService } from './board-games.service';
import { BoardGameEditorsController } from './board-game-editors.controller';
import { BoardGameEditorsService } from './board-game-editors.service';
import { BoardGame } from './entities/board-game.entity';
import { BoardGameEditor } from './entities/board-game-editor.entity';

@Module({
  imports: [SequelizeModule.forFeature([BoardGame, BoardGameEditor])],
  controllers: [BoardGamesController, BoardGameEditorsController],
  providers: [BoardGamesService, BoardGameEditorsService],
})
export class BoardGamesModule {}
