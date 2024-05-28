import { Inject, Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, runPromise } from 'effect/Effect';
import { TEMP_USER_REPOSITORY, USER_REPOSITORY } from '../const/user.token';
import { TempUserRepositoryInterface } from '../domain/interface/tempUser.repository.interface';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { UserModel } from '../domain/model/user.model';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(TEMP_USER_REPOSITORY)
    private readonly tempUserRepository: TempUserRepositoryInterface,
  ) {}

  execute = (name: string, token: string): Promise<UserModel> => {
    const self = this;
    const result = pipe(
      self.tempUserRepository.findByToken(token),
      andThen((tempUser) => {
        const user = self.userRepository.create(
          name,
          tempUser.mailaddress.value,
        );
        self.tempUserRepository.deleteMany(tempUser.mailaddress.value);
        return user;
      }),
    );
    return runPromise(result);
    // const self = this;
    // const result = gen(function* () {
    //   console.log(`============${token}=============`);
    //   const tempUser = yield* self.tempUserRepository.findByToken(token);
    //   console.log(`============${JSON.stringify(tempUser)}=============`);
    //   const user = yield* self.userRepository.create(
    //     name,
    //     tempUser.mailaddress.value,
    //   );
    //   yield* self.tempUserRepository.deleteMany(user.mailaddress.value);
    //   return user;
    // });
    // return runPromise(result);
  };
}
