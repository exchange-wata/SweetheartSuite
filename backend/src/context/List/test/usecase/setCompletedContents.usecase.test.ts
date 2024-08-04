import { Effect } from 'effect';
import { ContentsModel } from '../../domain/model/contents.model';
import { ContentsRepository } from '../../infra/contents.repository';
import { SetCompletedContentsUsecase } from '../../usecase/setCompletedContents.usecase';

const id = 'id';
const content = 'テスト';
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
  content,
  isDone: true,
});

const contentsRepository: Pick<ContentsRepository, 'findByIds' | 'update'> = {
  findByIds: jest.fn(() => Effect.succeed([currentContents])),
  update: jest.fn(() => Effect.succeed(updateContents)),
};
const setCompletedContentsUsecase = new SetCompletedContentsUsecase(
  contentsRepository as ContentsRepository,
);

describe('SetCompletedContentsUsecase', () => {
  it('正常系', async () => {
    const result = await setCompletedContentsUsecase.execute(id);
    expect(result?.isDone).toBe(true);
  });
});
