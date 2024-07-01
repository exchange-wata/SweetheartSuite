import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';
import { ContentsModel } from '../domain/model/contents.model';

@Injectable()
export class CreateContentsUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (listId: string, content: string) => {
    const self = this;
    return gen(function* () {
      const contentsModel = ContentsModel.create({
        listId,
        content,
        isDone: false,
      });
      const contents = yield* self.contentsRepository.create(contentsModel);
      return contents;
    }).pipe(runPromise);
  };
}
