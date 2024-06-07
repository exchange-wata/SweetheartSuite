import { Inject, Injectable } from '@nestjs/common';
import { runPromise } from 'effect/Effect';
import { REQUEST_REPOSITORY } from '../const/user.token';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { RequestTypes } from '../domain/model/valueObject/requestTypeId.value';

@Injectable()
export class GetRequestUsecase {
  constructor(
    @Inject(REQUEST_REPOSITORY)
    private readonly requestRepository: RequestRepositoryInterface,
  ) {}

  execute = (toUserId: string, typeId: RequestTypes) =>
    runPromise(
      this.requestRepository.findByToUserIdAndTypeId(toUserId, typeId),
    );
}
