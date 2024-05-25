import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendRequestUsecase } from '../../usecase/sendRequest.usecase';

@Resolver()
export class RequestResolver {
  constructor(private readonly sendRequestUsecase: SendRequestUsecase) {}

  @Mutation(() => Boolean)
  async sendRequest(
    @Args('mailaddress') mailaddress: string,
  ): Promise<Boolean> {
    // TODO: 仮の送信者メールアドレス(seederにあるやつを設定)
    const senderMailaddress = 'email1@gmail.com';
    return this.sendRequestUsecase.execute(senderMailaddress, mailaddress);
  }
}
