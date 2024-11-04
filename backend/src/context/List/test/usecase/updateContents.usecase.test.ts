import { Effect } from 'effect';
import { ContentsModel } from '../../domain/model/contents.model';
import { ContentsRepository } from '../../infra/contents.repository';
import { UpdateContentsUsecase } from '../../usecase/updateContents.usecase';

const id = 'id';
const content = 'テスト';
const updateContent = 'アップデートテスト';
const listId = 'list-id';

const currentContents = ContentsModel.create({
  id,
  listId,
  content,
  isDone: false,
});

const updateContents = ContentsModel.create({
  id,
  listId,
  content: updateContent,
  isDone: false,
});

const contentsRepository: Pick<ContentsRepository, 'findByIds' | 'update'> = {
  findByIds: jest.fn(() => Effect.succeed([currentContents])),
  update: jest.fn(() => Effect.succeed(updateContents)),
};
const updateContentsUsecase = new UpdateContentsUsecase(
  contentsRepository as ContentsRepository,
);

describe('UpdateContentsUsecase', () => {
  it('正常系', async () => {
    const result = await updateContentsUsecase.execute(id, content);
    expect(result).toEqual(expect.objectContaining(updateContents));
  });
});
