import { PreconditionFailedException } from '@nestjs/common';
import { Sequelize, ValidationError } from 'sequelize';

import { createMemDB } from '../utils/testing-helpers/create-mem-db';
import { BoardGamesService } from './board-games.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { BoardGameEntity, TBoardGameTags } from './entities/board-game.entity';
import { BoardGameEditorEntity } from './entities/board-game-editor.entity';

describe('BoardGamesService', () => {
  let db: Sequelize;
  let service: BoardGamesService;

  beforeAll(async () => {
    db = await createMemDB([BoardGameEntity, BoardGameEditorEntity]);
    service = new BoardGamesService(BoardGameEntity);
  });

  afterAll(() => db.close());

  beforeEach(async () => {
    await BoardGameEditorEntity.create({ name: 'Editor #1' });
    await BoardGameEditorEntity.create({ name: 'Editor #2' });

    await BoardGameEntity.create(
      {
        name: 'Game #1',
        minNumberOfPlayers: 2,
        maxNumberOfPlayers: 6,
        durationInMinutes: 30,
        minAge: 8,
        tags: { mechanisms: ['CARDS', 'RESOURCE_MANAGEMENT'] },
        editorId: 1,
      },
      { include: [BoardGameEditorEntity] },
    );

    await BoardGameEntity.create(
      {
        name: 'Game #2',
        minNumberOfPlayers: 2,
        maxNumberOfPlayers: 4,
        durationInMinutes: 15,
        minAge: 3,
        tags: { mechanisms: ['DICES'] },
        editorId: 2,
      },
      { include: [BoardGameEditorEntity] },
    );
  });

  afterEach(async () => {
    await db.truncate({ restartIdentity: true });
    await db.query(`DELETE FROM "sqlite_sequence" WHERE "name" = 'BoardGames'`);
    await db.query(`DELETE FROM "sqlite_sequence" WHERE "name" = 'BoardGameEditors'`);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a board game with default values', async () => {
      const boardGame = await service.create({ name: 'Game #3' });
      const {
        id,
        createdAt,
        updatedAt,
        name,
        minNumberOfPlayers,
        maxNumberOfPlayers,
        durationInMinutes,
        minAge,
        tags,
        editorId,
      } = boardGame.dataValues;

      expect(Object.keys(boardGame.dataValues)).toHaveLength(10);
      expect(id).toEqual(3);
      expect(createdAt).toBeInstanceOf(Date);
      expect(updatedAt).toBeInstanceOf(Date);
      expect(name).toEqual('Game #3');
      expect(minNumberOfPlayers).toEqual(1);
      expect(maxNumberOfPlayers).toBeNull();
      expect(durationInMinutes).toBeNull();
      expect(minAge).toBeNull();
      expect(tags).toEqual({ mechanisms: [] });
      expect(editorId).toBeNull();
    });

    it('should successfully insert a board game', async () => {
      const boardGame = await service.create({
        name: 'Game #3',
        minNumberOfPlayers: 2,
        maxNumberOfPlayers: 4,
        durationInMinutes: 15,
        minAge: 3,
        tags: { mechanisms: ['DRAFT', 'DICES'] },
        editorId: 1,
      });
      const {
        id,
        createdAt,
        updatedAt,
        name,
        minNumberOfPlayers,
        maxNumberOfPlayers,
        durationInMinutes,
        minAge,
        tags,
        editorId,
      } = boardGame.dataValues;

      expect(Object.keys(boardGame.dataValues)).toHaveLength(10);
      expect(id).toEqual(3);
      expect(createdAt).toBeInstanceOf(Date);
      expect(updatedAt).toBeInstanceOf(Date);
      expect(name).toEqual('Game #3');
      expect(minNumberOfPlayers).toEqual(2);
      expect(maxNumberOfPlayers).toEqual(4);
      expect(durationInMinutes).toEqual(15);
      expect(minAge).toEqual(3);
      expect(tags).toEqual({ mechanisms: ['DRAFT', 'DICES'] });
      expect(editorId).toEqual(1);
    });

    it('should throw an error when trying to insert a board game without name', async () => {
      try {
        await service.create({} as CreateBoardGameDto);

        throw new PreconditionFailedException('name cannot be null');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('notNull Violation: BoardGameEntity.name cannot be null');
      }

      try {
        await service.create({ name: '' });

        throw new PreconditionFailedException('name cannot be empty');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('Validation error: Validation len on name failed');
      }
    });

    it('should throw an error when trying to insert a board game with invalid tags', async () => {
      try {
        await service.create({ name: 'Game #3', tags: {} as TBoardGameTags });

        throw new PreconditionFailedException('invalid tags');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('Validation error: Tags must contain valid mechanisms');
      }
    });
  });

  describe('findAll()', () => {
    it('should return an array of board games', async () => {
      const boardGames = await service.findAll();
      const [boardGame] = boardGames;

      expect(boardGames).toHaveLength(2);
      expect(boardGame).toBeDefined();

      if (boardGame) {
        expect(Object.keys(boardGame.dataValues)).toHaveLength(10);
        expect(boardGame.dataValues).toHaveProperty('id');
        expect(boardGame.dataValues).toHaveProperty('createdAt');
        expect(boardGame.dataValues).toHaveProperty('updatedAt');
        expect(boardGame.dataValues).toHaveProperty('name');
        expect(boardGame.dataValues).toHaveProperty('minNumberOfPlayers');
        expect(boardGame.dataValues).toHaveProperty('maxNumberOfPlayers');
        expect(boardGame.dataValues).toHaveProperty('durationInMinutes');
        expect(boardGame.dataValues).toHaveProperty('minAge');
        expect(boardGame.dataValues).toHaveProperty('tags');
        expect(boardGame.dataValues).toHaveProperty('editorId');
      }
    });
  });

  describe('findOne()', () => {
    it('should get a single board game', async () => {
      const boardGame = await service.findOne(2, [BoardGameEditorEntity]);
      const {
        id,
        createdAt,
        updatedAt,
        name,
        minNumberOfPlayers,
        maxNumberOfPlayers,
        durationInMinutes,
        minAge,
        tags,
        editorId,
        editor,
      } = boardGame.dataValues;

      expect(Object.keys(boardGame.dataValues)).toHaveLength(11);
      expect(id).toEqual(2);
      expect(createdAt).toBeInstanceOf(Date);
      expect(updatedAt).toBeInstanceOf(Date);
      expect(name).toEqual('Game #2');
      expect(minNumberOfPlayers).toEqual(2);
      expect(maxNumberOfPlayers).toEqual(4);
      expect(durationInMinutes).toEqual(15);
      expect(minAge).toEqual(3);
      expect(tags).toEqual({ mechanisms: ['DICES'] });
      expect(editorId).toEqual(2);
      expect(editor).toBeInstanceOf(BoardGameEditorEntity);
    });
  });

  describe('update()', () => {
    it('should successfully update a board game', async () => {
      const boardGame = await service.update(2, {
        minNumberOfPlayers: 4,
        maxNumberOfPlayers: 8,
        tags: { mechanisms: ['DICES', 'FIGHT'] },
        editorId: 1,
      });
      const {
        id,
        createdAt,
        updatedAt,
        name,
        minNumberOfPlayers,
        maxNumberOfPlayers,
        durationInMinutes,
        minAge,
        tags,
        editorId,
      } = boardGame.dataValues;

      expect(Object.keys(boardGame.dataValues)).toHaveLength(10);
      expect(id).toEqual(2);
      expect(createdAt).toBeInstanceOf(Date);
      expect(updatedAt).toBeInstanceOf(Date);
      expect(name).toEqual('Game #2');
      expect(minNumberOfPlayers).toEqual(4);
      expect(maxNumberOfPlayers).toEqual(8);
      expect(durationInMinutes).toEqual(15);
      expect(minAge).toEqual(3);
      expect(tags).toEqual({ mechanisms: ['DICES', 'FIGHT'] });
      expect(editorId).toEqual(1);
    });

    it('should throw an error when trying to set an empty name to a board game', async () => {
      try {
        await service.update(2, { name: null } as unknown as UpdateBoardGameDto);

        throw new PreconditionFailedException('name cannot be null');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('notNull Violation: BoardGameEntity.name cannot be null');
      }

      try {
        await service.update(2, { name: '' });

        throw new PreconditionFailedException('name cannot be empty');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('Validation error: Validation len on name failed');
      }
    });

    it('should throw an error when trying to set invalid tags to a board game', async () => {
      try {
        await service.update(2, { tags: {} as TBoardGameTags });

        throw new PreconditionFailedException('invalid tags');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('Validation error: Tags must contain valid mechanisms');
      }
    });
  });

  describe('remove()', () => {
    it('should remove a board game', async () => {
      const retVal = await service.remove(1);
      expect(retVal).toBeUndefined();

      const boardGames = await service.findAll();
      expect(boardGames).toHaveLength(1);
      expect(boardGames.some(({ id }) => id === 1)).toBeFalsy();
    });
  });
});
