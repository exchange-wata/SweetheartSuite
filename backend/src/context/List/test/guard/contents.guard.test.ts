import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContentsModel } from '../../domain/model/contents.model';
import { ListModel } from '../../domain/model/list.model';
import { ContentsAuthGuard } from '../../guard/contents.guard';
import { GetContentsByIdsUsecase } from '../../usecase/getContentsByIds.usecase';
import { GetListByIdUsecase } from '../../usecase/getListById.usecase';

let guard: ContentsAuthGuard;
let getContentsByIdsUsecase: GetContentsByIdsUsecase;
let getListByIdUsecase: GetListByIdUsecase;

const mockExecutionContext: Partial<ExecutionContext> = {
  switchToHttp: jest.fn(),
};

const mocks = (coupleId: string, contentId?: string, contentIds?: string[]) => {
  const mockGqlExecutionContext = {
    create: jest.fn().mockReturnValue({
      getContext: jest.fn().mockReturnValue({
        req: {
          user: { coupleId },
          body: { variables: { id: contentId, ids: contentIds } },
        },
      }),
    }),
  };

  const mockContents = [
    { id: 'content-1', listId: 'list-1' },
  ] as ContentsModel[];
  const mockList = { id: 'list-1', coupleId: '123' } as ListModel;

  jest
    .spyOn(getContentsByIdsUsecase, 'execute')
    .mockResolvedValue(mockContents);
  jest.spyOn(getListByIdUsecase, 'execute').mockResolvedValue(mockList);
  jest
    .spyOn(GqlExecutionContext, 'create')
    .mockReturnValue(mockGqlExecutionContext.create());
};

beforeEach(() => {
  getContentsByIdsUsecase = {
    execute: jest.fn(),
  } as any;
  getListByIdUsecase = {
    execute: jest.fn(),
  } as any;
  guard = new ContentsAuthGuard(getContentsByIdsUsecase, getListByIdUsecase);
});

describe('ContentsAuthGuard', () => {
  it('単一のcontentIdが適切な値の時、trueを返す', async () => {
    mocks('123', 'content-1');

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(true);
    expect(getContentsByIdsUsecase.execute).toHaveBeenCalledWith(['content-1']);
    expect(getListByIdUsecase.execute).toHaveBeenCalledWith('list-1');
  });

  it('単一のcontentIdが不適切な値の時、falseを返す', async () => {
    mocks('456', 'content-1');

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(false);
    expect(getContentsByIdsUsecase.execute).toHaveBeenCalledWith(['content-1']);
    expect(getListByIdUsecase.execute).toHaveBeenCalledWith('list-1');
  });

  it('複数のcontentIdが適切な値の時、trueを返す', async () => {
    mocks('123', undefined, ['content-1', 'content-2']);

    jest.spyOn(getContentsByIdsUsecase, 'execute').mockResolvedValue([
      { id: 'content-1', listId: 'list-1' },
      { id: 'content-2', listId: 'list-1' },
    ] as ContentsModel[]);

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(true);
    expect(getContentsByIdsUsecase.execute).toHaveBeenCalledWith([
      'content-1',
      'content-2',
    ]);
    expect(getListByIdUsecase.execute).toHaveBeenCalledWith('list-1');
  });

  it('複数のcontentIdが不適切な値の時、falseを返す', async () => {
    mocks('456', undefined, ['content-1', 'content-2']);

    jest.spyOn(getContentsByIdsUsecase, 'execute').mockResolvedValue([
      { id: 'content-1', listId: 'list-1' },
      { id: 'content-2', listId: 'list-1' },
    ] as ContentsModel[]);

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(false);
    expect(getContentsByIdsUsecase.execute).toHaveBeenCalledWith([
      'content-1',
      'content-2',
    ]);
    expect(getListByIdUsecase.execute).toHaveBeenCalledWith('list-1');
  });

  it('単一のcontentIdが存在しない時、falseを返す', async () => {
    mocks('', undefined);

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(false);
  });
});
