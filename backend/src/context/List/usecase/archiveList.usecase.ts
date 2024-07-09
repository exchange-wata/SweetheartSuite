import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY, LIST_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';
import { ContentsModel } from '../domain/model/contents.model';

@Injectable()
export class ArchiveListUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (listId: string) => {
    const self = this;
    return gen(function* () {
      const contents = yield* self.contentsRepository.findByListId(listId)
      const currentListModel = yield* self.listRepository.findByListId(listId)

      if (self.areAllContentsDone(contents)) {
        const updatedListModel = currentListModel.setCompleted()
        const list = yield* self.listRepository.update(updatedListModel)
        return list
      } else {
        return currentListModel
      }
    }).pipe(runPromise);
  };

  private areAllContentsDone = (contents: ContentsModel[]): boolean => 
    contents.every(content => content.isDone)
}
