import { Inject, Injectable } from '@nestjs/common';
import { TEMP_USER_REPOSITORY } from '../const/user.token';
import { Mailaddress } from '../domain/model/valueObject/mailaddress.value';
import { TempUserRepositoryInterface } from '../domain/interface/tempUserRepositoryInterface.repository.interface';
import { TempUserModel } from '../domain/model/tempUser.model';
import { createToken } from 'src/library/hash.library';

@Injectable()
export class CreateTempUserUsecase {
  constructor(
    @Inject(TEMP_USER_REPOSITORY)
    private readonly tempUserRepository: TempUserRepositoryInterface,
  ) {}

  async execute(mailaddress: string): Promise<TempUserModel> {
    const { value } = Mailaddress.create(mailaddress);
    const token = await createToken(value);
    return this.tempUserRepository.create(value, token);
  }
}
