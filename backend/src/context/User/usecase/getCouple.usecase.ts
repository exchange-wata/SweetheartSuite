import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { COUPLE_REPOSITORY } from '../const/user.token';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';

@Injectable()
export class GetCoupleUsecase {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepositoryInterface,
  ) {}

  execute = (userId: string) => {
    const self = this;
    return gen(function* () {
      const couples = yield* self.coupleRepository.findByUserId(userId);
      if (couples.length === 1) return couples;

      return false;
    }).pipe(runPromise);
  };
}
