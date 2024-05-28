import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { User } from '../../decorator/user.decorator';
import { CreateCoupleUsecase } from '../../usecase/createCouple.usecase';
import { CouplePresenter } from '../presenter/couple.presenter';

@Resolver()
@JwtAuth()
export class CoupleResolver {
  constructor(private readonly createCoupleUsecase: CreateCoupleUsecase) {}

  @Mutation(() => CouplePresenter, { nullable: true })
  async createCouple(@User() user, @Args('isAccepted') isAccepted: boolean) {
    return this.createCoupleUsecase.execute(user.userId, isAccepted);
  }
}
