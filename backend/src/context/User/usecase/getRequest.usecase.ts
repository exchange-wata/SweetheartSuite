import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { REQUEST_REPOSITORY } from '../const/user.token';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { RequestTypes } from '../domain/model/valueObject/requestTypeId.value';

@Injectable()
export class GetRequestUsecase {
  constructor(
    @Inject(REQUEST_REPOSITORY)
    private readonly requestRepository: RequestRepositoryInterface,
  ) {}

  execute = (toUserId: string, typeId: RequestTypes) => {
    const self = this;
    return gen(function* () {
      const request = yield* self.requestRepository.findByToUserIdAndTypeId(
        toUserId,
        typeId,
      );
      return request;
    }).pipe(runPromise);
  };
}
