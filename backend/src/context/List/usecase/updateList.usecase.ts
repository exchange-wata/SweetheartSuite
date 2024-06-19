import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { LIST_REPOSITORY } from '../const/list.token';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';
import { ListModel } from '../model/list.model';

@Injectable()
export class UpdateListUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
  ) {}

  execute = (coupleId: string, listId: string, name: string) => {
    const self = this;
    return gen(function* () {
      const listModel = yield* ListModel.create({
        id: listId,
        name,
        coupleId,
      });
      const list = yield* self.listRepository.update(listModel);
      return list;
    }).pipe(runPromise);
  };
}
