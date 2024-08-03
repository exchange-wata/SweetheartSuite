import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { CreateContentsUsecase } from '../../usecase/createContents.usecase';
import { DeleteContentsUsecase } from '../../usecase/deleteContents.usecase';
import { GetContentsByListIdUsecase } from '../../usecase/getContentsByListId.usecase';
import { SetCompletedContentsUsecase } from '../../usecase/setCompletedContents.usecase';
import { SetIncompleteContentsUsecase } from '../../usecase/setIncompleteContents.usecase';
import { UpdateContentsUsecase } from '../../usecase/updateContents.usecase';
import { ContentsPresenter } from '../presenter/contents.presenter';
import { ContentsAuth } from '../../guard/contents.guard';
import { AuthUser, User } from 'src/context/User/decorator/user.decorator';

@ObjectType()
class DeleteContentsResponse {
  @Field()
  count!: number;
}

@Resolver()
@JwtAuth()
export class ContentsResolver {
  constructor(
    private readonly getContentsByListIdUsecase: GetContentsByListIdUsecase,
    private readonly createContentsUsecase: CreateContentsUsecase,
    private readonly updateContentsUsecase: UpdateContentsUsecase,
    private readonly setCompletedContentsUsecase: SetCompletedContentsUsecase,
    private readonly setIncompleteContentsUsecase: SetIncompleteContentsUsecase,
    private readonly deleteContentsUsecase: DeleteContentsUsecase,
    private readonly contentsAuth: ContentsAuth,
  ) {}

  @Query(() => [ContentsPresenter])
  async getContentsByListId(@Args('listId') listId: string) {
    const contents = await this.getContentsByListIdUsecase.execute(listId);
    return contents.map(ContentsPresenter.create);
  }

  @Mutation(() => ContentsPresenter)
  async createContents(
    @Args('listId') listId: string,
    @Args('content') content: string,
  ) {
    const contents = await this.createContentsUsecase.execute(listId, content);
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async updateContents(
    @User() user: AuthUser,
    @Args('id') id: string,
    @Args('content') content: string,
  ) {
    await this.contentsAuth.canEditContents(user.coupleId, [id]);

    const contents = await this.updateContentsUsecase.execute(id, content);
    if (!contents) throw new Error('invalid contents');
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async setCompletedContents(@User() user: AuthUser, @Args('id') id: string) {
    await this.contentsAuth.canEditContents(user.coupleId, [id]);

    const contents = await this.setCompletedContentsUsecase.execute(id);
    if (!contents) throw new Error('invalid contents');
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async setIncompleteContents(@User() user: AuthUser, @Args('id') id: string) {
    await this.contentsAuth.canEditContents(user.coupleId, [id]);

    const contents = await this.setIncompleteContentsUsecase.execute(id);
    if (!contents) throw new Error('invalid contents');
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => DeleteContentsResponse)
  async deleteContents(
    @User() user: AuthUser,
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    await this.contentsAuth.canEditContents(user.coupleId, ids);

    return this.deleteContentsUsecase.execute(ids);
  }
}
