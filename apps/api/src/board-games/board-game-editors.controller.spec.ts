import { Test, TestingModule } from '@nestjs/testing';

import { BoardGameEditorsController } from './board-game-editors.controller';
import { BoardGameEditorsService } from './board-game-editors.service';
import { CreateBoardGameEditorDto } from './dto/create-board-game-editor.dto';
import { UpdateBoardGameEditorDto } from './dto/update-board-game-editor.dto';

export type TBoardGameEditorMock = { id: number; name: string };

export const mockedBoardGameEditors: TBoardGameEditorMock[] = [
  { id: 1, name: 'Editor #1' },
  { id: 2, name: 'Editor #2' },
];

describe('BoardGameEditorsController', () => {
  let controller: BoardGameEditorsController;
  let service: BoardGameEditorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardGameEditorsController],
      providers: [
        {
          provide: BoardGameEditorsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((boardGameEditor: CreateBoardGameEditorDto) =>
                Promise.resolve({ id: 1, ...boardGameEditor }),
              ),
            findAll: jest.fn().mockResolvedValue(mockedBoardGameEditors),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve(mockedBoardGameEditors.find((mock) => mock.id === id)),
            ),
            update: jest
              .fn()
              .mockImplementation((id: number, boardGame: UpdateBoardGameEditorDto) =>
                Promise.resolve({ id, ...boardGame }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BoardGameEditorsController>(BoardGameEditorsController);
    service = module.get<BoardGameEditorsService>(BoardGameEditorsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a board game editor', () => {
      const createBoardGameEditorDto: CreateBoardGameEditorDto = {
        name: 'Editor #1',
      };

      expect(controller.create(createBoardGameEditorDto)).resolves.toEqual({
        id: 1,
        ...createBoardGameEditorDto,
      });
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createBoardGameEditorDto);
    });
  });

  describe('findAll()', () => {
    it('should find all board game editors', () => {
      const promise = controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(promise).resolves.toHaveLength(2);
    });
  });

  describe('findOne()', () => {
    it('should find a board game editor', () => {
      const promise = controller.findOne('1');
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(promise).resolves.toEqual({
        id: 1,
        name: 'Editor #1',
      });
    });
  });

  describe('update()', () => {
    it('should update a board game editor', () => {
      const updateBoardGameDto: UpdateBoardGameEditorDto = {
        name: 'Editor one',
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
    it('should remove the board game editor', () => {
      controller.remove('2');
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
