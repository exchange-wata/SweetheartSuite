import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';

@Injectable()
export class UpdateContentsUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (id: string, content: string) => {
    const self = this;
    return gen(function* () {
      const currentContents = yield* self.contentsRepository.findByIds([id]);
      if (currentContents.length === 1) {
        const updateContentsModel = currentContents[0]?.updateContent(content);
        if (!updateContentsModel)
          throw new Error('invalid update contents model');

        const contents =
          yield* self.contentsRepository.update(updateContentsModel);
        return contents;
      }
    }).pipe(runPromise);
  };
}
