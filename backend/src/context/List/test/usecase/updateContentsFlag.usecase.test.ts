import { Effect } from 'effect';
import { ContentsModel } from '../../domain/model/contents.model';
import { ContentsRepository } from '../../infra/contents.repository';
import { UpdateContentsUsecase } from '../../usecase/updateContents.usecase';

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

const contentsRepository: Pick<ContentsRepository, 'findById' | 'update'> = {
  findById: jest.fn(() => Effect.succeed(currentContents)),
  update: jest.fn(() => Effect.succeed(updateContents)),
};
const updateContentsFlagUsecase = new UpdateContentsUsecase(
  contentsRepository as ContentsRepository,
);

describe('UpdateContentsUsecase', () => {
  it('正常系', async () => {
    const result = await updateContentsFlagUsecase.execute(id, content);
    expect(result.isDone).toBe(true);
  });
});
