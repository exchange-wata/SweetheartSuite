import { Inject, Injectable } from '@nestjs/common';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { runPromise } from 'effect/Effect';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';

@Injectable()
export class GetContentsByListIdUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (listId: string) =>
    this.contentsRepository.findByListId(listId).pipe(runPromise);
}
