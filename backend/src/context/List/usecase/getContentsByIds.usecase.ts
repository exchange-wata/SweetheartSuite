import { Inject, Injectable } from '@nestjs/common';
import { runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';

@Injectable()
export class GetContentsByIdsUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (ids: string[]) =>
    this.contentsRepository.findByIds(ids).pipe(runPromise);
}
