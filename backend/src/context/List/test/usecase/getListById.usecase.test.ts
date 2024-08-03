import { Effect } from 'effect';
import { ListModel } from '../../domain/model/list.model';
import { ListRepository } from '../../infra/list.repository';
import { GetListByIdUsecase } from '../../usecase/getListById.usecase';

const list = ListModel.create({
  id: 'list-id1',
  name: 'テスト1',
  coupleId: 'couple-id1',
});

const listRepository: Pick<ListRepository, 'findByListId'> = {
  findByListId: jest.fn(() => Effect.succeed(list)),
};
const getListByIdUsecase = new GetListByIdUsecase(
  listRepository as ListRepository,
);

describe('GetListByIdUsecase', () => {
  it('正常系', async () => {
    const result = await getListByIdUsecase.execute('list-id1');
    expect(result).toEqual(list);
  });
});
