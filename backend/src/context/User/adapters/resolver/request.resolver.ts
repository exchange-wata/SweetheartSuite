import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendRequestUsecase } from '../../usecase/sendRequest.usecase';
import { User } from '../../decorator/user.decorator';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';

@Resolver()
@JwtAuth()
export class RequestResolver {
  constructor(private readonly sendRequestUsecase: SendRequestUsecase) {}

  @Mutation(() => Boolean)
  async sendRequest(
    @User() user,
    @Args('mailaddress') mailaddress: string,
  ): Promise<Boolean> {
    const userId = user.userId;
    return this.sendRequestUsecase.execute(userId, mailaddress);
  }
}
