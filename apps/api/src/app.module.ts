import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardGame } from './board-games/entities/board-game.entity';
import { BoardGameEditor } from './board-games/entities/board-game-editor.entity';
import { BoardGamesModule } from './board-games/board-games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      synchronize: true, // not for production
      sync: { alter: true }, // not for production
      dialect: 'postgres',
      dialectOptions: {
        ssl: { sslmode: 'require', channel_binding: 'require' },
      },
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'picker',
      models: [BoardGame, BoardGameEditor],
    }),
    BoardGamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
