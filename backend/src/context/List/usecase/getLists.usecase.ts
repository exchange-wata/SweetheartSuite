import { Inject, Injectable } from '@nestjs/common';
import { LIST_REPOSITORY } from '../const/list.token';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';
import { runPromise } from 'effect/Effect';

@Injectable()
export class GetListsUsecase {
  constructor(
    @Inject(LIST_REPOSITORY)
    private readonly listRepository: ListRepositoryInterface,
  ) {}

  execute = (coupleId: string) =>
    this.listRepository.findByCoupleId(coupleId).pipe(runPromise);
}
