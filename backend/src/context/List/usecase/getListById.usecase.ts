import { Inject, Injectable } from '@nestjs/common';
import { runPromise } from 'effect/Effect';
import { LIST_REPOSITORY } from '../const/list.token';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';

@Injectable()
export class GetListByIdUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
  ) {}

  execute = (id: string) =>
    this.listRepository.findByListId(id).pipe(runPromise);
}
