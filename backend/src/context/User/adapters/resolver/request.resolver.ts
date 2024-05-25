import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendRequestUsecase } from '../../usecase/sendRequest.usecase';
import { UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from 'src/context/Auth/guard/jwtAuth.guard';
import { User } from '../../decorator/user.decorator';

@Resolver()
@UseGuards(jwtAuthGuard)
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
