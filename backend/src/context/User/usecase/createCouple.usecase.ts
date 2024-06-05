import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { COUPLE_REPOSITORY, REQUEST_REPOSITORY } from '../const/user.token';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { CoupleModel } from '../domain/model/couple.model';
import { RequestModel } from '../domain/model/request.model';
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

      const currentRequest =
        yield* self.requestRepository.findByToUserId(receiverId);
      const updateRequestModel = yield* RequestModel.create({
        fromUserId: currentRequest.fromUserId,
        toUserId: receiverId,
        typeId: requestTypeId,
      });

      const request = yield* self.requestRepository.update(updateRequestModel);

      if (!isAccepted) return null;

      const coupleModel = yield* CoupleModel.create({
        userId1: request.fromUserId,
        userId2: request.toUserId,
      });
      const couple = yield* self.coupleRepository.create(coupleModel);
      return couple;
    }).pipe(runPromise);
  };
}
