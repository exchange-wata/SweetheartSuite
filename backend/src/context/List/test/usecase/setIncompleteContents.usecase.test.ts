import { Effect } from 'effect';
import { ContentsModel } from '../../domain/model/contents.model';
import { ContentsRepository } from '../../infra/contents.repository';
import { SetIncompleteContentsUsecase } from '../../usecase/setIncompleteContents.usecase';

const id = 'id';
const content = 'テスト';
const listId = 'list-id';

const currentContents = ContentsModel.create({
  id,
  listId,
  content,
  isDone: true,
});

const updateContents = ContentsModel.create({
  id,
  listId,
  content,
  isDone: false,
});

const contentsRepository: Pick<ContentsRepository, 'findById' | 'update'> = {
  findById: jest.fn(() => Effect.succeed([currentContents])),
  update: jest.fn(() => Effect.succeed(updateContents)),
};
const setCompletedContentsUsecase = new SetIncompleteContentsUsecase(
  contentsRepository as ContentsRepository,
);

describe('SetIncompleteContentsUsecase', () => {
  it('正常系', async () => {
    const result = await setCompletedContentsUsecase.execute(id);
    expect(result?.isDone).toBe(false);
  });
});
