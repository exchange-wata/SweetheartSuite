import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { Mailaddress } from '../domain/model/valueObject/mailaddress.value';
import { UserModel } from '../domain/model/user.model';

@Injectable()
export class GetLoginUserNameUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getLoginUserName(mailaddress: string): Promise<UserModel> {
    const validatedMailaddress = Mailaddress.create(mailaddress);
    return this.userRepository.getLoginUserName(
      validatedMailaddress.mailaddress,
    );
  }
}
