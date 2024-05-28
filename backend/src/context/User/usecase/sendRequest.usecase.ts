import { Inject, Injectable } from '@nestjs/common';
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

  async execute(
    senderId: string,
    receiverMailaddress: string,
  ): Promise<boolean> {
    // TODO: 返却値見直す
    // REF: https://github.com/exchange-wata/SweetheartSuite/pull/48
    try {
      const [sendUser, receivedUser] = await Promise.all([
        this.userRepository.findByUserId(senderId),
        this.userRepository.getUserByMailaddress(receiverMailaddress),
      ]);

      const couple = await this.coupleRepository.findByUserId(receivedUser.id);
      if (couple.length > 0) {
        return false;
      }

      await this.requestRepository.create(sendUser.id, receivedUser.id);
      return true;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
