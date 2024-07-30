import { Inject, Injectable } from '@nestjs/common';
import { runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';

@Injectable()
export class DeleteContentsUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (ids: string[]) =>
    this.contentsRepository.deleteMany(ids).pipe(runPromise);
}
