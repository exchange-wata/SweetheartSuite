import { Inject, Injectable } from '@nestjs/common';
import { TEMP_USER_REPOSITORY, USER_REPOSITORY } from '../const/user.token';
import { UserModel } from '../domain/model/user.model';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { TempUserRepositoryInterface } from '../domain/interface/tempUser.repository.interface';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(TEMP_USER_REPOSITORY)
    private readonly tempUserRepository: TempUserRepositoryInterface,
  ) {}

  async execute(name: string, token: string): Promise<UserModel> {
    const tempUsers = await this.tempUserRepository.findByToken(token);
    const tempUser = tempUsers.shift();
    const user = await this.userRepository.create(
      name,
      tempUser.mailaddress.value,
    );

    if (!user) {
      throw new Error('can not create user');
    } else {
      await this.tempUserRepository.deleteMany(user.mailaddress.value);
    }

    return user;
  }
}
