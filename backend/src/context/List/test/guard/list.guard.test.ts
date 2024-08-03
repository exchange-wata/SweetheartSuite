import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ListModel } from '../../domain/model/list.model';
import { ListAuthGuard } from '../../guard/list.guard';
import { GetListByIdUsecase } from '../../usecase/getListById.usecase';

let guard: ListAuthGuard;
let getListByIdUsecase: GetListByIdUsecase;

const mockExecutionContext: Partial<ExecutionContext> = {
  switchToHttp: jest.fn(),
};

const mocks = (coupleId: string) => {
  const mockGqlExecutionContext = {
    create: jest.fn().mockReturnValue({
      getContext: jest.fn().mockReturnValue({
        req: {
          user: { coupleId },
          body: { variables: { listId: 'list-1' } },
        },
      }),
    }),
  };

  const mockList = ListModel.create({
    id: 'list-1',
    coupleId: '123',
    name: 'list',
  });

  jest.spyOn(getListByIdUsecase, 'execute').mockResolvedValue(mockList);
  jest
    .spyOn(GqlExecutionContext, 'create')
    .mockReturnValue(mockGqlExecutionContext.create());
};

beforeEach(() => {
  getListByIdUsecase = {
    execute: jest.fn(),
  } as any;
  guard = new ListAuthGuard(getListByIdUsecase);
});

describe('ListAuthGuard', () => {
  it('coupleIdと操作対象が適切な時、trueが返る', async () => {
    mocks('123');

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(true);
    expect(getListByIdUsecase.execute).toHaveBeenCalledWith('list-1');
  });

  it('coupleIdと操作対象が不適切な時、falseが返る', async () => {
    mocks('456');

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(result).toBe(false);
    expect(getListByIdUsecase.execute).toHaveBeenCalledWith('list-1');
  });
});
