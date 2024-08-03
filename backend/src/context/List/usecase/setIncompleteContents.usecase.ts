import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { CONTENTS_REPOSITORY } from '../const/list.token';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';

@Injectable()
export class SetIncompleteContentsUsecase {
  constructor(
    @Inject(CONTENTS_REPOSITORY)
    private readonly contentsRepository: ContentsRepositoryInterface,
  ) {}

  execute = (id: string) => {
    const self = this;
    return gen(function* () {
      const currentContents = yield* self.contentsRepository.findById(id);
      if (currentContents.length === 1) {
        const updateContentsModel = currentContents[0]?.setIncomplete();
        if (!updateContentsModel)
          throw new Error('invalid update contents model');

        const contents =
          yield* self.contentsRepository.update(updateContentsModel);
        return contents;
      }
    }).pipe(runPromise);
  };
}
