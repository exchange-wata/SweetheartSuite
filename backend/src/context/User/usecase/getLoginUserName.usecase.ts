import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';

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
