import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { User } from '../../decorator/user.decorator';
import { CreateCoupleUsecase } from '../../usecase/createCouple.usecase';
import { GetCoupleUsecase } from '../../usecase/getCouple.usecase';
import { CouplePresenter } from '../presenter/couple.presenter';

@Resolver()
@JwtAuth()
export class CoupleResolver {
  constructor(
    private readonly createCoupleUsecase: CreateCoupleUsecase,
    private readonly getCoupleUsecase: GetCoupleUsecase,
  ) {}

  @Mutation(() => CouplePresenter, { nullable: true })
  async createCouple(
    @User() user: any,
    @Args('isAccepted') isAccepted: boolean,
  ) {
    return this.createCoupleUsecase.execute(user.userId, isAccepted);
  }

  @Query(() => CouplePresenter)
  async getCouple(@User() user: any) {
    const result = await this.getCoupleUsecase.execute(user.userId);
    if (result === undefined) throw new Error('couple could not find');
    return CouplePresenter.create(result);
  }
}
