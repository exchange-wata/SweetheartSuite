import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { COUPLE_REPOSITORY, USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { CoupleRepositoryInterface } from '../domain/interface/couple.repository.interface';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepositoryInterface,
    private readonly jwtAuthUsecase: JwtAuthUsecase,
  ) {}

  execute = (mailaddress: string): Promise<string> => {
    const self = this;
    return gen(function* () {
      const user = yield* self.userRepository.getUserByMailaddress(mailaddress);
      const couple = yield* self.coupleRepository.findByUserId(user.id);

      if (couple.length !== 1) return '';

      const jwt = yield* self.jwtAuthUsecase.generateToken({
        id: user.id,
        coupleId: couple[0].id,
      });

      return jwt;
    }).pipe(runPromise);
  };
}
