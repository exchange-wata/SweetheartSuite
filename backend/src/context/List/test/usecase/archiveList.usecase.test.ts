import { Effect } from 'effect';
import { ContentsRepositoryInterface } from '../../domain/interface/contents.repository.interface';
import { ListRepositoryInterface } from '../../domain/interface/list.repository.interface';
import { ContentsModel } from '../../domain/model/contents.model';
import { ListModel } from '../../domain/model/list.model';
import { ArchiveListUsecase } from '../../usecase/archiveList.usecase';

const listId = 'list-id';
const coupleId = 'couple-id'
const contents = [
  ContentsModel.create({ id: 'content1', listId, content: 'Test Content 1', isDone: true }),
  ContentsModel.create({ id: 'content2', listId, content: 'Test Content 2', isDone: true }),
];
const incompleteContents = [
  ContentsModel.create({ id: 'content1', listId, content: 'Test Content 1', isDone: true }),
  ContentsModel.create({ id: 'content2', listId, content: 'Test Content 2', isDone: false }),
];
const currentListModel = ListModel.create({
  id: listId, name: 'Test List', isArchived: false, coupleId
});
const updatedListModel = ListModel.create({
  id: listId, name: 'Test List Updated', isArchived: true, coupleId
});

describe('ArchiveListUsecase', () => {
    it('紐づくコンテンツに一つでも未完了が存在するとき、リストは未完了のままになる', async () => {
    const contentsRepository: Pick<ContentsRepositoryInterface, 'findByListId'> = {
      findByListId: jest.fn(() => Effect.succeed(incompleteContents)),
    };
    const listRepository: Pick<ListRepositoryInterface, 'findByListId' | 'update'> = {
      findByListId: jest.fn(() => Effect.succeed(currentListModel)),
      update: jest.fn(() => Effect.succeed(currentListModel)),
    };
    const usecase = new ArchiveListUsecase(listRepository as ListRepositoryInterface, contentsRepository as ContentsRepositoryInterface);

    const result = await usecase.execute(listId);
    expect(listRepository.update).not.toHaveBeenCalled();
    expect(result.isArchived).toBe(false);
  });

  it('紐づくコンテンツが全て完了している時、リストが完了になる', async () => {
    const contentsRepository: Pick<ContentsRepositoryInterface, 'findByListId'> = {
      findByListId: jest.fn(() => Effect.succeed(contents)),
    };
    const listRepository: Pick<ListRepositoryInterface, 'findByListId' | 'update'> = {
      findByListId: jest.fn(() => Effect.succeed(currentListModel)),
      update: jest.fn(() => Effect.succeed(updatedListModel)),
    };
    const usecase = new ArchiveListUsecase(listRepository as ListRepositoryInterface, contentsRepository as ContentsRepositoryInterface);

    const result = await usecase.execute(listId);
    expect(listRepository.update).toHaveBeenCalledTimes(1);
    expect(result.isArchived).toBe(true);
  });
});
