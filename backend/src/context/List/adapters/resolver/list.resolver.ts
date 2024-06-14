import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';
import { User } from '../../../User/decorator/user.decorator';
import { CreateListUsecase } from '../../usecase/createList.usecase';
import { ListPresenter } from '../presenter/list.presenter';

@Resolver()
@JwtAuth()
export class ListResolver {
  constructor(
    private readonly createListUsecase: CreateListUsecase,
    private readonly getCoupleUsecase: GetCoupleUsecase,
  ) {}

  @Mutation(() => ListPresenter)
  async createList(@User() user, @Args('name') name: string) {
    const couple = await this.getCoupleUsecase.execute(user.userId);
    const listModel = await this.createListUsecase.execute(couple[0].id, name);
    return couple ? ListPresenter.create(listModel) : couple;
  }
}
