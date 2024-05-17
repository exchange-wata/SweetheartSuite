import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetLoginUserNameUsecase } from '../usecase/getLoginUserName.usecase';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getLoginUserNameUsecase: GetLoginUserNameUsecase,
  ) {}

  @Query(() => String)
  async getLoginUserName(
    @Args('mailaddress') mailaddress: string,
  ): Promise<string> {
    return this.getLoginUserNameUsecase.getLoginUserName(mailaddress);
  }
}
