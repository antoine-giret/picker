import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BoardGamesController } from './board-games.controller';
import { BoardGamesService } from './board-games.service';
import { BoardGameEditorsController } from './board-game-editors.controller';
import { BoardGameEditorsService } from './board-game-editors.service';
import { BoardGameEntity } from './entities/board-game.entity';
import { BoardGameEditorEntity } from './entities/board-game-editor.entity';

@Module({
  imports: [SequelizeModule.forFeature([BoardGameEntity, BoardGameEditorEntity])],
  controllers: [BoardGamesController, BoardGameEditorsController],
  providers: [BoardGamesService, BoardGameEditorsService],
})
export class BoardGamesModule {}
