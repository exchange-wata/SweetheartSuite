import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { ContentsModel } from '../../domain/model/contents.model';
import { ContentsRepository } from '../../infra/contents.repository';
import { CreateContentsUsecase } from '../../usecase/createContents.usecase';

const content = 'テスト';
const listId = 'list-id';
const isDone = false;

const contents = runSync(
  ContentsModel.create({
    listId,
    content,
    isDone,
  }),
);
const contentsRepository: Pick<ContentsRepository, 'create'> = {
  create: jest.fn(() => Effect.succeed(contents)),
};
const createContentsUsecase = new CreateContentsUsecase(
  contentsRepository as ContentsRepository,
);

describe('CreateContentsUsecase', () => {
  it('正常系', async () => {
    const result = await createContentsUsecase.execute(listId, content, isDone);
    expect(result).toEqual(expect.objectContaining(contents));
  });
});
