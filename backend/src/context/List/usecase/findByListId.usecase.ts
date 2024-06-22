import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { LIST_REPOSITORY } from '../const/list.token';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';

@Injectable()
export class FindByListIdUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
  ) {}

  execute = (listId: string) => {
    const self = this;
    return gen(function* () {
      const list = yield* self.listRepository.findByListId(listId);
      return list;
    }).pipe(runPromise);
  };
}
