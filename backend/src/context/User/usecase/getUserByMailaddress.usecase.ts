import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { UserModel } from '../domain/model/user.model';
import { Mailaddress } from '../domain/model/valueObject/mailaddress.value';

@Injectable()
export class GetUserByMailaddressUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  execute = (mailaddress: string): Promise<UserModel> => {
    const self = this;
    const result = gen(function* () {
      const value = yield* Mailaddress.create(mailaddress);
      const validatedMailaddress = value.value;
      const user =
        yield* self.userRepository.getUserByMailaddress(validatedMailaddress);
      return user;
    });

    return runPromise(result);
  };
}
