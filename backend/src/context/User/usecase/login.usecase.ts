import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { GoogleAuthUsecase } from 'src/context/Auth/usecase/googleAuth.usecase';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtAuthUsecase: JwtAuthUsecase,
    private readonly googleAuthUsecase: GoogleAuthUsecase,
  ) {}

  async execute(token: string): Promise<string | null> {
    const mailaddress = await this.googleAuthUsecase.verifyToken(token);

    if (mailaddress) {
      const user = await this.userRepository.getUserByMailaddress(mailaddress);
      if (user) {
        return this.jwtAuthUsecase.generateToken({ id: user.id });
      } else {
        return null;
      }
    }
  }
}
