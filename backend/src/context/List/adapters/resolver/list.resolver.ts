import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { UserHasList } from 'src/context/Authorization/decorator/userHasList.decorator';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';
import { User } from '../../../User/decorator/user.decorator';
import { CreateListUsecase } from '../../usecase/createList.usecase';
import { UpdateListUsecase } from '../../usecase/updateList.usecase';
import { ListPresenter } from '../presenter/list.presenter';

@Resolver()
@JwtAuth()
export class ListResolver {
  constructor(
    private readonly createListUsecase: CreateListUsecase,
    private readonly getCoupleUsecase: GetCoupleUsecase,
    private readonly updateListUsecase: UpdateListUsecase,
  ) {}

  @Mutation(() => ListPresenter)
  async createList(@User() user, @Args('name') name: string) {
    const couple = await this.getCoupleUsecase.execute(user.userId);
    const list = await this.createListUsecase.execute(couple.id, name);
    return ListPresenter.create(list);
  }

  @Mutation(() => ListPresenter)
  @UserHasList()
  async updateList(@Args('listId') listId: string, @Args('name') name: string) {
    const list = await this.updateListUsecase.execute(listId, name);
    return ListPresenter.create(list);
  }
}
