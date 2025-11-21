import { Test, TestingModule } from '@nestjs/testing';

import { BoardGamesController } from './board-games.controller';
import { BoardGamesService } from './board-games.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { BoardGameEditorEntity } from './entities/board-game-editor.entity';

export type TBoardGameMock = { id: number; name: string };

export const mockedBoardGames: TBoardGameMock[] = [
  { id: 1, name: 'Game #1' },
  { id: 2, name: 'Game #2' },
];

describe('BoardGamesController', () => {
  let controller: BoardGamesController;
  let service: BoardGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardGamesController],
      providers: [
        {
          provide: BoardGamesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((boardGame: CreateBoardGameDto) =>
                Promise.resolve({ id: 1, ...boardGame }),
              ),
            findAll: jest.fn().mockResolvedValue(mockedBoardGames),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve(mockedBoardGames.find((mock) => mock.id === id)),
              ),
            update: jest
              .fn()
              .mockImplementation((id: number, boardGame: UpdateBoardGameDto) =>
                Promise.resolve({ id, ...boardGame }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BoardGamesController>(BoardGamesController);
    service = module.get<BoardGamesService>(BoardGamesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a board game', () => {
      const createBoardGameDto: CreateBoardGameDto = {
        name: 'Game #1',
      };

      expect(controller.create(createBoardGameDto)).resolves.toEqual({
        id: 1,
        ...createBoardGameDto,
      });
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createBoardGameDto);
    });
  });

  describe('findAll()', () => {
    it('should find all board games', () => {
      const promise = controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(promise).resolves.toHaveLength(2);
    });
  });

  describe('findOne()', () => {
    it('should find a board game', () => {
      const promise = controller.findOne('1');
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(1, [BoardGameEditorEntity]);
      expect(promise).resolves.toEqual({
        id: 1,
        name: 'Game #1',
      });
    });
  });

  describe('update()', () => {
    it('should update a board game', () => {
      const updateBoardGameDto: UpdateBoardGameDto = {
        minNumberOfPlayers: 2,
      };

      expect(controller.update('1', updateBoardGameDto)).resolves.toEqual({
        id: 1,
        ...updateBoardGameDto,
      });
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(1, updateBoardGameDto);
    });
  });

  describe('remove()', () => {
    it('should remove the board game', () => {
      controller.remove('2');
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
