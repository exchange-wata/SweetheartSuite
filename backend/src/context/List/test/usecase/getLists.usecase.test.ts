import { Effect } from 'effect';
import { ListRepository } from '../../infra/list.repository';
import { GetListsUsecase } from '../../usecase/getLists.usecase';
import { ListModel } from '../../domain/model/list.model';

const listRepository: Pick<ListRepository, 'findByCoupleId'> = {
  findByCoupleId: jest.fn((coupleId: string) =>
    Effect.succeed(lists.filter((list) => list.coupleId === coupleId)),
  ),
};
const getListsUsecase = new GetListsUsecase(listRepository as ListRepository);

describe('GetListsUsecase', () => {
  it('正常系', async () => {
    const result = await getListsUsecase.execute('couple-id1');
    expect(result).toEqual(expect.objectContaining([lists[0], lists[1]]));
  });
});

const lists = [
  ListModel.create({
    id: 'list-id1',
    name: 'テスト1',
    coupleId: 'couple-id1',
  }),
  ListModel.create({
    id: 'list-id2',
    name: 'テスト2',
    coupleId: 'couple-id1',
  }),
  ListModel.create({
    id: 'list-id3',
    name: 'テスト3',
    coupleId: 'couple-id2',
  }),
];
