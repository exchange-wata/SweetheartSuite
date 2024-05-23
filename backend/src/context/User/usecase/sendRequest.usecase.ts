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
    // FIXME: 複数ユーザーを一度に取得するとどちらが送受信者かわかりにくくなりそうなのでこの形
    const sendUser =
      await this.userRepository.getUserByMailaddress(senderMailaddress);
    const receivedUser =
      await this.userRepository.getUserByMailaddress(receiverMailaddress);

    if (receivedUser.mailaddress.value) {
      const couple = await this.coupleRepository.findByUserId(receivedUser.id);
      if (couple.length === 0) {
        await this.requestRepository.create(
          sendUser.mailaddress.value,
          receivedUser.mailaddress.value,
        );
        return true;
      } else {
        throw new Error('can not send request');
      }
    } else {
      throw new Error(
        `can not find user with that mailaddress is ${receiverMailaddress}`,
      );
    }
  }
}
