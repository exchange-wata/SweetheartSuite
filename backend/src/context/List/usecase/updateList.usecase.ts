import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { LIST_REPOSITORY } from '../const/list.token';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';

@Injectable()
export class UpdateListUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
  ) {}

  execute = (listId: string, name: string) => {
    const self = this;
    return gen(function* () {
      const currentListModel = yield* self.listRepository.findByListId(listId);
      const updatedListModel = currentListModel.updateName(name);
      const list = yield* self.listRepository.update(updatedListModel);
      return list;
    }).pipe(runPromise);
  };
}
