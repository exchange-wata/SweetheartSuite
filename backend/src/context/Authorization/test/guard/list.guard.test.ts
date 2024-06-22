import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { ListRepository } from 'src/context/List/infra/list.repository';
import { ListModel } from 'src/context/List/model/list.model';
import { FindByListIdUsecase } from 'src/context/List/usecase/findByListId.usecase';
import { ListGuard } from '../../guard/list.guard';

const mockExecutionContext: Partial<ExecutionContext> = {
  switchToHttp: jest.fn(),
};
const listModel = runSync(
  ListModel.create({
    id: 'test-id',
    name: 'test-name',
    coupleId: 'test-couple',
  }),
);

const getListGuardMock = (listId: string | null, isList: boolean) => {
  const mockGqlExecutionContext = {
    create: jest.fn().mockReturnValue({
      getContext: jest.fn().mockReturnValue({
        req: {
          headers: {
            authorization: 'Bearer valid-token',
          },
          body: {
            variables: {
              listId: listId ?? '',
            },
          },
        },
      }),
    }),
  };
  jest
    .spyOn(GqlExecutionContext, 'create')
    .mockReturnValue(mockGqlExecutionContext.create());

  const listRepository: Pick<ListRepository, 'findByListId'> = {
    findByListId: jest.fn(() =>
      isList
        ? Effect.succeed(listModel)
        : Effect.fail({ _tag: 'can not find list' }),
    ),
  };
  const findByListIdUsecase = new FindByListIdUsecase(
    listRepository as ListRepository,
  );
  const guard = new ListGuard(findByListIdUsecase as FindByListIdUsecase);

  return guard.canActivate(mockExecutionContext as ExecutionContext);
};

describe('ListGuard', () => {
  it.each([
    ['listIdが正しいとき、trueが返る', 'test-id', true, true],
    ['listIdが存在しない時、falseが返る', null, true, false],
    ['listが存在しない時、falseが返る', 'test-id', false, false],
  ])('%s', async (_, listId, isList, resultValue) => {
    const result = await getListGuardMock(listId, isList);
    expect(result).toBe(resultValue);
  });
});
