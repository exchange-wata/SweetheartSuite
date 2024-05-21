import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../const/user.token';
import { UserRepositoryInterface } from '../domain/interface/user.repository.interface';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';

@Injectable()
export class LoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly JwtAuthUsecase: JwtAuthUsecase,
  ) {}

  async execute(token: string): Promise<string | null> {
    // TODO: google tokenの検証
    // FIXME: tokenを検証して得たメアドに変更する
    const mailaddres = 'hoge';
    if (mailaddres) {
      const user = await this.userRepository.getUserByMailaddress(mailaddres);
      if (user) {
        return this.JwtAuthUsecase.generateToken({ id: user.id });
      } else {
        return null;
      }
    } else {
      throw new Error('invalid google token');
    }
  }
}
