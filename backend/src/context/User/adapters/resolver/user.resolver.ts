import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserByMailaddressUsecase } from '../../usecase/getUserByMailaddress.usecase';
import { UserPresenter } from '../presenter/user.presenter';
import { CreateUserUsecase } from '../../usecase/createUserUsecase.usecase';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUserByMailaddressUsecase: GetUserByMailaddressUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Query(() => UserPresenter)
  async getUserByMailaddress(
    @Args('mailaddress') mailaddress: string,
  ): Promise<UserPresenter> {
    const user =
      await this.getUserByMailaddressUsecase.getUserByMailaddress(mailaddress);
    return UserPresenter.create(user);
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
