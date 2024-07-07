import { Effect } from 'effect';
import { ContentsRepositoryInterface } from '../../domain/interface/contents.repository.interface';
import { ContentsModel } from '../../domain/model/contents.model';
import { GetContentsByListIdUsecase } from '../../usecase/getContentsByListId.usecase';

const contentsRepository: Pick<ContentsRepositoryInterface, 'findByListId'> = {
  findByListId: jest.fn((listId: string) =>
    Effect.succeed(contents.filter((content) => content.listId === listId)),
  ),
};
const getContentsByListIdUsecase = new GetContentsByListIdUsecase(
  contentsRepository as ContentsRepositoryInterface,
);

describe('GetContentsByListIdUsecase', () => {
  it('正常系', async () => {
    const result = await getContentsByListIdUsecase.execute('list-id1');
    expect(result).toEqual(expect.objectContaining([contents[0], contents[1]]));
  });
});

const contents = [
  ContentsModel.create({
    id: 'contents-id1',
    listId: 'list-id1',
    content: 'テスト1',
    isDone: false,
  }),
  ContentsModel.create({
    id: 'contents-id2',
    listId: 'list-id1',
    content: 'テスト2',
    isDone: true,
  }),
  ContentsModel.create({
    id: 'contents-id3',
    listId: 'list-id2',
    content: 'テスト3',
    isDone: false,
  }),
];
