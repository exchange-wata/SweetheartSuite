import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { ListRepository } from '../../infra/list.repository';
import { ListModel } from '../../model/list.model';
import { FindByListIdUsecase } from '../../usecase/findByListId.usecase';

const coupleId = 'couple-id';
const listName = 'テスト';
const listId = 'list-id';

const list = runSync(
  ListModel.create({
    id: listId,
    name: listName,
    coupleId,
  }),
);
const listRepository: Pick<ListRepository, 'findByListId'> = {
  findByListId: jest.fn(() => Effect.succeed(list)),
};
const findByListIdUsecase = new FindByListIdUsecase(
  listRepository as ListRepository,
);

describe('CreateListUsecase', () => {
  it('正常系', async () => {
    const result = await findByListIdUsecase.execute(listId);
    expect(result).toEqual(expect.objectContaining(list));
  });
});
