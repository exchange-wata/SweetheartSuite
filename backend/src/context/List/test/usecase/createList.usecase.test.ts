import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { ListModel } from '../../domain/model/list.model';
import { ListRepository } from '../../infra/list.repository';
import { CreateListUsecase } from '../../usecase/createList.usecase';

const coupleId = 'couple-id';
const listName = 'テスト';

const list = runSync(
  ListModel.create({
    id: 'list-id',
    name: listName,
    coupleId,
  }),
);
const listRepository: Pick<ListRepository, 'create'> = {
  create: jest.fn(() => Effect.succeed(list)),
};
const createListUsecase = new CreateListUsecase(
  listRepository as ListRepository,
);

describe('CreateListUsecase', () => {
  it('正常系', async () => {
    const result = await createListUsecase.execute(coupleId, listName);
    expect(result).toEqual(expect.objectContaining(list));
  });
});
