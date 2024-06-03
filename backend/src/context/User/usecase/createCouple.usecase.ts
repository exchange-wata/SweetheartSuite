import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { COUPLE_REPOSITORY, REQUEST_REPOSITORY } from '../const/user.token';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { CoupleModel } from '../domain/model/couple.model';
import { RequestTypes } from '../domain/model/valueObject/requestTypeId.value';

@Injectable()
export class CreateCoupleUsecase {
  constructor(
    @Inject(REQUEST_REPOSITORY)
    private readonly requestRepository: RequestRepositoryInterface,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepositoryInterface,
  ) {}

  execute = (
    receiverId: string,
    isAccepted: boolean,
  ): Promise<CoupleModel | null> => {
    const self = this;
    return gen(function* () {
      const requestTypeId = isAccepted
        ? RequestTypes.APPROVED
        : RequestTypes.REJECTED;
      const request = yield* self.requestRepository.update(
        receiverId,
        requestTypeId,
      );

      if (!isAccepted) return null;

      const couple = yield* self.coupleRepository.create(
        request.fromUserId,
        request.toUserId,
      );
      return couple;
    }).pipe(runPromise);
  };
}
