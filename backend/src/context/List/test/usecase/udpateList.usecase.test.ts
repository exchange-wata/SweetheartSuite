import { runSync } from 'effect/Effect';
import { ListRepository } from '../../infra/list.repository';
import { ListModel } from '../../model/list.model';
import { UpdateListUsecase } from '../../usecase/updateList.usecase';

const coupleId = 'couple-id';
const listName = 'テスト';
const listId = 'list-id';

const list = ListModel.create({
  id: listId,
  name: listName,
  coupleId,
});
const listRepository: Pick<ListRepository, 'update'> = {
  update: jest.fn(() => list),
};
const updateListUsecase = new UpdateListUsecase(
  listRepository as ListRepository,
);

describe('CreateListUsecase', () => {
  it('正常系', async () => {
    const result = await updateListUsecase.execute(listId, listName);
    expect(result).toStrictEqual(runSync(list));
  });
});
