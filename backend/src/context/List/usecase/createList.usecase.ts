import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { LIST_REPOSITORY } from '../const/list.token';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';
import { ListModel } from '../domain/model/list.model';

@Injectable()
export class CreateListUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
  ) {}

  execute = (coupleId: string, listName: string) => {
    const self = this;
    return gen(function* () {
      const listModel = ListModel.create({ name: listName, coupleId });
      const list = yield* self.listRepository.create(listModel);

      return list;
    }).pipe(runPromise);
  };
}
