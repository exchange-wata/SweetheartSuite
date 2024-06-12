import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { CoupleResolver } from 'src/context/User/adapters/resolver/couple.resolver';
import { User } from '../../../User/decorator/user.decorator';
import { CreateListUsecase } from '../../usecase/createList.usecase';

@Resolver()
@JwtAuth()
export class ListResolver {
  constructor(
    private readonly createListUsecase: CreateListUsecase,
    private readonly coupleResolver: CoupleResolver,
  ) {}

  @Mutation(() => Boolean)
  async createList(@User() user, @Args('name') name: string) {
    const couple = await this.coupleResolver.getCouple(user);
    return couple ? this.createListUsecase.execute(couple[0].id, name) : couple;
  }
}
