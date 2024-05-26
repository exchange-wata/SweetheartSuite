import { Inject, Injectable } from '@nestjs/common';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { RequestTypes } from '../domain/model/valueObject/requestTypeId.value';
import { CoupleModel } from '../domain/model/couple.model';
import { COUPLE_REPOSITORY, REQUEST_REPOSITORY } from '../const/user.token';

@Injectable()
export class CreateCoupleUsecase {
  constructor(
    @Inject(REQUEST_REPOSITORY)
    private readonly requestRepository: RequestRepositoryInterface,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepositoryInterface,
  ) {}

  async execute(
    receiverId: string,
    isAccepted: boolean,
  ): Promise<CoupleModel | null> {
    const requestTypeId = isAccepted
      ? RequestTypes.APPROVED
      : RequestTypes.REJECTED;
    const request = await this.requestRepository.update(
      receiverId,
      requestTypeId,
    );

    if (!isAccepted) return null;

    return this.coupleRepository.create(request.fromUserId, request.toUserId);
  }
}
