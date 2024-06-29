import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { ListModel } from '../../domain/model/list.model';
import { ListRepository } from '../../infra/list.repository';
import { UpdateListUsecase } from '../../usecase/updateList.usecase';

const coupleId = 'couple-id';
const listName = 'テスト';
const listId = 'list-id';
const updatedListName = 'テストテスト';

const list = ListModel.create({
  id: listId,
  name: listName,
  coupleId,
});
const updatedList = runSync(
  ListModel.create({
    id: listId,
    name: updatedListName,
    coupleId,
  }),
);

const listRepository: Pick<ListRepository, 'update' | 'findByListId'> = {
  findByListId: jest.fn(() => list),
  update: jest.fn(() => Effect.succeed(updatedList)),
};
const updateListUsecase = new UpdateListUsecase(
  listRepository as ListRepository,
);

describe('CreateListUsecase', () => {
  it('正常系', async () => {
    const result = await updateListUsecase.execute(listId, updatedListName);
    expect(result).toEqual(expect.objectContaining(updatedList));
  });
});
