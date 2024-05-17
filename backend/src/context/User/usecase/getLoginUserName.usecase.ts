import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../interfase/user.repository.interfase';
import { USER_REPOSITORY } from '../const/user.token';

@Injectable()
export class GetLoginUserNameUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getLoginUserName(mailaddress: string): Promise<string> {
    return this.userRepository.getLoginUserName(mailaddress);
  }
}
