import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';
import { ContentsModel } from '../domain/model/contents.model';

@Injectable()
export class UpdateContentsUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (id: string, listId: string, content: string) => {
    const self = this;
    return gen(function* () {
      const currentContent = yield* self.contentsRepository.findByIdAndListId(
        id,
        listId,
      );
      const updateContentsModel = ContentsModel.create({
        id,
        listId,
        content,
        isDone: currentContent.isDone,
      });
      const contents =
        yield* self.contentsRepository.update(updateContentsModel);
      return contents;
    }).pipe(runPromise);
  };
}
