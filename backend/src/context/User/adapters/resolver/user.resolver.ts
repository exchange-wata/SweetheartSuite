import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserByMailaddressUsecase } from '../../usecase/getUserByMailaddress.usecase';
import { UserPresenter } from '../presenter/user.presenter';
import { LoginUsecase } from '../../usecase/login.usecase';
import { CreateUserUsecase } from '../../usecase/createUser.usecase';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUserByMailaddressUsecase: GetUserByMailaddressUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
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

  @Mutation(() => UserPresenter)
  async createUser(
    @Args('name') name: string,
    @Args('token') token: string,
  ): Promise<UserPresenter> {
    const user = await this.createUserUsecase.execute(name, token);
    return UserPresenter.create(user);
  }
}
