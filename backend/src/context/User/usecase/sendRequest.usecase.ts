import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import {
  COUPLE_REPOSITORY,
  REQUEST_REPOSITORY,
  USER_REPOSITORY,
} from '../const/user.token';

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

  // TODO: senderMailaddressはjwtとかからとる想定
  async execute(
    senderMailaddress: string,
    receiverMailaddress: string,
  ): Promise<boolean> {
    try {
      const [sendUser, receivedUser] = await Promise.all([
        this.userRepository.getUserByMailaddress(senderMailaddress),
        this.userRepository.getUserByMailaddress(receiverMailaddress),
      ]);

      const couple = await this.coupleRepository.findByUserId(receivedUser.id);
      if (couple.length > 0) {
        return false;
      }

      await this.requestRepository.create(sendUser.id, receivedUser.id);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
