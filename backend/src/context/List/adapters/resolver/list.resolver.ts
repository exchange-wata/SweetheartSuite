import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';
import { User } from '../../../User/decorator/user.decorator';
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
    const couple = await this.getCoupleUsecase.execute(user.userId);
    if (couple === undefined) throw new Error('couple could not find');
    const lists = await this.getListsUsecase.execute(couple.id);
    return lists.map(ListPresenter.create);
  }

  @Mutation(() => ListPresenter)
  async createList(@User() user: any, @Args('name') name: string) {
    const couple = await this.getCoupleUsecase.execute(user.userId);
    if (couple === undefined) throw new Error('couple could not find');
    const list = await this.createListUsecase.execute(couple.id, name);
    return ListPresenter.create(list);
  }

  @Mutation(() => ListPresenter)
  async updateList(@Args('listId') listId: string, @Args('name') name: string) {
    const list = await this.updateListUsecase.execute(listId, name);
    return ListPresenter.create(list);
  }

  @Mutation(() => ListPresenter)
  async archiveList(@Args('listId') listId: string) {
    const list = await this.archiveListUsecase.execute(listId);
    return ListPresenter.create(list);
  }
}
