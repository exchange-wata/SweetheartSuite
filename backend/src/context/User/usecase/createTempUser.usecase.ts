import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { createToken } from 'src/library/hash.library';
import { TEMP_USER_REPOSITORY } from '../const/user.token';
import { TempUserRepositoryInterface } from '../domain/interface/tempUser.repository.interface';
import { TempUserModel } from '../domain/model/tempUser.model';
import { Mailaddress } from '../domain/model/valueObject/mailaddress.value';

@Injectable()
export class CreateTempUserUsecase {
  constructor(
    @Inject(TEMP_USER_REPOSITORY)
    private readonly tempUserRepository: TempUserRepositoryInterface,
  ) {}

  execute = (mailaddress: string): Promise<TempUserModel> => {
    const self = this;
    const result = gen(function* () {
      const value = yield* Mailaddress.create(mailaddress);
      const validatedMailaddress = value.value;
      const token = yield* createToken(validatedMailaddress);
      const tempUser = yield* self.tempUserRepository.create(
        validatedMailaddress,
        token,
      );
      return tempUser;
    });
    return runPromise(result);
  };
}
