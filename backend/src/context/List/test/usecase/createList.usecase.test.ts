import { runSync } from 'effect/Effect';
import { ListRepository } from '../../infra/list.repository';
import { ListModel } from '../../model/list.model';
import { CreateListUsecase } from '../../usecase/createList.usecase';

const coupleId = 'couple-id';
const listName = 'テスト';

const list = ListModel.create({
  id: 'list-id',
  name: listName,
  coupleId,
});
const listRepository: Pick<ListRepository, 'create'> = {
  create: jest.fn(() => list),
};
const createListUsecase = new CreateListUsecase(
  listRepository as ListRepository,
);

describe('CreateListUsecase', () => {
  it('正常系', async () => {
    const result = await createListUsecase.execute(coupleId, listName);
    expect(result).toStrictEqual(runSync(list));
  });
});
