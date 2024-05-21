import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTempUserUsecase } from '../../usecase/createTempUser.usecase';
import { TempUserPresenter } from '../presenter/tempUser.presenter';

@Resolver()
export class TempUserResolver {
  constructor(private readonly createTempUserUsecase: CreateTempUserUsecase) {}

  @Mutation(() => TempUserPresenter)
  async createTempUser(@Args('mailaddress') mailaddress: string) {
    const user = await this.createTempUserUsecase.execute(mailaddress);
    return TempUserPresenter.create(user);
  }
}
