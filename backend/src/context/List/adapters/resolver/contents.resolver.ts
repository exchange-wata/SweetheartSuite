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
    @Args('id') id: string,
    @Args('content') content: string,
  ) {
    const contents = await this.updateContentsUsecase.execute(id, content);
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async setCompletedContents(@Args('id') id: string) {
    const contents = await this.setCompletedContentsUsecase.execute(id);
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async setIncompleteContents(@Args('id') id: string) {
    const contents = await this.setIncompleteContentsUsecase.execute(id);
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => DeleteContentsResponse)
  async deleteContents(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.deleteContentsUsecase.execute(ids);
  }
}
