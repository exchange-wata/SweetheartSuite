import { Inject, Injectable } from '@nestjs/common';
import { TEMP_USER_REPOSITORY } from '../const/user.token';
import { Mailaddress } from '../domain/model/valueObject/mailaddress.value';
import { TempUserRepositoryInterface } from '../domain/interface/tempUserRepositoryInterface.repository.interface';
import { TempUserModel } from '../domain/model/tempUser.mode';

@Injectable()
export class CreateTempUserUsecase {
  constructor(
    @Inject(TEMP_USER_REPOSITORY)
    private readonly tempUserRepository: TempUserRepositoryInterface,
  ) {}

  async execute(mailaddress: string): Promise<TempUserModel> {
    const validatedMailaddress = Mailaddress.create(mailaddress);
    return this.tempUserRepository.create(validatedMailaddress.value);
  }
}
