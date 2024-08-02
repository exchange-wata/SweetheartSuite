import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';
import { User } from '../../../User/decorator/user.decorator';
import { ListAuth } from '../../decorator/list.decorator';
import { ArchiveListUsecase } from '../../usecase/archiveList.usecase';
import { CreateListUsecase } from '../../usecase/createList.usecase';
import { GetListsUsecase } from '../../usecase/getLists.usecase';
import { UpdateListUsecase } from '../../usecase/updateList.usecase';
import { ListPresenter } from '../presenter/list.presenter';

@Resolver()
@JwtAuth()
export class ListResolver {
  constructor(
    private readonly getListsUsecase: GetListsUsecase,
    private readonly createListUsecase: CreateListUsecase,
    private readonly getCoupleUsecase: GetCoupleUsecase,
    private readonly updateListUsecase: UpdateListUsecase,
    private readonly archiveListUsecase: ArchiveListUsecase,
  ) {}

  @Query(() => [ListPresenter])
  async getLists(@User() user: any) {
    const lists = await this.getListsUsecase.execute(user.coupleId);
    return lists.map(ListPresenter.create);
  }

  @Mutation(() => ListPresenter)
  async createList(@User() user: any, @Args('name') name: string) {
    const list = await this.createListUsecase.execute(user.coupleId, name);
    return ListPresenter.create(list);
  }

  @ListAuth()
  @Mutation(() => ListPresenter)
  async updateList(@Args('listId') listId: string, @Args('name') name: string) {
    const list = await this.updateListUsecase.execute(listId, name);
    return ListPresenter.create(list);
  }

  @ListAuth()
  @Mutation(() => ListPresenter)
  async archiveList(@Args('listId') listId: string) {
    const list = await this.archiveListUsecase.execute(listId);
    return ListPresenter.create(list);
  }
}
