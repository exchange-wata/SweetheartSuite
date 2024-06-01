import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import {
  COUPLE_REPOSITORY,
  REQUEST_REPOSITORY,
  USER_REPOSITORY,
} from '../const/user.token';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';

@Injectable()
export class SendRequestUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepositoryInterface,
    @Inject(REQUEST_REPOSITORY)
    private readonly requestRepository: RequestRepositoryInterface,
  ) {}

  execute = (
    senderId: string,
    receiverMailaddress: string,
  ): Promise<boolean> => {
    const self = this;
    return gen(function* () {
      const sender = yield* self.userRepository.findByUserId(senderId);
      const receiver =
        yield* self.userRepository.getUserByMailaddress(receiverMailaddress);

      const couples = yield* self.coupleRepository.findByUserId(receiver.id);
      if (couples.length > 0) {
        return false;
      }

      yield* self.requestRepository.create(sender.id, receiver.id);
      return true;
    }).pipe(runPromise);
  };
}
