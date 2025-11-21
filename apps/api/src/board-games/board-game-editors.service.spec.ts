import { PreconditionFailedException } from '@nestjs/common';
import { Sequelize, ValidationError } from 'sequelize';

import { createMemDB } from '../utils/testing-helpers/create-mem-db';
import { BoardGameEditorsService } from './board-game-editors.service';
import { BoardGamesService } from './board-games.service';
import { CreateBoardGameEditorDto } from './dto/create-board-game-editor.dto';
import { UpdateBoardGameEditorDto } from './dto/update-board-game-editor.dto';
import { BoardGameEntity } from './entities/board-game.entity';
import { BoardGameEditorEntity } from './entities/board-game-editor.entity';

describe('BoardGameEditorsService', () => {
  let db: Sequelize;
  let service: BoardGameEditorsService;
  let boardGameService: BoardGamesService;

  beforeAll(async () => {
    db = await createMemDB([BoardGameEntity, BoardGameEditorEntity]);
    service = new BoardGameEditorsService(BoardGameEditorEntity);
    boardGameService = new BoardGamesService(BoardGameEntity);
  });

  afterAll(() => db.close());

  beforeEach(async () => {
    await BoardGameEditorEntity.create({ name: 'Editor #1' });
    await BoardGameEditorEntity.create({ name: 'Editor #2' });

    await BoardGameEntity.create({
      name: 'Game #1',
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 6,
      durationInMinutes: 30,
      minAge: 8,
      editorId: 1,
    });
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
    it('should successfully insert a board game editor', async () => {
      const boardGame = await service.create({ name: 'Editor #3' });
      const { id, name } = boardGame.dataValues;

      expect(id).toEqual(3);
      expect(name).toEqual('Editor #3');
    });

    it('should throw an error when trying to insert a board game editor without name', async () => {
      try {
        await service.create({} as CreateBoardGameEditorDto);

        throw new PreconditionFailedException('invalid board game editor inserted');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('notNull Violation: BoardGameEditorEntity.name cannot be null');
      }

      try {
        await service.create({ name: '' });

        throw new PreconditionFailedException('invalid board game editor inserted');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('Validation error: Validation len on name failed');
      }
    });
  });

  describe('findAll()', () => {
    it('should return an array of board game editors', async () => {
      const boardGameEditors = await service.findAll();
      const [boardGameEditor] = boardGameEditors;

      expect(boardGameEditors).toHaveLength(2);
      expect(boardGameEditor?.dataValues).toHaveProperty('id');
      expect(boardGameEditor?.dataValues).toHaveProperty('name');
    });
  });

  describe('findOne()', () => {
    it('should get a single board game editor', async () => {
      const boardGameEditor = await service.findOne(2);
      const { id, name } = boardGameEditor.dataValues;

      expect(id).toEqual(2);
      expect(name).toEqual('Editor #2');
    });
  });

  describe('update()', () => {
    it('should successfully update a board game editor', async () => {
      const boardGame = await service.update(2, { name: 'Editor two' });
      const { name } = boardGame.dataValues;

      expect(name).toEqual('Editor two');
    });

    it('should throw an error when trying to set an empty name to a board game editor', async () => {
      try {
        await service.update(2, { name: null } as unknown as UpdateBoardGameEditorDto);

        throw new PreconditionFailedException('name cannot be null');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('notNull Violation: BoardGameEditorEntity.name cannot be null');
      }

      try {
        await service.update(2, { name: '' });

        throw new PreconditionFailedException('name cannot be empty');
      } catch (err) {
        if (!(err instanceof ValidationError)) throw err;

        expect(err.message).toBe('Validation error: Validation len on name failed');
      }
    });
  });

  describe('remove()', () => {
    it('should remove a board game editor', async () => {
      const retVal = await service.remove(1);
      expect(retVal).toBeUndefined();

      const boardGameEditors = await service.findAll();
      expect(boardGameEditors).toHaveLength(1);
      expect(boardGameEditors.some(({ id }) => id === 1)).toBeFalsy();
    });

    it('should update board game when remove a board game editor', async () => {
      const retVal = await service.remove(1);
      expect(retVal).toBeUndefined();

      const boardGame = await boardGameService.findOne(1);
      const { editorId } = boardGame.dataValues;
      expect(editorId).toBeNull();
    });
  });
});
