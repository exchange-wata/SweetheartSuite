import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetUserByMailaddressUsecase } from '../../usecase/getUserByMailaddress.usecase';
import { UserPresenter } from '../presenter/user.presenter';
import { LoginUsecase } from '../../usecase/login.usecase';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUserByMailaddressUsecase: GetUserByMailaddressUsecase,
    private readonly loginUsecase: LoginUsecase,
  ) {}

  @Query(() => UserPresenter)
  async getUserByMailaddress(
    @Args('mailaddress') mailaddress: string,
  ): Promise<UserPresenter> {
    const user = await this.getUserByMailaddressUsecase.execute(mailaddress);
    return UserPresenter.create(user);
  }

  @Query(() => String)
  async login(@Args('token') token: string): Promise<string | null> {
    return this.loginUsecase.execute(token);
  }
}
