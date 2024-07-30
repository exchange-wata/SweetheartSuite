import { Effect } from 'effect';
import { ContentsRepositoryInterface } from '../../domain/interface/contents.repository.interface';
import { ContentsRepository } from '../../infra/contents.repository';
import { DeleteContentsUsecase } from '../../usecase/deleteContents.usecase';

const contentsRepository: Pick<ContentsRepositoryInterface, 'deleteMany'> = {
  deleteMany: jest.fn(() =>
    Effect.succeed({
      count: 2,
    }),
  ),
};
const deleteContentsUsecase = new DeleteContentsUsecase(
  contentsRepository as ContentsRepository,
);

describe('DeleteContentsUsecase', () => {
  it('正常系', async () => {
    const result = await deleteContentsUsecase.execute([
      'content-id1',
      'content-id2',
    ]);
    expect(result).toStrictEqual({ count: 2 });
  });
});
