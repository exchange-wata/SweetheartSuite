import { Inject, Injectable } from '@nestjs/common';
import { gen, runPromise } from 'effect/Effect';
import { GoogleAuthUsecase } from 'src/context/Auth/usecase/googleAuth.usecase';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtAuthUsecase: JwtAuthUsecase,
    private readonly googleAuthUsecase: GoogleAuthUsecase,
  ) {}

  execute = (token: string): Promise<string> => {
    const self = this;
    return gen(function* () {
      const mailaddress = yield* self.googleAuthUsecase.verifyToken(token);
      const user = yield* self.userRepository.getUserByMailaddress(mailaddress);
      const jwt = yield* self.jwtAuthUsecase.generateToken({ id: user.id });
      return jwt;
    }).pipe(runPromise);
  };
}
