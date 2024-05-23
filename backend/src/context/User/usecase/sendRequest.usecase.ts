import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interfase';
import { RequestRepositoryInterface } from '../domain/interface/request.respository.interface';

@Injectable()
export class SendRequestUsecase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly coupleRepository: CoupleRepositoryInterface,
    private readonly requestRepository: RequestRepositoryInterface,
  ) {}

  // TODO: senderMailaddressはjwtとかからとる想定
  async execute(senderMailaddress: string, receiverMailaddress: string) {
    // FIXME: 複数ユーザーを一度に取得するとどちらが送受信者かわかりにくくなりそうなのでこの形
    const sendUser =
      await this.userRepository.getUserByMailaddress(senderMailaddress);
    const receivedUser =
      await this.userRepository.getUserByMailaddress(receiverMailaddress);

    if (receivedUser.mailaddress.value) {
      const couple = await this.coupleRepository.findByUserId(receivedUser.id);
      if (!couple) {
        await this.requestRepository.createRequest(
          sendUser.mailaddress.value,
          receivedUser.mailaddress.value,
        );
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
