import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetUserByMailaddressUsecase } from '../usecase/getUserByMailaddress.usecase';
import { UserPresenter } from '../presenter/user.presenter';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUserByMailaddressUsecase: GetUserByMailaddressUsecase,
  ) {}

  @Query(() => UserPresenter)
  async getUserByMailaddress(
    @Args('mailaddress') mailaddress: string,
  ): Promise<UserPresenter> {
    const user =
      await this.getUserByMailaddressUsecase.getUserByMailaddress(mailaddress);
    return UserPresenter.create(user);
  }
}
