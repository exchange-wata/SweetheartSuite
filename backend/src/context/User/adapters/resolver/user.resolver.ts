import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { CreateUserUsecase } from '../../usecase/createUser.usecase';
import { GetUserByMailaddressUsecase } from '../../usecase/getUserByMailaddress.usecase';
import { LoginUsecase } from '../../usecase/login.usecase';
import { UserPresenter } from '../presenter/user.presenter';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUserByMailaddressUsecase: GetUserByMailaddressUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @JwtAuth()
  @Query(() => UserPresenter)
  async getUserByMailaddress(
    @Args('mailaddress') mailaddress: string,
  ): Promise<UserPresenter> {
    const user = await this.getUserByMailaddressUsecase.execute(mailaddress);
    return UserPresenter.create(user);
  }

  @Query(() => String)
  async login(
    @Args('mailaddress') mailaddress: string,
  ): Promise<string | null> {
    return this.loginUsecase.execute(mailaddress);
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
