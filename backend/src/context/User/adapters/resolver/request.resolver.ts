import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { User } from '../../decorator/user.decorator';
import { RequestTypes } from '../../domain/model/valueObject/requestTypeId.value';
import { GetRequestUsecase } from '../../usecase/getRequest.usecase';
import { SendRequestUsecase } from '../../usecase/sendRequest.usecase';
import { RequestPresenter } from '../presenter/request.presenter';

@Resolver()
@JwtAuth()
export class RequestResolver {
  constructor(
    private readonly sendRequestUsecase: SendRequestUsecase,
    private readonly getRequestUsacese: GetRequestUsecase,
  ) {}

  @Mutation(() => Boolean)
  async sendRequest(
    @User() user: any,
    @Args('mailaddress') mailaddress: string,
  ): Promise<Boolean> {
    const userId = user.userId;
    return this.sendRequestUsecase.execute(userId, mailaddress);
  }

  @Query(() => RequestPresenter)
  async getRequest(@User() user: any) {
    const userId = user.userId;
    const request = await this.getRequestUsacese.execute(
      userId,
      RequestTypes.SENT,
    );
    return RequestPresenter.create(request);
  }
}
